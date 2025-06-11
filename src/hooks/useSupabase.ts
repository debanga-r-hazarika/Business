import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Blog Posts Hook
export const useBlogPosts = (category?: string, limit?: number) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      // Return mock data if Supabase is not configured
      if (!isSupabaseConfigured()) {
        // Return mock blog posts
        const mockPosts = [
          {
            id: 'b1',
            title: 'The Future of AI in Business Consulting',
            slug: 'future-ai-business-consulting',
            excerpt: 'Explore how artificial intelligence is transforming the consulting industry.',
            category: 'Technology',
            status: 'published',
            featured_image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg',
            author_name: 'Alex Morgan',
            published_at: '2023-06-15',
            created_at: '2023-06-15'
          }
        ];
        
        const filteredPosts = category 
          ? mockPosts.filter(post => post.category === category)
          : mockPosts;
          
        setPosts(limit ? filteredPosts.slice(0, limit) : filteredPosts);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        let query = supabase!
          .from('blog_posts')
          .select(`
            *,
            profiles:author_id (
              full_name
            )
          `)
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (category) {
          query = query.eq('category', category);
        }

        if (limit) {
          query = query.limit(limit);
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
  }, [category, limit]);

  return { posts, loading, error };
};

// Single Blog Post Hook
export const useBlogPost = (slug: string) => {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      // Return mock data if Supabase is not configured
      if (!isSupabaseConfigured()) {
        // Mock single post data
        setPost({
          id: 'b1',
          title: 'The Future of AI in Business Consulting',
          content: '<p>Mock blog post content...</p>',
          category: 'Technology',
          author_name: 'Alex Morgan'
        });
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase!
          .from('blog_posts')
          .select(`
            *,
            profiles:author_id (
              full_name
            )
          `)
          .eq('slug', slug)
          .eq('status', 'published')
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
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      // Return mock data if Supabase is not configured
      if (!isSupabaseConfigured()) {
        const mockProjects = [
          {
            id: 'p1',
            title: 'TechFinance Dashboard',
            category: 'Software',
            description: 'Financial analytics platform',
            featured_image: 'https://images.pexels.com/photos/7889441/pexels-photo-7889441.jpeg',
            client: 'CapitalGrowth Inc.'
          }
        ];
        
        const filteredProjects = category 
          ? mockProjects.filter(project => project.category === category)
          : mockProjects;
          
        setProjects(filteredProjects);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        let query = supabase!
          .from('portfolio_projects')
          .select('*')
          .eq('status', 'published')
          .order('featured', { ascending: false })
          .order('created_at', { ascending: false });

        if (category) {
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

// Contact Form Hook
export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (formData: any) => {
    // If Supabase is not configured, simulate success
    if (!isSupabaseConfigured()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
      }, 1000);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase!
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          status: 'new'
        }]);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { submitForm, loading, success, error };
};

// Newsletter Hook
export const useNewsletter = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (email: string) => {
    // If Supabase is not configured, simulate success
    if (!isSupabaseConfigured()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }, 1000);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase!
        .from('newsletter_subscriptions')
        .insert([{
          email,
          status: 'active'
        }]);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { subscribe, loading, success, error };
};