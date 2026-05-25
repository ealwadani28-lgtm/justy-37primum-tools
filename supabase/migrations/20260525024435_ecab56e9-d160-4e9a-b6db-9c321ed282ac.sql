
-- Contact submissions table
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  kind text NOT NULL DEFAULT 'suggestion',
  message text NOT NULL,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT contact_name_len CHECK (char_length(name) BETWEEN 1 AND 100),
  CONSTRAINT contact_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  CONSTRAINT contact_kind_chk CHECK (kind IN ('suggestion','complaint','other')),
  CONSTRAINT contact_msg_len CHECK (char_length(message) BETWEEN 5 AND 4000)
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone (anon + authenticated) can submit a new message
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No SELECT / UPDATE / DELETE policies => readable only via service role (admin)
CREATE INDEX idx_contact_submissions_created_at
  ON public.contact_submissions (created_at DESC);
