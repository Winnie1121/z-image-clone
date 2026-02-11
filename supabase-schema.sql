-- 创建 generations 表
CREATE TABLE IF NOT EXISTS public.generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  aspect_ratio VARCHAR(10) DEFAULT '1:1',
  model VARCHAR(50) DEFAULT 'openai/dall-e-3',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_generations_user_id ON public.generations(user_id);
CREATE INDEX IF NOT EXISTS idx_generations_created_at ON public.generations(created_at DESC);

-- 启用行级安全策略 (RLS)
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

-- 创建策略：用户只能查看自己的生成记录
CREATE POLICY "Users can view their own generations"
  ON public.generations
  FOR SELECT
  USING (auth.uid() = user_id);

-- 创建策略：用户只能插入自己的生成记录
CREATE POLICY "Users can insert their own generations"
  ON public.generations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 创建策略：用户只能删除自己的生成记录
CREATE POLICY "Users can delete their own generations"
  ON public.generations
  FOR DELETE
  USING (auth.uid() = user_id);

-- 创建 Storage Bucket for generated images
INSERT INTO storage.buckets (id, name, public)
VALUES ('generated-images', 'generated-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage 策略：允许认证用户上传
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'generated-images');

-- Storage 策略：允许公开访问
CREATE POLICY "Public can view images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'generated-images');
