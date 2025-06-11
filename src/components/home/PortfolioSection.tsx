import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import Section from '../ui/Section';
import Button from '../ui/Button';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  client: string;
}

const projects: Project[] = [
  {
    id: "p1",
    title: "Financial Analytics Platform",
    category: "Software",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    description: "Advanced dashboard with real-time data visualization and predictive analytics.",
    client: "FinTech Corp"
  },
  {
    id: "p2",
    title: "E-commerce Growth Campaign",
    category: "Marketing",
    image: "https://images.pexels.com/photos/6214/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    description: "Comprehensive digital strategy that increased online sales by 200%.",
    client: "Retail Plus"
  },
  {
    id: "p3",
    title: "Modern Brand Identity",
    category: "Design",
    image: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    description: "Complete brand redesign for a sustainable lifestyle company.",
    client: "EcoLife"
  },
  {
    id: "p4",
    title: "Healthcare App Platform",
    category: "Software",
    image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    description: "Patient management system with telemedicine capabilities.",
    client: "MedCare"
  },
];

const categories = ["All", "Software", "Marketing", "Design"];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <Section bg="light" spacing="large">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm text-dark-600 text-sm font-medium rounded-full mb-4">
            Our Work
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-800 mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Discover how we've helped businesses transform their digital presence and achieve remarkable growth.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary-500 text-white shadow-medium'
                  : 'bg-white text-dark-600 hover:bg-dark-50 shadow-soft'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-medium transition-all duration-500 group-hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay content */}
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full">
                    <span className="inline-block px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-display font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-white/90 mb-4">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Client: {project.client}</span>
                      <Button 
                        href={`/portfolio/${project.id}`}
                        variant="outline" 
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Button href="/portfolio" size="lg" className="px-8 py-4 text-lg">
          View All Projects
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </Section>
  );
};

export default PortfolioSection;