CREATE TABLE public.sheildy_waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  url TEXT,
  source TEXT DEFAULT 'security-audit',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX sheildy_waitlist_email_unique ON public.sheildy_waitlist (lower(email));

ALTER TABLE public.sheildy_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can insert waitlist"
  ON public.sheildy_waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);