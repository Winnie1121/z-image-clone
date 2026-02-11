import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Generation {
  id: string;
  user_id: string;
  prompt: string;
  image_url: string;
  aspect_ratio: string;
  model: string;
  created_at: string;
}
