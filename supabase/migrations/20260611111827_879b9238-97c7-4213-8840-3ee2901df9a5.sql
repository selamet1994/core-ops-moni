
-- ENUMS
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin', 'member');
CREATE TYPE public.division AS ENUM ('fms', 'ga', 'k3l');
CREATE TYPE public.work_status AS ENUM ('pending', 'in_progress', 'completed', 'overdue', 'approved', 'rejected');

-- PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  division public.division,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles readable by authenticated" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- USER ROLES
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','super_admin'))
$$;

-- Auto-create profile + default member role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'member');
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- updated_at helper
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- FMS: Preventive Maintenance
CREATE TABLE public.preventive_maintenance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_no TEXT NOT NULL UNIQUE DEFAULT ('PM-' || to_char(now(), 'YYYYMMDD') || '-' || substr(gen_random_uuid()::text,1,6)),
  asset_name TEXT NOT NULL,
  location TEXT,
  description TEXT,
  scheduled_date DATE NOT NULL,
  completed_date DATE,
  status public.work_status NOT NULL DEFAULT 'pending',
  priority TEXT NOT NULL DEFAULT 'medium',
  assigned_to UUID REFERENCES auth.users(id),
  created_by UUID NOT NULL REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.preventive_maintenance TO authenticated;
GRANT ALL ON public.preventive_maintenance TO service_role;
ALTER TABLE public.preventive_maintenance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "PM read authenticated" ON public.preventive_maintenance FOR SELECT TO authenticated USING (true);
CREATE POLICY "PM insert authenticated" ON public.preventive_maintenance FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "PM update by admin or creator" ON public.preventive_maintenance FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()) OR auth.uid() = created_by);
CREATE POLICY "PM delete admin only" ON public.preventive_maintenance FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));
CREATE TRIGGER pm_touch BEFORE UPDATE ON public.preventive_maintenance FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- GA: Vehicle Monitoring
CREATE TABLE public.vehicle_monitoring (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_plate TEXT NOT NULL,
  driver_name TEXT,
  check_date DATE NOT NULL,
  fuel_level INT,
  mileage INT,
  condition TEXT,
  notes TEXT,
  status public.work_status NOT NULL DEFAULT 'completed',
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vehicle_monitoring TO authenticated;
GRANT ALL ON public.vehicle_monitoring TO service_role;
ALTER TABLE public.vehicle_monitoring ENABLE ROW LEVEL SECURITY;
CREATE POLICY "VM read authenticated" ON public.vehicle_monitoring FOR SELECT TO authenticated USING (true);
CREATE POLICY "VM insert authenticated" ON public.vehicle_monitoring FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "VM update admin or creator" ON public.vehicle_monitoring FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()) OR auth.uid() = created_by);
CREATE POLICY "VM delete admin only" ON public.vehicle_monitoring FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));
CREATE TRIGGER vm_touch BEFORE UPDATE ON public.vehicle_monitoring FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- K3L: Waste Monitoring
CREATE TABLE public.waste_monitoring (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  waste_type TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'non_b3',
  weight_kg NUMERIC(10,2) NOT NULL DEFAULT 0,
  source_location TEXT,
  disposal_method TEXT,
  log_date DATE NOT NULL,
  notes TEXT,
  status public.work_status NOT NULL DEFAULT 'pending',
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.waste_monitoring TO authenticated;
GRANT ALL ON public.waste_monitoring TO service_role;
ALTER TABLE public.waste_monitoring ENABLE ROW LEVEL SECURITY;
CREATE POLICY "WM read authenticated" ON public.waste_monitoring FOR SELECT TO authenticated USING (true);
CREATE POLICY "WM insert authenticated" ON public.waste_monitoring FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "WM update admin or creator" ON public.waste_monitoring FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()) OR auth.uid() = created_by);
CREATE POLICY "WM delete admin only" ON public.waste_monitoring FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));
CREATE TRIGGER wm_touch BEFORE UPDATE ON public.waste_monitoring FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
