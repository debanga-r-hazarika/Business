/*
  # Core Database Schema for NexusConsult

  1. New Tables
    - `blog_posts` - Blog articles with metadata
    - `blog_comments` - Comments on blog posts
    - `contact_submissions` - Contact form submissions
    - `job_applications` - Career applications
    - `application_messages` - Messages between applicants and company
    - `portfolio_projects` - Portfolio projects showcase
    - `team_members` - Team member profiles
    - `testimonials` - Client testimonials

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
    - Ensure data privacy and access control

  3. Features
    - Full-text search on blog posts
    - Application tracking system
    - Message threading for applications
    - Portfolio categorization
*/

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  featured_image text,
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  published boolean DEFAULT false,
  read_time text DEFAULT '5 min read',
  tags text[] DEFAULT '{}',
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog Comments Table
CREATE TABLE IF NOT EXISTS blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE NOT NULL,
  parent_id uuid REFERENCES blog_comments(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  author_email text NOT NULL,
  author_avatar text,
  content text NOT NULL,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  file_url text,
  status text DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'archived')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assigned_to uuid REFERENCES auth.users(id),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Job Applications Table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  position_title text NOT NULL,
  department text NOT NULL,
  application_type text DEFAULT 'full-time' CHECK (application_type IN ('full-time', 'part-time', 'internship', 'contract')),
  resume_url text,
  cover_letter text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'interview', 'task', 'accepted', 'rejected')),
  feedback text,
  next_step text,
  task_description text,
  task_due_date timestamptz,
  task_submitted boolean DEFAULT false,
  task_submission_url text,
  interview_scheduled_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Application Messages Table
CREATE TABLE IF NOT EXISTS application_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES job_applications(id) ON DELETE CASCADE NOT NULL,
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  sender_type text NOT NULL CHECK (sender_type IN ('applicant', 'company')),
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Portfolio Projects Table
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  client_name text NOT NULL,
  short_description text NOT NULL,
  full_description text,
  challenge text,
  solution text,
  results text[],
  featured_image text NOT NULL,
  gallery_images jsonb DEFAULT '[]',
  technologies text[] DEFAULT '{}',
  services text[] DEFAULT '{}',
  testimonial jsonb,
  project_url text,
  completion_date date,
  duration text,
  featured boolean DEFAULT false,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  department text NOT NULL,
  bio text NOT NULL,
  image_url text NOT NULL,
  email text,
  linkedin_url text,
  twitter_url text,
  website_url text,
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_role text NOT NULL,
  client_company text NOT NULL,
  client_image text,
  content text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  project_id uuid REFERENCES portfolio_projects(id),
  featured boolean DEFAULT false,
  approved boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Newsletter Subscriptions Table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed boolean DEFAULT true,
  source text DEFAULT 'website',
  created_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Blog Posts Policies
CREATE POLICY "Blog posts are publicly readable" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Authenticated users can manage blog posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Blog Comments Policies
CREATE POLICY "Comments are publicly readable" ON blog_comments
  FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can create comments" ON blog_comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can manage comments" ON blog_comments
  FOR ALL USING (auth.role() = 'authenticated');

-- Contact Submissions Policies
CREATE POLICY "Anyone can create contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact submissions" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update contact submissions" ON contact_submissions
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Job Applications Policies
CREATE POLICY "Users can view their own applications" ON job_applications
  FOR SELECT USING (auth.uid() = applicant_id);

CREATE POLICY "Users can create applications" ON job_applications
  FOR INSERT WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Users can update their own applications" ON job_applications
  FOR UPDATE USING (auth.uid() = applicant_id);

CREATE POLICY "Authenticated staff can view all applications" ON job_applications
  FOR ALL USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() 
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Application Messages Policies
CREATE POLICY "Users can view messages for their applications" ON application_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM job_applications 
      WHERE id = application_id 
      AND applicant_id = auth.uid()
    )
    OR 
    (auth.role() = 'authenticated' AND sender_type = 'company')
  );

CREATE POLICY "Users can create messages for their applications" ON application_messages
  FOR INSERT WITH CHECK (
    (EXISTS (
      SELECT 1 FROM job_applications 
      WHERE id = application_id 
      AND applicant_id = auth.uid()
    ) AND sender_type = 'applicant')
    OR 
    (auth.role() = 'authenticated' AND sender_type = 'company')
  );

-- Portfolio Projects Policies
CREATE POLICY "Portfolio projects are publicly readable" ON portfolio_projects
  FOR SELECT USING (published = true);

CREATE POLICY "Authenticated users can manage portfolio projects" ON portfolio_projects
  FOR ALL USING (auth.role() = 'authenticated');

-- Team Members Policies
CREATE POLICY "Team members are publicly readable" ON team_members
  FOR SELECT USING (active = true);

CREATE POLICY "Authenticated users can manage team members" ON team_members
  FOR ALL USING (auth.role() = 'authenticated');

-- Testimonials Policies
CREATE POLICY "Approved testimonials are publicly readable" ON testimonials
  FOR SELECT USING (approved = true);

CREATE POLICY "Authenticated users can manage testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

-- Newsletter Subscriptions Policies
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscriptions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can manage their own subscription" ON newsletter_subscriptions
  FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_comments_post_id ON blog_comments(post_id, created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_applicant ON job_applications(applicant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_application_messages_application ON application_messages(application_id, created_at);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_category ON portfolio_projects(category, published);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_featured ON portfolio_projects(featured, published);
CREATE INDEX IF NOT EXISTS idx_team_members_department ON team_members(department, display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured, approved);

-- Enable full-text search on blog posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_search ON blog_posts 
USING gin(to_tsvector('english', title || ' ' || excerpt || ' ' || content));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON job_applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_projects_updated_at BEFORE UPDATE ON portfolio_projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();