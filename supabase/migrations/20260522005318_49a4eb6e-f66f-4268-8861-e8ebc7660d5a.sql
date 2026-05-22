DROP POLICY "anyone can insert waitlist" ON public.sheildy_waitlist;

CREATE POLICY "valid email can join waitlist"
  ON public.sheildy_waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(email) BETWEEN 5 AND 254
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND (url IS NULL OR char_length(url) <= 2048)
  );