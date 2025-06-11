import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featured_image?: string;
  author_id?: string;
  published: boolean;
  read_time: string;
  tags: string[];
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogComment {
  id: string;
  post_id: string;
  parent_id?: string;
  author_name: string;
  author_email: string;
  author_avatar?: string;
  content: string;
  approved: boolean;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  file_url?: string;
  status: 'new' | 'in_progress' | 'completed' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  applicant_id?: string;
  position_title: string;
  department: string;
  application_type: 'full-time' | 'part-time' | 'internship' | 'contract';
  resume_url?: string;
  cover_letter?: string;
  status: 'pending' | 'reviewing' | 'interview' | 'task' | 'accepted' | 'rejected';
  feedback?: string;
  next_step?: string;
  task_description?: string;
  task_due_date?: string;
  task_submitted: boolean;
  task_submission_url?: string;
  interview_scheduled_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ApplicationMessage {
  id: string;
  application_id: string;
  sender_id: string;
  sender_type: 'applicant' | 'company';
  content: string;
  read: boolean;
  created_at: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  client_name: string;
  short_description: string;
  full_description?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  featured_image: string;
  gallery_images?: any[];
  technologies?: string[];
  services?: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  project_url?: string;
  completion_date?: string;
  duration?: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  image_url: string;
  email?: string;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_role: string;
  client_company: string;
  client_image?: string;
  content: string;
  rating: number;
  project_id?: string;
  featured: boolean;
  approved: boolean;
  display_order: number;
  created_at: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribed: boolean;
  source: string;
  created_at: string;
  unsubscribed_at?: string;
}