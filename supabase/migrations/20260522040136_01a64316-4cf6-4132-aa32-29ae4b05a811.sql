-- Explicit deny policies for sheildy_waitlist to document and enforce no read/update/delete
CREATE POLICY "Deny all SELECT on waitlist"
  ON public.sheildy_waitlist
  FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "Deny all UPDATE on waitlist"
  ON public.sheildy_waitlist
  FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Deny all DELETE on waitlist"
  ON public.sheildy_waitlist
  FOR DELETE
  TO anon, authenticated
  USING (false);