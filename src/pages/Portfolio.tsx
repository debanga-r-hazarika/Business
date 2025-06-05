import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/ui/Section';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import MasonryGrid, { LazyLoadImage } from '../components/ui/MasonryGrid';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  client: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: "p1",
    title: "TechFinance Dashboard",
    category: "Software",
    image: "https://images.pexels.com/photos/7889441/pexels-photo-7889441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "An intuitive financial analytics platform with real-time data visualization for investment tracking.",
    client: "CapitalGrowth Inc.",
    featured: true
  },
  {
    id: "p2",
    title: "GreenLife Brand Identity",
    category: "Design",
    image: "https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Complete brand overhaul for an eco-friendly lifestyle company, including logo, color palette, and design system.",
    client: "GreenLife Organics",
    featured: true
  },
  {
    id: "p3",
    title: "Urban Eats Campaign",
    category: "Marketing",
    image: "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Digital marketing campaign increasing online orders by 150% through strategic social media and influencer partnerships.",
    client: "Urban Eats Co."
  },
  {
    id: "p4",
    title: "HealthTrack App",
    category: "Software",
    image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Mobile application for health monitoring with personalized insights, activity tracking, and nutrition guidance.",
    client: "HealthPlus Medical"
  },
  {
    id: "p5",
    title: "Luxury Resort Website",
    category: "Design",
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Immersive website design for a luxury resort, featuring virtual tours, booking system, and responsive layout.",
    client: "Azure Bay Resorts"
  },
  {
    id: "p6",
    title: "E-Commerce Growth Strategy",
    category: "Marketing",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Comprehensive marketing strategy that increased conversion rates by 75% and expanded market reach for an online retailer.",
    client: "StyleHub Fashion"
  },
  {
    id: "p7",
    title: "Smart Home IoT Platform",
    category: "Software",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Integrated IoT platform for managing smart home devices with advanced automation capabilities and intuitive controls.",
    client: "ConnectedLiving Tech"
  },
  {
    id: "p8",
    title: "Sustainable Packaging Design",
    category: "Design",
    image: "https://images.pexels.com/photos/7262996/pexels-photo-7262996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Eco-friendly packaging redesign that reduced materials by 40% while enhancing brand visibility and customer experience.",
    client: "NaturalProducts Co."
  }
];

const categories = ["All", "Software", "Marketing", "Design"];

const Portfolio = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    document.title = 'Our Portfolio | NexusConsult';
    
    // Check for category in URL params
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
    if (category && categories.includes(category)) {
      setActiveCategory(category);
    }
  }, [location.search]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    // Update URL without navigating
    const params = new URLSearchParams(location.search);
    if (category === "All") {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    
    navigate({
      pathname: location.pathname,
      search: params.toString()
    }, { replace: true });
  };
  
  const filteredProjects = projects
    .filter(project => {
      // Filter by category
      if (activeCategory !== "All" && project.category !== activeCategory) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.category.toLowerCase().includes(query) ||
          project.client.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  
  const handleProjectClick = (projectId: string) => {
    navigate(`/portfolio/${projectId}`);
  };

  return (
    <>
      <Helmet>
        <title>Our Portfolio | NexusConsult</title>
        <meta name="description" content="Explore our showcase of successful projects across various industries." />
      </Helmet>
      
      {/* Hero Section */}
      <Section bg="gradient" spacing="large" className="pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Our Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-dark-100 mb-8"
          >
            Explore our showcase of successful projects across various industries.
          </motion.p>
        </div>
      </Section>

      {/* Portfolio Gallery */}
      <Section bg="white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-dark-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
          </div>
        </div>

        {/* Featured Projects (larger) */}
        {activeCategory === "All" && !searchQuery && (
          <div className="mb-12">
            <h2 className="text-2xl font-display font-semibold text-dark-800 mb-6">Featured Projects</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects
                .filter(project => project.featured)
                .map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-medium bg-white h-full">
                      <div className="aspect-[16/9] overflow-hidden">
                        <LazyLoadImage
                          src={project.image}
                          alt={project.title}
                          effect="blur"
                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                        <div className="w-full">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-primary-300 mb-2">{project.category}</p>
                              <h3 className="text-2xl font-display font-semibold text-white mb-2">{project.title}</h3>
                              <p className="text-sm text-dark-300 mb-2">Client: {project.client}</p>
                              <p className="text-dark-200 mb-6">{project.description}</p>
                              <Button
                                variant="outline"
                                className="border-white text-white hover:bg-white/10"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleProjectClick(project.id);
                                }}
                              >
                                View Case Study
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* Masonry Grid for all projects */}
        <div>
          {activeCategory === "All" && !searchQuery && (
            <h2 className="text-2xl font-display font-semibold text-dark-800 mb-6">All Projects</h2>
          )}
          
          <MasonryGrid
            items={filteredProjects.filter(p => !p.featured || activeCategory !== "All" || searchQuery)}
            breakpointColumns={{
              default: 3,
              1100: 3,
              800: 2,
              500: 1
            }}
            renderItem={(project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="mb-6 group cursor-pointer"
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-medium bg-white">
                  <div className="overflow-hidden">
                    <LazyLoadImage
                      src={project.image}
                      alt={project.title}
                      effect="blur"
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="w-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-primary-300 mb-2">{project.category}</p>
                          <h3 className="text-xl font-display font-semibold text-white mb-2">{project.title}</h3>
                          <p className="text-sm text-dark-300 mb-2">Client: {project.client}</p>
                          <p className="text-dark-200 mb-4 text-sm">{project.description}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white text-white hover:bg-white/10 text-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProjectClick(project.id);
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          />
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-dark-500">No projects found matching your criteria.</p>
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

        {/* CTA */}
        <div className="text-center mt-16">
          <Button href="/contact" size="lg">
            Start Your Project
          </Button>
        </div>
      </Section>
    </>
  );
};

export default Portfolio;