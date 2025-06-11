/*
  # Seed Sample Data for NexusConsult

  This migration adds sample data to demonstrate the application functionality:
  - Blog posts with sample content
  - Portfolio projects
  - Team members
  - Testimonials
  - Sample job applications structure
*/

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, category, featured_image, published, read_time, tags, meta_description) VALUES
(
  'The Future of AI in Business Consulting',
  'future-ai-business-consulting',
  'Explore how artificial intelligence is transforming the consulting industry and creating new opportunities for businesses.',
  '<p>Artificial intelligence (AI) is rapidly transforming the business consulting landscape, revolutionizing how consultants analyze data, generate insights, and deliver value to clients...</p><h2>Data Analysis and Pattern Recognition</h2><p>One of the most significant impacts of AI in consulting is the ability to analyze vast amounts of data quickly and accurately...</p>',
  'Technology',
  'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  true,
  '8 min read',
  ARRAY['AI', 'Business Strategy', 'Technology', 'Innovation'],
  'Discover how AI is revolutionizing business consulting and what it means for the future of strategic decision-making.'
),
(
  'Digital Marketing Trends for 2024',
  'digital-marketing-trends-2024',
  'Stay ahead of the curve with the latest digital marketing trends that will dominate the industry this year.',
  '<p>As we progress through 2024, digital marketing continues to evolve at a rapid pace. Businesses must stay informed about the latest trends to remain competitive...</p><h2>Personalization at Scale</h2><p>The demand for personalized experiences has never been higher...</p>',
  'Marketing',
  'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  true,
  '6 min read',
  ARRAY['Digital Marketing', 'Trends', 'Strategy', '2024'],
  'Explore the top digital marketing trends for 2024 and learn how to implement them in your business strategy.'
),
(
  'Building Scalable Software Architecture',
  'building-scalable-software-architecture',
  'Learn the fundamental principles of designing software systems that can grow with your business needs.',
  '<p>Creating scalable software architecture is crucial for businesses that anticipate growth. A well-designed system can handle increased load, user base, and feature complexity...</p><h2>Microservices vs Monolithic Architecture</h2><p>When designing scalable systems, one of the first decisions is choosing between microservices and monolithic architecture...</p>',
  'Technology',
  'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  true,
  '10 min read',
  ARRAY['Software Architecture', 'Scalability', 'Development', 'Best Practices'],
  'Master the art of building scalable software architecture with proven principles and real-world examples.'
);

-- Insert sample portfolio projects
INSERT INTO portfolio_projects (
  title, slug, category, client_name, short_description, full_description,
  challenge, solution, results, featured_image, gallery_images,
  technologies, services, testimonial, completion_date, duration, featured, published
) VALUES
(
  'TechFinance Dashboard',
  'techfinance-dashboard',
  'Software',
  'CapitalGrowth Inc.',
  'An intuitive financial analytics platform with real-time data visualization for investment tracking.',
  'CapitalGrowth Inc. needed a robust financial analytics platform to help their clients visualize investment data and make informed decisions. We developed a comprehensive dashboard with real-time data integration and intuitive visualization tools.',
  'The client required a system that could handle large volumes of financial data with minimal latency, while providing intuitive visualizations for complex financial metrics. Security and data privacy were paramount concerns.',
  'We designed a scalable architecture using React for the frontend and Node.js for the backend. We implemented D3.js for custom data visualizations and established secure API connections to financial data sources.',
  ARRAY['Reduced data analysis time by 65%', 'Increased client retention by 28%', 'Enabled real-time decision making', 'Improved data accuracy by 42%'],
  'https://images.pexels.com/photos/7889441/pexels-photo-7889441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  '[
    {"src": "https://images.pexels.com/photos/7821483/pexels-photo-7821483.jpeg", "alt": "Dashboard Main View"},
    {"src": "https://images.pexels.com/photos/8370/pexels-photo.jpg", "alt": "Analytics Interface"}
  ]',
  ARRAY['React', 'Node.js', 'D3.js', 'PostgreSQL', 'AWS'],
  ARRAY['Custom Web Application', 'Data Visualization', 'UX/UI Design'],
  '{"quote": "The TechFinance Dashboard has transformed how we analyze and present financial data to our clients.", "author": "Michael Chen", "position": "CTO, CapitalGrowth Inc."}',
  '2024-01-15',
  '4 months',
  true,
  true
),
(
  'GreenLife Brand Identity',
  'greenlife-brand-identity',
  'Design',
  'GreenLife Organics',
  'Complete brand overhaul for an eco-friendly lifestyle company, including logo, color palette, and design system.',
  'GreenLife Organics sought a complete brand overhaul to better reflect their eco-friendly mission and connect with environmentally conscious consumers.',
  'The client needed a brand identity that would resonate with eco-conscious consumers while still appearing premium and trustworthy.',
  'We conducted extensive market research and developed a brand strategy that positioned GreenLife as both premium and environmentally responsible. We created a minimalist yet warm visual identity.',
  ARRAY['35% increase in brand recognition', '42% improvement in customer perception', '29% higher social media engagement', 'Successful expansion into 3 new retail chains'],
  'https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  '[
    {"src": "https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg", "alt": "Logo Design"},
    {"src": "https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg", "alt": "Brand Colors"}
  ]',
  ARRAY['Adobe Creative Suite', 'Figma', 'Brand Strategy'],
  ARRAY['Brand Strategy', 'Logo Design', 'Visual Identity', 'Brand Guidelines'],
  '{"quote": "The new identity has resonated strongly with our customers and has been instrumental in our recent growth.", "author": "Sarah Miller", "position": "CEO, GreenLife Organics"}',
  '2024-03-20',
  '3 months',
  true,
  true
);

-- Insert sample team members
INSERT INTO team_members (name, role, department, bio, image_url, email, linkedin_url, display_order, active) VALUES
(
  'David Chen',
  'CEO & Founder',
  'Leadership',
  'David founded NexusConsult with a vision to help businesses leverage technology and creative solutions to achieve their goals. With over 15 years of experience in technology consulting, he leads the company''s strategic direction.',
  'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
  'david@nexusconsult.com',
  'https://linkedin.com/in/davidchen',
  1,
  true
),
(
  'Sarah Johnson',
  'CTO',
  'Technology',
  'Sarah oversees the technology department, ensuring our software solutions are innovative, scalable, and built with the highest standards. Her expertise in software architecture drives our technical excellence.',
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
  'sarah@nexusconsult.com',
  'https://linkedin.com/in/sarahjohnson',
  2,
  true
),
(
  'Michael Rodriguez',
  'Marketing Director',
  'Marketing',
  'Michael leads our marketing department, developing strategic campaigns that deliver measurable results. His data-driven approach helps our clients achieve significant growth.',
  'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
  'michael@nexusconsult.com',
  'https://linkedin.com/in/michaelrodriguez',
  3,
  true
),
(
  'Emily Chen',
  'Creative Director',
  'Design',
  'Emily directs our design team, bringing brands to life through compelling visual identities and user experiences. Her background in brand strategy ensures effective designs.',
  'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
  'emily@nexusconsult.com',
  'https://linkedin.com/in/emilychen',
  4,
  true
);

-- Insert sample testimonials
INSERT INTO testimonials (client_name, client_role, client_company, client_image, content, rating, featured, approved, display_order) VALUES
(
  'Sarah Johnson',
  'CEO',
  'TechInnovate',
  'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
  'NexusConsult transformed our business with their innovative software solutions. Their team delivered beyond our expectations, creating a system that increased our efficiency by 40%.',
  5,
  true,
  true,
  1
),
(
  'Michael Rodriguez',
  'Marketing Director',
  'GrowthCorp',
  'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
  'The marketing strategy developed by NexusConsult helped us reach new audiences and significantly increase our online presence. Their data-driven approach delivered exceptional results.',
  5,
  true,
  true,
  2
),
(
  'Emily Chen',
  'Product Manager',
  'InnovateCo',
  'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
  'Working with NexusConsult on our product redesign was exceptional. Their design team created an intuitive interface that our users love, resulting in improved engagement.',
  5,
  true,
  true,
  3
);