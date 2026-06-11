
-- 1. Spare parts master
CREATE TABLE public.spare_parts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  barcode TEXT,
  unit TEXT,
  stock_initial NUMERIC NOT NULL DEFAULT 0,
  stock_in NUMERIC NOT NULL DEFAULT 0,
  stock_out NUMERIC NOT NULL DEFAULT 0,
  stock_final NUMERIC GENERATED ALWAYS AS (stock_initial + stock_in - stock_out) STORED,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.spare_parts TO authenticated;
GRANT ALL ON public.spare_parts TO service_role;
ALTER TABLE public.spare_parts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth read spare_parts" ON public.spare_parts FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth insert spare_parts" ON public.spare_parts FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "admin update spare_parts" ON public.spare_parts FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "admin delete spare_parts" ON public.spare_parts FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));
CREATE TRIGGER trg_spare_parts_updated BEFORE UPDATE ON public.spare_parts FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- 2. Spare part movements (in / out / request)
CREATE TABLE public.spare_part_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  movement_type TEXT NOT NULL CHECK (movement_type IN ('in','out','request')),
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  part_code TEXT,
  part_name TEXT NOT NULL,
  brand_type TEXT,
  unit TEXT,
  quantity NUMERIC NOT NULL DEFAULT 0,
  pic TEXT,
  notes TEXT,
  request_date DATE,
  arrival_date DATE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.spare_part_movements TO authenticated;
GRANT ALL ON public.spare_part_movements TO service_role;
ALTER TABLE public.spare_part_movements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth read spm" ON public.spare_part_movements FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth insert spm" ON public.spare_part_movements FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "admin update spm" ON public.spare_part_movements FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "admin delete spm" ON public.spare_part_movements FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));
CREATE TRIGGER trg_spm_updated BEFORE UPDATE ON public.spare_part_movements FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE INDEX idx_spm_type_date ON public.spare_part_movements (movement_type, occurred_at DESC);

-- 3. Utility system tests
CREATE TABLE public.utility_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_type TEXT NOT NULL, -- genset, ups, gas_medis, fire_alarm, pompa_pemadam, fire_shutter, air_bersih, detector_fire_alarm
  test_date DATE NOT NULL DEFAULT CURRENT_DATE,
  technician TEXT,
  location TEXT,
  asset_name TEXT,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.utility_tests TO authenticated;
GRANT ALL ON public.utility_tests TO service_role;
ALTER TABLE public.utility_tests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth read ut" ON public.utility_tests FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth insert ut" ON public.utility_tests FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "admin update ut" ON public.utility_tests FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "admin delete ut" ON public.utility_tests FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));
CREATE TRIGGER trg_ut_updated BEFORE UPDATE ON public.utility_tests FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE INDEX idx_ut_type_date ON public.utility_tests (test_type, test_date DESC);

-- 4. Equipment history (DAHIS)
CREATE TABLE public.equipment_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('mep','mvac','interior')),
  work_date DATE NOT NULL DEFAULT CURRENT_DATE,
  asset_name TEXT NOT NULL,
  asset_code TEXT,
  location TEXT,
  brand_type TEXT,
  serial_number TEXT,
  capacity TEXT,
  year_acquired INT,
  description TEXT,
  status TEXT,
  pic TEXT,
  documentation_url TEXT,
  po_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.equipment_history TO authenticated;
GRANT ALL ON public.equipment_history TO service_role;
ALTER TABLE public.equipment_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth read eh" ON public.equipment_history FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth insert eh" ON public.equipment_history FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "admin update eh" ON public.equipment_history FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "admin delete eh" ON public.equipment_history FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));
CREATE TRIGGER trg_eh_updated BEFORE UPDATE ON public.equipment_history FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE INDEX idx_eh_cat_date ON public.equipment_history (category, work_date DESC);

-- 5. Daily checklists (MHKN)
CREATE TABLE public.daily_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_code TEXT NOT NULL, -- A_GENSET, B_PUTM, etc.
  equipment_name TEXT NOT NULL,
  checked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  shift TEXT,
  pic TEXT,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  remarks TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.daily_checklists TO authenticated;
GRANT ALL ON public.daily_checklists TO service_role;
ALTER TABLE public.daily_checklists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth read dc" ON public.daily_checklists FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth insert dc" ON public.daily_checklists FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "admin update dc" ON public.daily_checklists FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "admin delete dc" ON public.daily_checklists FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));
CREATE TRIGGER trg_dc_updated BEFORE UPDATE ON public.daily_checklists FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE INDEX idx_dc_eq_date ON public.daily_checklists (equipment_code, checked_at DESC);
