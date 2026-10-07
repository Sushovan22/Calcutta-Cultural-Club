CREATE TABLE public.contact_submissions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 100), phone text NOT NULL CHECK (phone ~ '^\+?[0-9 ()-]{7,25}$'), interest text NOT NULL CHECK (interest IN ('Social work','Cultural activities','Fun tourism','Others')), thought text NOT NULL DEFAULT '' CHECK (char_length(thought) <= 1000), created_at timestamptz NOT NULL DEFAULT now(), CHECK (interest <> 'Others' OR char_length(btrim(thought)) > 0)
);
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors submit contact requests" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE TABLE public.community_photos (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), path text NOT NULL UNIQUE CHECK (path ~ '^gallery/[a-f0-9-]+\.(jpg|png|webp)$'), handle text NOT NULL DEFAULT '' CHECK (char_length(handle) <= 100), caption text NOT NULL DEFAULT '' CHECK (char_length(caption) <= 200), created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.community_photos TO anon, authenticated;
GRANT ALL ON public.community_photos TO service_role;
ALTER TABLE public.community_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone views community captions" ON public.community_photos FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone submits community captions" ON public.community_photos FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Visitors upload community images" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'community-photos' AND (storage.foldername(name))[1] = 'gallery' AND lower(storage.extension(name)) IN ('jpg','png','webp'));
CREATE POLICY "Visitors view community images" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'community-photos' AND (storage.foldername(name))[1] = 'gallery');