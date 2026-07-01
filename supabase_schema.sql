-- Create website_audits table
CREATE TABLE IF NOT EXISTS public.website_audits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    performance_score INTEGER,
    seo_score INTEGER,
    accessibility_score INTEGER,
    best_practices_score INTEGER,
    lcp_val NUMERIC,
    cls_val NUMERIC,
    fcp_val NUMERIC,
    inp_val NUMERIC,
    meta_title TEXT,
    meta_description TEXT,
    meta_title_status VARCHAR(50),
    meta_desc_status VARCHAR(50),
    h1_count INTEGER,
    broken_links_count INTEGER,
    raw_pagespeed_json JSONB,
    raw_dataforseo_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.website_audits ENABLE ROW LEVEL SECURITY;

-- Create policy to bypass/allow all operations for the service role (default behavior)
-- Note: PostgreSQL service_role key automatically bypasses RLS, but we can add public access policies if needed.

CREATE POLICY "Allow public inserts" ON public.website_audits
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow read access for dashboard queries" ON public.website_audits
    FOR SELECT USING (true);
