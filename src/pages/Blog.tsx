import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import Section from '../components/ui/Section';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "The Future of AI in Business Consulting",
    excerpt: "Explore how artificial intelligence is transforming the consulting industry and creating new opportunities for businesses.",
    category: "Technology",
    date: "June 15, 2023",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: {
      name: "Alex Morgan",
      role: "Technology Director",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  },
  {
    id: "b2",
    title: "5 Marketing Trends That Will Dominate 2023",
    excerpt: "Stay ahead of the curve with these emerging marketing trends that are set to reshape the industry this year.",
    category: "Marketing",
    date: "May 22, 2023",
    readTime: "4 min read",
    image: "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: {
      name: "Sophia Chen",
      role: "Marketing Strategist",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  },
  {
    id: "b3",
    title: "Design Systems: Why Every Brand Needs One",
    excerpt: "Learn how implementing a comprehensive design system can streamline your brand's visual identity and improve consistency.",
    category: "Design",
    date: "April 10, 2023",
    readTime: "6 min read",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: {
      name: "Marcus Johnson",
      role: "Creative Director",
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  },
  {
    id: "b4",
    title: "Building Scalable Software Architecture",
    excerpt: "Discover the key principles of designing software systems that can grow with your business needs.",
    category: "Technology",
    date: "March 18, 2023",
    readTime: "7 min read",
    image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: {
      name: "Raj Patel",
      role: "Lead Developer",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  },
  {
    id: "b5",
    title: "The Psychology of Color in Branding",
    excerpt: "Explore how color choices influence consumer perception and how to leverage this in your brand strategy.",
    category: "Design",
    date: "February 28, 2023",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: {
      name: "Emma Williams",
      role: "Brand Strategist",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  },
  {
    id: "b6",
    title: "Optimizing Customer Acquisition Costs",
    excerpt: "Learn strategies to reduce your CAC while maintaining quality leads and improving conversion rates.",
    category: "Marketing",
    date: "January 15, 2023",
    readTime: "4 min read",
    image: "https://images.pexels.com/photos/5833871/pexels-photo-5833871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: {
      name: "Daniel Smith",
      role: "Growth Specialist",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  },
];

const categories = ["All", "Technology", "Marketing", "Design"];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPosts = blogPosts
    .filter(post => {
      if (activeCategory === "All") return true;
      return post.category === activeCategory;
    })
    .filter(post => {
      if (!searchQuery) return true;
      return post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    });

  useEffect(() => {
    document.title = 'Blog & Insights | NexusConsult';
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Section bg="gradient" spacing="large" className="pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Blog & Insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-dark-100 mb-8"
          >
            Industry trends, expert tips, and innovative ideas from our team of consultants.
          </motion.p>
        </div>
      </Section>

      {/* Blog Posts */}
      <Section bg="white">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-50 text-dark-600 hover:bg-dark-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-dark-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="h-full flex flex-col overflow-hidden" padding="none">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-3 flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-dark-800 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-dark-600 mb-4 flex-grow">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-dark-100">
                    <div className="flex items-center">
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.name} 
                        className="w-8 h-8 rounded-full object-cover mr-3" 
                      />
                      <div className="text-sm">
                        <p className="font-medium text-dark-800">{post.author.name}</p>
                        <p className="text-dark-500">{post.author.role}</p>
                      </div>
                    </div>
                    <div className="text-sm text-dark-500 flex items-center">
                      <div className="flex items-center mr-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2">
                  <Button href="#" variant="ghost" className="text-primary-500 hover:text-primary-600 p-0">
                    <span>Read More</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-dark-500">No articles found matching your criteria.</p>
            <Button 
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-16">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        )}
      </Section>

      {/* Newsletter Section */}
      <Section bg="light">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle
            title="Subscribe to Our Newsletter"
            subtitle="Stay updated with our latest insights, industry trends, and exclusive content delivered straight to your inbox."
            centered
          />
          <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg border border-dark-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
            <Button>
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-dark-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </Section>
    </>
  );
};

export default Blog;