
-- Fix function search_path
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql
SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Restrict EXECUTE on SECURITY DEFINER function to only service_role and authenticated (used in RLS only)
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;

-- Replace the "always true" INSERT policy on applications with a minimal field-presence check
DROP POLICY IF EXISTS "Anyone can submit applications" ON public.applications;
CREATE POLICY "Anyone can submit applications"
  ON public.applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(full_name) BETWEEN 2 AND 100
    AND length(father_name) BETWEEN 2 AND 100
    AND length(cnic) BETWEEN 13 AND 15
    AND length(phone) BETWEEN 7 AND 20
    AND length(program) BETWEEN 2 AND 100
  );
