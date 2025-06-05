import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, User, Tag, Share2, Facebook, Twitter, Linkedin, ArrowLeft, MessageSquare } from 'lucide-react';
import Section from '../components/ui/Section';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// This would typically come from an API or CMS
const blogPostsData = [
  {
    id: "b1",
    title: "The Future of AI in Business Consulting",
    slug: "future-ai-business-consulting",
    excerpt: "Explore how artificial intelligence is transforming the consulting industry and creating new opportunities for businesses.",
    content: `
      <p>Artificial intelligence (AI) is rapidly transforming the business consulting landscape, revolutionizing how consultants analyze data, generate insights, and deliver value to clients. As AI technologies continue to evolve, consulting firms are integrating these tools to enhance their service offerings and provide more data-driven recommendations.</p>
      
      <h2>Data Analysis and Pattern Recognition</h2>
      <p>One of the most significant impacts of AI in consulting is the ability to analyze vast amounts of data quickly and accurately. Traditional data analysis methods often require extensive manual work and can be limited by human cognitive capabilities. AI systems can process enormous datasets, identify patterns that might be missed by human analysts, and generate insights in a fraction of the time.</p>
      <p>Consulting firms are now leveraging machine learning algorithms to analyze client data from multiple sources, including financial records, customer interactions, operational metrics, and market trends. This comprehensive analysis provides a more holistic view of the client's business environment and enables consultants to develop more effective strategies.</p>
      
      <h2>Predictive Analytics and Forecasting</h2>
      <p>AI-powered predictive analytics is enabling consultants to move beyond retrospective analysis to forward-looking forecasting. By training machine learning models on historical data, consulting firms can generate accurate predictions about market trends, customer behavior, and business performance.</p>
      <p>These predictive capabilities allow consultants to provide clients with actionable insights about potential future scenarios, helping them make more informed decisions about resource allocation, market entry strategies, and product development. The ability to quantify the probability of various outcomes also helps clients assess and mitigate risks more effectively.</p>
      
      <h2>Automation of Routine Tasks</h2>
      <p>AI is automating many routine consulting tasks, freeing up consultants to focus on higher-value activities that require human creativity, emotional intelligence, and strategic thinking. Natural language processing (NLP) technologies can analyze documents, extract relevant information, and even generate reports, while robotic process automation (RPA) can streamline data collection and processing.</p>
      <p>By automating these routine tasks, consulting firms can reduce costs, improve efficiency, and allow their consultants to dedicate more time to understanding client needs, developing innovative solutions, and building relationships.</p>
      
      <h2>Personalized Client Experiences</h2>
      <p>AI is enabling consulting firms to deliver more personalized experiences to their clients. By analyzing client data and interaction history, AI systems can help consultants tailor their recommendations, communication style, and deliverables to meet the specific needs and preferences of each client.</p>
      <p>This personalization extends to the implementation of consulting recommendations. AI-powered tools can continuously monitor the results of implemented strategies and suggest adjustments based on real-time performance data, creating a more adaptive and responsive consulting approach.</p>
      
      <h2>Challenges and Ethical Considerations</h2>
      <p>Despite its many benefits, the integration of AI in business consulting also presents challenges and ethical considerations. Consulting firms must ensure that their AI systems are transparent, fair, and free from bias. They must also address concerns about data privacy and security, particularly when handling sensitive client information.</p>
      <p>Additionally, as AI takes on more analytical tasks, consultants must evolve their skill sets to focus on areas where human expertise still outperforms machines, such as creative problem-solving, ethical decision-making, and interpersonal communication.</p>
      
      <h2>The Future Consultant: Human-AI Collaboration</h2>
      <p>The future of business consulting lies not in AI replacing human consultants but in effective collaboration between humans and machines. AI excels at data processing, pattern recognition, and certain types of analytical tasks, while human consultants bring creativity, contextual understanding, emotional intelligence, and ethical judgment.</p>
      <p>Successful consulting firms will be those that leverage AI to enhance human capabilities, creating teams where AI handles routine and data-intensive tasks while human consultants focus on interpretation, strategy development, and client relationships.</p>
      
      <h2>Conclusion</h2>
      <p>AI is not just changing the tools that consultants use; it's transforming the very nature of consulting work. By embracing AI technologies, consulting firms can provide more data-driven insights, deliver greater value to clients, and stay competitive in an evolving market. However, the most successful firms will be those that view AI as a complement to human expertise rather than a replacement for it.</p>
      <p>As AI continues to advance, we can expect even more innovative applications in business consulting, further enhancing the ability of consultants to help their clients navigate complex challenges and seize new opportunities. The consulting firms that thrive in this new era will be those that skillfully integrate AI capabilities while maintaining the human touch that is essential to effective consulting.</p>
    `,
    category: "Technology",
    date: "June 15, 2023",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: {
      name: "Alex Morgan",
      role: "Technology Director",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    tags: ["Artificial Intelligence", "Business Strategy", "Technology Trends", "Digital Transformation"],
    related: ["b2", "b4", "b5"]
  },
  // Additional blog posts would be defined here
];

interface Comment {
  id: string;
  name: string;
  avatar: string;
  date: string;
  content: string;
  replies?: Comment[];
}

const mockComments: Comment[] = [
  {
    id: "c1",
    name: "Jennifer Wilson",
    avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "June 16, 2023",
    content: "Great insights on the future of AI in consulting. I'm particularly interested in how predictive analytics will shape strategic decision-making for businesses in the coming years.",
    replies: [
      {
        id: "c1r1",
        name: "Alex Morgan",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        date: "June 16, 2023",
        content: "Thanks Jennifer! Predictive analytics is indeed one of the most exciting areas. We're seeing clients achieve significant competitive advantages by leveraging these technologies for forward-looking decision making."
      }
    ]
  },
  {
    id: "c2",
    name: "Michael Chen",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "June 17, 2023",
    content: "I appreciate the balanced perspective on human-AI collaboration. Too often the narrative is about replacement rather than augmentation. The most powerful approach is clearly combining human creativity with AI's analytical capabilities."
  }
];

const BlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [commentText, setCommentText] = useState('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // In a real app, you would fetch post data from an API
    // For now, we'll simulate this with a timeout and the mock data
    const timer = setTimeout(() => {
      const foundPost = blogPostsData.find(p => p.id === postId);
      
      if (foundPost) {
        setPost(foundPost);
        document.title = `${foundPost.title} | NexusConsult Blog`;
      } else {
        navigate('/blog', { replace: true });
      }
      
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [postId, navigate]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: `c${Date.now()}`,
      name: "You", // In a real app, this would come from the logged-in user
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: new Date().toISOString().split('T')[0],
      content: commentText
    };
    
    setComments([newComment, ...comments]);
    setCommentText('');
  };

  if (loading) {
    return (
      <Section bg="white\" className="pt-32">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
        </div>
      </Section>
    );
  }

  if (!post) return null;

  return (
    <>
      <Helmet>
        <title>{post.title} | NexusConsult Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero Section */}
      <Section bg="gradient" spacing="large" className="pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 mb-6"
              onClick={() => navigate('/blog')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </motion.div>
          
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm mb-4"
          >
            {post.category}
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            {post.title}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-dark-100"
          >
            <div className="flex items-center">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-8 h-8 rounded-full object-cover mr-2"
              />
              <span>{post.author.name}</span>
            </div>
            
            <div className="hidden sm:block text-dark-300">•</div>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{post.date}</span>
            </div>
            
            <div className="hidden sm:block text-dark-300">•</div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Main Content */}
      <Section bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <LazyLoadImage
                src={post.image}
                alt={post.title}
                effect="blur"
                className="w-full h-auto rounded-lg shadow-medium mb-8"
              />
              
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </motion.div>
            
            {/* Tags */}
            <div className="border-t border-b border-dark-100 py-6 my-8">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-5 w-5 text-dark-500 mr-2" />
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-100 text-dark-800 hover:bg-dark-200 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Share */}
            <div className="mb-12">
              <h3 className="text-lg font-medium text-dark-800 mb-4 flex items-center">
                <Share2 className="h-5 w-5 mr-2" />
                Share This Article
              </h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="p-2 bg-[#3b5998] text-white rounded-full hover:opacity-90 transition-opacity"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-[#1da1f2] text-white rounded-full hover:opacity-90 transition-opacity"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-[#0077b5] text-white rounded-full hover:opacity-90 transition-opacity"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            {/* Author Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-dark-50 rounded-lg p-6 mb-12"
            >
              <div className="flex items-start">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-display font-semibold text-dark-800 text-lg mb-1">{post.author.name}</h3>
                  <p className="text-primary-600 text-sm mb-3">{post.author.role}</p>
                  <p className="text-dark-600">
                    Alex is a technology enthusiast with over 10 years of experience in software development and AI implementation. He helps businesses leverage cutting-edge technologies to solve complex challenges.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Comments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-display font-semibold text-dark-800 mb-6 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Comments ({comments.length})
              </h3>
              
              {/* Comment Form */}
              <Card className="mb-8">
                <h4 className="font-medium text-dark-800 mb-4">Leave a Comment</h4>
                <form onSubmit={handleCommentSubmit}>
                  <div className="mb-4">
                    <textarea
                      rows={4}
                      placeholder="Share your thoughts..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-dark-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" disabled={!commentText.trim()}>
                      Post Comment
                    </Button>
                  </div>
                </form>
              </Card>
              
              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="mb-6">
                    <div className="bg-white rounded-lg p-4 shadow-soft border border-dark-100">
                      <div className="flex items-start mb-3">
                        <img 
                          src={comment.avatar} 
                          alt={comment.name} 
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <h5 className="font-medium text-dark-800">{comment.name}</h5>
                          <p className="text-dark-500 text-xs">{new Date(comment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                      </div>
                      <p className="text-dark-700">{comment.content}</p>
                      <div className="mt-3 flex justify-end">
                        <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
                          Reply
                        </button>
                      </div>
                    </div>
                    
                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-12 mt-3 space-y-3">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="bg-white rounded-lg p-4 shadow-soft border border-dark-100">
                            <div className="flex items-start mb-3">
                              <img 
                                src={reply.avatar} 
                                alt={reply.name} 
                                className="w-8 h-8 rounded-full object-cover mr-3"
                              />
                              <div>
                                <h5 className="font-medium text-dark-800">{reply.name}</h5>
                                <p className="text-dark-500 text-xs">{new Date(reply.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                              </div>
                            </div>
                            <p className="text-dark-700">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Search */}
              <Card className="mb-6">
                <h3 className="font-medium text-dark-800 mb-4">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-dark-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
                </div>
              </Card>
              
              {/* Categories */}
              <Card className="mb-6">
                <h3 className="font-medium text-dark-800 mb-4">Categories</h3>
                <div className="space-y-2">
                  {["Technology", "Marketing", "Design", "Business Strategy", "Industry Insights"].map((category) => (
                    <a
                      key={category}
                      href="#"
                      className="flex items-center justify-between text-dark-600 hover:text-primary-600 transition-colors"
                    >
                      <span>{category}</span>
                      <span className="text-dark-400">
                        {Math.floor(Math.random() * 10) + 1}
                      </span>
                    </a>
                  ))}
                </div>
              </Card>
              
              {/* Related Posts */}
              <Card className="mb-6">
                <h3 className="font-medium text-dark-800 mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {blogPostsData
                    .filter(p => post.related.includes(p.id))
                    .map((relatedPost) => (
                      <a
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.id}`}
                        className="flex items-start group"
                      >
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-16 h-16 object-cover rounded mr-3 flex-shrink-0"
                        />
                        <div>
                          <h4 className="text-dark-800 group-hover:text-primary-600 transition-colors font-medium text-sm line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-dark-500 text-xs mt-1">{relatedPost.date}</p>
                        </div>
                      </a>
                    ))}
                </div>
              </Card>
              
              {/* Tags */}
              <Card>
                <h3 className="font-medium text-dark-800 mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {[...new Set([...post.tags, "Digital Transformation", "Innovation", "Leadership", "Customer Experience"])].map((tag) => (
                    <a
                      key={tag}
                      href="#"
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-100 text-dark-800 hover:bg-primary-100 hover:text-primary-800 transition-colors"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* Newsletter */}
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

export default BlogPost;