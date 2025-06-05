import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, ExternalLink, Tag } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import ImageLightbox from '../components/ui/ImageLightbox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SmoothScroll from '../components/ui/SmoothScroll';

// This would typically come from an API or CMS
const projectsData = [
  {
    id: "p1",
    title: "TechFinance Dashboard",
    category: "Software",
    slug: "techfinance-dashboard",
    client: "CapitalGrowth Inc.",
    completedDate: "January 2023",
    duration: "4 months",
    services: ["Custom Web Application", "Data Visualization", "UX/UI Design"],
    technologies: ["React", "Node.js", "D3.js", "PostgreSQL"],
    mainImage: "https://images.pexels.com/photos/7889441/pexels-photo-7889441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    overview: "CapitalGrowth Inc. needed a robust financial analytics platform to help their clients visualize investment data and make informed decisions. We developed a comprehensive dashboard with real-time data integration and intuitive visualization tools.",
    challenge: "The client required a system that could handle large volumes of financial data with minimal latency, while providing intuitive visualizations for complex financial metrics. Security and data privacy were paramount concerns.",
    solution: "We designed a scalable architecture using React for the frontend and Node.js for the backend. We implemented D3.js for custom data visualizations and established secure API connections to financial data sources. The system features role-based access control and end-to-end encryption.",
    results: [
      "Reduced data analysis time by 65%",
      "Increased client retention by 28%",
      "Enabled real-time decision making",
      "Improved data accuracy by 42%"
    ],
    testimonial: {
      quote: "The TechFinance Dashboard has transformed how we analyze and present financial data to our clients. It's intuitive, powerful, and has become an essential tool for our advisory services.",
      author: "Michael Chen",
      position: "CTO, CapitalGrowth Inc."
    },
    galleryImages: [
      {
        src: "https://images.pexels.com/photos/7821483/pexels-photo-7821483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Dashboard Main View"
      },
      {
        src: "https://images.pexels.com/photos/8370/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Financial Analytics Interface"
      },
      {
        src: "https://images.pexels.com/photos/106344/pexels-photo-106344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Data Visualization Components"
      },
      {
        src: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Mobile Interface"
      }
    ],
    nextProject: "p2",
    prevProject: "p4"
  },
  {
    id: "p2",
    title: "GreenLife Brand Identity",
    category: "Design",
    slug: "greenlife-brand-identity",
    client: "GreenLife Organics",
    completedDate: "March 2023",
    duration: "3 months",
    services: ["Brand Strategy", "Logo Design", "Visual Identity", "Brand Guidelines"],
    technologies: ["Adobe Creative Suite", "Brand Strategy Framework", "Style Guide Development"],
    mainImage: "https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    overview: "GreenLife Organics sought a complete brand overhaul to better reflect their eco-friendly mission and connect with environmentally conscious consumers. We created a cohesive brand identity that communicates their values and differentiates them in the market.",
    challenge: "The client needed a brand identity that would resonate with eco-conscious consumers while still appearing premium and trustworthy. They required a complete system that could be applied consistently across physical products, packaging, digital platforms, and retail environments.",
    solution: "We conducted extensive market research and stakeholder interviews to develop a brand strategy that positioned GreenLife as both premium and environmentally responsible. We created a minimalist yet warm visual identity with a nature-inspired color palette, custom typography, and versatile iconography.",
    results: [
      "35% increase in brand recognition in target markets",
      "42% improvement in customer perception of brand quality",
      "29% higher engagement on social media platforms",
      "Successful expansion into 3 new retail chains"
    ],
    testimonial: {
      quote: "The NexusConsult team captured the essence of our brand perfectly. The new identity has resonated strongly with our customers and has been instrumental in our recent growth.",
      author: "Sarah Miller",
      position: "CEO, GreenLife Organics"
    },
    galleryImages: [
      {
        src: "https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Logo Design"
      },
      {
        src: "https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Brand Color Palette"
      },
      {
        src: "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Packaging Design"
      },
      {
        src: "https://images.pexels.com/photos/6044226/pexels-photo-6044226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Marketing Materials"
      }
    ],
    nextProject: "p3",
    prevProject: "p1"
  },
  // Additional projects would be defined here
];

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // In a real app, you would fetch project data from an API
    // For now, we'll simulate this with a timeout and the mock data
    const timer = setTimeout(() => {
      const foundProject = projectsData.find(p => p.id === projectId);
      
      if (foundProject) {
        setProject(foundProject);
        document.title = `${foundProject.title} | NexusConsult Portfolio`;
      } else {
        navigate('/portfolio', { replace: true });
      }
      
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [projectId, navigate]);
  
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  
  const handlePrevProject = () => {
    if (project?.prevProject) {
      navigate(`/portfolio/${project.prevProject}`);
    }
  };
  
  const handleNextProject = () => {
    if (project?.nextProject) {
      navigate(`/portfolio/${project.nextProject}`);
    }
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

  if (!project) return null;

  return (
    <>
      <Helmet>
        <title>{`${project.title} | NexusConsult Portfolio`}</title>
        <meta name="description" content={project.overview} />
        <meta property="og:title" content={`${project.title} | NexusConsult Portfolio`} />
        <meta property="og:description" content={project.overview} />
        <meta property="og:image" content={project.mainImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <ImageLightbox
        images={project.galleryImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      {/* Hero Section */}
      <Section bg="gradient" spacing="large" className="pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm mb-4"
          >
            {project.category}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            {project.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-dark-100 mb-8"
          >
            {project.overview}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <SmoothScroll to="project-details" offset={-100}>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                View Project Details
              </Button>
            </SmoothScroll>
            <SmoothScroll to="project-gallery" offset={-100}>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                See Gallery
              </Button>
            </SmoothScroll>
          </motion.div>
        </div>
      </Section>

      {/* Main Project Image */}
      <Section bg="white" spacing="small" className="-mt-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg overflow-hidden shadow-hard"
          >
            <LazyLoadImage
              src={project.mainImage}
              alt={project.title}
              effect="blur"
              className="w-full h-auto"
              wrapperClassName="w-full"
            />
          </motion.div>
        </div>
      </Section>

      {/* Project Details */}
      <Section bg="white" id="project-details">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Project Information */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <h2 className="text-2xl font-display font-bold text-dark-800 mb-6">The Challenge</h2>
              <p className="text-dark-600 text-lg leading-relaxed">{project.challenge}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-10"
            >
              <h2 className="text-2xl font-display font-bold text-dark-800 mb-6">Our Solution</h2>
              <p className="text-dark-600 text-lg leading-relaxed">{project.solution}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-10"
            >
              <h2 className="text-2xl font-display font-bold text-dark-800 mb-6">The Results</h2>
              <ul className="space-y-4">
                {project.results.map((result: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="p-1 bg-primary-100 rounded-full mr-3 mt-1">
                      <div className="p-1 bg-primary-500 rounded-full"></div>
                    </div>
                    <span className="text-dark-600 text-lg">{result}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-dark-50 p-6 rounded-lg border-l-4 border-primary-500"
            >
              <blockquote className="text-dark-700 text-lg italic mb-4">"{project.testimonial.quote}"</blockquote>
              <div className="flex items-center">
                <div className="mr-3 text-primary-500">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-dark-800">{project.testimonial.author}</p>
                  <p className="text-dark-500 text-sm">{project.testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Project Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-dark-100 rounded-lg shadow-medium p-6 sticky top-24"
            >
              <h3 className="text-lg font-display font-semibold text-dark-800 mb-6 pb-4 border-b border-dark-100">Project Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <User className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-dark-500">Client</p>
                    <p className="font-medium text-dark-800">{project.client}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-dark-500">Completed</p>
                    <p className="font-medium text-dark-800">{project.completedDate}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-dark-500">Duration</p>
                    <p className="font-medium text-dark-800">{project.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Tag className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-dark-500">Category</p>
                    <p className="font-medium text-dark-800">{project.category}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-dark-100">
                <h4 className="font-medium text-dark-800 mb-3">Services Provided</h4>
                <ul className="space-y-2">
                  {project.services.map((service: string, index: number) => (
                    <li key={index} className="text-dark-600">{service}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 pt-6 border-t border-dark-100">
                <h4 className="font-medium text-dark-800 mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, index: number) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <Button href="/contact" fullWidth>
                  Start a Similar Project
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Project Gallery */}
      <Section bg="light" id="project-gallery">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-display font-bold text-dark-800 mb-8 text-center">Project Gallery</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {project.galleryImages.map((image: any, index: number) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="rounded-lg overflow-hidden shadow-medium cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <LazyLoadImage
                  src={image.src}
                  alt={image.alt}
                  effect="blur"
                  className="w-full h-auto"
                  wrapperClassName="w-full"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Navigation between projects */}
      <Section bg="white" spacing="medium">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline"
            onClick={handlePrevProject}
            disabled={!project.prevProject}
            className={!project.prevProject ? 'opacity-50 cursor-not-allowed' : ''}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous Project
          </Button>
          
          <Button href="/portfolio">
            All Projects
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleNextProject}
            disabled={!project.nextProject}
            className={!project.nextProject ? 'opacity-50 cursor-not-allowed' : ''}
          >
            Next Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Section>
    </>
  );
};

export default ProjectDetail;