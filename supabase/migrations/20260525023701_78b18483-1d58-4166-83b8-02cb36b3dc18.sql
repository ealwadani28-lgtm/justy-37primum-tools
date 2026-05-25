-- Counter for site visits (single-row design)
CREATE TABLE public.visit_counter (
  id smallint PRIMARY KEY DEFAULT 1,
  total bigint NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

INSERT INTO public.visit_counter (id, total) VALUES (1, 0);

ALTER TABLE public.visit_counter ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read visit counter"
ON public.visit_counter FOR SELECT
TO anon, authenticated
USING (true);

-- Deny direct writes; only the SECURITY DEFINER function may mutate.
CREATE POLICY "Deny direct insert" ON public.visit_counter FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "Deny direct update" ON public.visit_counter FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Deny direct delete" ON public.visit_counter FOR DELETE TO anon, authenticated USING (false);

-- Atomic increment + return new total
CREATE OR REPLACE FUNCTION public.increment_visit_counter()
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_total bigint;
BEGIN
  UPDATE public.visit_counter
     SET total = total + 1,
         updated_at = now()
   WHERE id = 1
   RETURNING total INTO new_total;
  RETURN new_total;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_visit_counter() TO anon, authenticated;