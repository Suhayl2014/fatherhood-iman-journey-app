-- Create discussions table
CREATE TABLE IF NOT EXISTS public.discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  author_name TEXT,
  author_id UUID,
  likes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create replies table
CREATE TABLE IF NOT EXISTS public.replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id UUID NOT NULL REFERENCES public.discussions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  author_name TEXT,
  author_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create likes table to track which users have liked which discussions
CREATE TABLE IF NOT EXISTS public.discussion_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id UUID NOT NULL REFERENCES public.discussions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(discussion_id, user_id)
);

-- Create RLS policies
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_likes ENABLE ROW LEVEL SECURITY;

-- Policies for discussions
CREATE POLICY "Anyone can view discussions" 
  ON public.discussions FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create discussions" 
  ON public.discussions FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own discussions" 
  ON public.discussions FOR UPDATE 
  USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own discussions" 
  ON public.discussions FOR DELETE 
  USING (auth.uid() = author_id);

-- Policies for replies
CREATE POLICY "Anyone can view replies" 
  ON public.replies FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create replies" 
  ON public.replies FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own replies" 
  ON public.replies FOR UPDATE 
  USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own replies" 
  ON public.replies FOR DELETE 
  USING (auth.uid() = author_id);

-- Policies for likes
CREATE POLICY "Anyone can view likes" 
  ON public.discussion_likes FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create likes" 
  ON public.discussion_likes FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own likes" 
  ON public.discussion_likes FOR DELETE 
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_discussions_updated_at
  BEFORE UPDATE ON public.discussions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_replies_updated_at
  BEFORE UPDATE ON public.replies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 