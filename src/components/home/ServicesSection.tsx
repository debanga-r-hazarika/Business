import { Code, BarChart3, Paintbrush, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';

interface ServiceCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  image: string;
  delay: number;
}

const ServiceCard = ({ icon, title, description, image, delay }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-medium transition-all duration-500 group-hover:-translate-y-2">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="p-8">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-primary-50 rounded-xl mr-4 group-hover:bg-primary-100 transition-colors">
              {icon}
            </div>
            <h3 className="text-xl font-display font-semibold text-dark-800">{title}</h3>
          </div>
          
          <p className="text-dark-600 mb-6 leading-relaxed">{description}</p>
          
          <Button 
            href="/services" 
            variant="ghost" 
            className="group-hover:text-primary-600 transition-colors p-0"
          >
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: <Code className="h-6 w-6 text-primary-600" />,
      title: "Software Development",
      description: "Custom software solutions built with cutting-edge technologies to solve your business challenges and drive growth.",
      image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
      delay: 0,
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary-600" />,
      title: "Digital Marketing",
      description: "Data-driven marketing strategies that increase your online presence, engage customers, and deliver measurable results.",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
      delay: 0.2,
    },
    {
      icon: <Paintbrush className="h-6 w-6 text-primary-600" />,
      title: "Design Services",
      description: "Creative visual solutions and user experiences that communicate your brand message effectively and drive engagement.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
      delay: 0.4,
    },
  ];

  return (
    <Section bg="white" id="services-section" spacing="large">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-primary-50 text-primary-600 text-sm font-medium rounded-full mb-4">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-800 mb-6">
            Comprehensive Solutions
          </h2>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto leading-relaxed">
            We combine technology, creativity, and strategy to deliver exceptional results that drive your business forward.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            icon={service.icon}
            title={service.title}
            description={service.description}
            image={service.image}
            delay={service.delay}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Button href="/services" size="lg" className="px-8 py-4 text-lg">
          Explore All Services
        </Button>
      </motion.div>
    </Section>
  );
};

export default ServicesSection;