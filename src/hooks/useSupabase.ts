import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { 
  BlogPost, 
  BlogComment, 
  ContactSubmission, 
  JobApplication, 
  ApplicationMessage,
  PortfolioProject, 
  TeamMember, 
  Testimonial 
} from '../lib/supabase';

// Blog Posts Hook
export const useBlogPosts = (published = true) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let query = supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (published) {
          query = query.eq('published', true);
        }

        const { data, error } = await query;
        
        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [published]);

  return { posts, loading, error };
};

// Single Blog Post Hook
export const useBlogPost = (slug: string) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();
        
        if (error) throw error;
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Post not found');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return { post, loading, error };
};

// Portfolio Projects Hook
export const usePortfolioProjects = (category?: string) => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let query = supabase
          .from('portfolio_projects')
          .select('*')
          .eq('published', true)
          .order('featured', { ascending: false })
          .order('created_at', { ascending: false });

        if (category && category !== 'All') {
          query = query.eq('category', category);
        }

        const { data, error } = await query;
        
        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [category]);

  return { projects, loading, error };
};

// Single Portfolio Project Hook
export const usePortfolioProject = (slug: string) => {
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_projects')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();
        
        if (error) throw error;
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Project not found');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  return { project, loading, error };
};

// Team Members Hook
export const useTeamMembers = (department?: string) => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        let query = supabase
          .from('team_members')
          .select('*')
          .eq('active', true)
          .order('display_order', { ascending: true });

        if (department && department !== 'All') {
          query = query.eq('department', department);
        }

        const { data, error } = await query;
        
        if (error) throw error;
        setMembers(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [department]);

  return { members, loading, error };
};

// Testimonials Hook
export const useTestimonials = (featured = false) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        let query = supabase
          .from('testimonials')
          .select('*')
          .eq('approved', true)
          .order('display_order', { ascending: true });

        if (featured) {
          query = query.eq('featured', true);
        }

        const { data, error } = await query;
        
        if (error) throw error;
        setTestimonials(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [featured]);

  return { testimonials, loading, error };
};

// Contact Form Submission
export const useContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (formData: Omit<ContactSubmission, 'id' | 'status' | 'priority' | 'created_at' | 'updated_at'>) => {
    setSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form');
    } finally {
      setSubmitting(false);
    }
  };

  return { submitForm, submitting, submitted, error };
};

// Newsletter Subscription
export const useNewsletter = () => {
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (email: string, source = 'website') => {
    setSubscribing(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email, source }]);

      if (error) throw error;
      setSubscribed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to subscribe');
    } finally {
      setSubscribing(false);
    }
  };

  return { subscribe, subscribing, subscribed, error };
};