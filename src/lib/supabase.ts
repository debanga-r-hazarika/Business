import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

// Only create Supabase client if environment variables are properly configured
if (supabaseUrl && supabaseAnonKey && 
    supabaseUrl !== 'your-supabase-url-here' && 
    supabaseAnonKey !== 'your-supabase-anon-key-here') {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// Export a function to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return supabase !== null;
};

// Export supabase client (can be null if not configured)
export { supabase };

// Helper function to get supabase client with error handling
export const getSupabaseClient = (): SupabaseClient => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set up your environment variables.');
  }
  return supabase;
};

// Database types (will be generated after connecting to Supabase)
export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string;
          category: string;
          status: 'draft' | 'published';
          featured_image: string | null;
          author_id: string;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>;
      };
      // Add more table types as needed
    };
  };
}