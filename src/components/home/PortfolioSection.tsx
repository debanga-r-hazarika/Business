import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

const projects: Project[] = [
  {
    id: "p1",
    title: "TechFinance Dashboard",
    category: "Software",
    image: "https://images.pexels.com/photos/7889441/pexels-photo-7889441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "An intuitive financial analytics platform with real-time data visualization."
  },
  {
    id: "p2",
    title: "GreenLife Brand Identity",
    category: "Design",
    image: "https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Complete brand overhaul for an eco-friendly lifestyle company."
  },
  {
    id: "p3",
    title: "Urban Eats Campaign",
    category: "Marketing",
    image: "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Digital marketing campaign increasing online orders by 150%."
  },
  {
    id: "p4",
    title: "HealthTrack App",
    category: "Software",
    image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Mobile application for health monitoring with personalized insights."
  },
];

const categories = ["All", "Software", "Marketing", "Design"];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <Section bg="light">
      <SectionTitle
        title="Our Portfolio"
        subtitle="Explore our showcase of successful projects across various industries."
        centered
      />

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-primary-500 text-white'
                : 'bg-white text-dark-600 hover:bg-dark-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-lg shadow-medium bg-white">
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 w-full">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-primary-300 mb-2">{project.category}</p>
                      <h3 className="text-xl font-display font-semibold text-white mb-2">{project.title}</h3>
                      <p className="text-dark-200 mb-4">{project.description}</p>
                    </div>
                    <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full">
                      <ExternalLink className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-16">
        <Button href="/portfolio" variant="outline" size="lg">
          View All Projects
        </Button>
      </div>
    </Section>
  );
};

export default PortfolioSection;