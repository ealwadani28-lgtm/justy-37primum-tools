
CREATE TABLE public.seo_index_scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ran_at timestamptz NOT NULL DEFAULT now(),
  urls_checked int NOT NULL DEFAULT 0,
  issues_found int NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'ok',
  notes text
);
GRANT SELECT ON public.seo_index_scans TO authenticated;
GRANT ALL ON public.seo_index_scans TO service_role;
ALTER TABLE public.seo_index_scans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "svc only" ON public.seo_index_scans FOR SELECT TO authenticated USING (false);

CREATE TABLE public.seo_index_issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id uuid REFERENCES public.seo_index_scans(id) ON DELETE CASCADE,
  url text NOT NULL,
  verdict text,
  coverage_state text,
  robots_txt_state text,
  indexing_state text,
  issue_type text NOT NULL,
  raw jsonb,
  detected_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX seo_index_issues_scan_id_idx ON public.seo_index_issues(scan_id);
CREATE INDEX seo_index_issues_url_idx ON public.seo_index_issues(url);
GRANT SELECT ON public.seo_index_issues TO authenticated;
GRANT ALL ON public.seo_index_issues TO service_role;
ALTER TABLE public.seo_index_issues ENABLE ROW LEVEL SECURITY;
CREATE POLICY "svc only issues" ON public.seo_index_issues FOR SELECT TO authenticated USING (false);
