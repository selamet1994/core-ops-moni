
ALTER TABLE public.preventive_maintenance
  ADD COLUMN IF NOT EXISTS photo_urls jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS signature_url text,
  ADD COLUMN IF NOT EXISTS signer_name text,
  ADD COLUMN IF NOT EXISTS checklist_results jsonb;

-- Storage policies for pm-evidence bucket
CREATE POLICY "pm-evidence read auth" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'pm-evidence');

CREATE POLICY "pm-evidence insert auth" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'pm-evidence' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "pm-evidence update own" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'pm-evidence' AND owner = auth.uid());

CREATE POLICY "pm-evidence delete own or admin" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'pm-evidence' AND (owner = auth.uid() OR public.is_admin(auth.uid())));
