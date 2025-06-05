import { Code, BarChart3, Paintbrush } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ServiceCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard = ({ icon, title, description, delay }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card hoverEffect className="h-full flex flex-col">
        <div className="p-4 bg-primary-50 rounded-full inline-block mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-display font-semibold text-dark-800 mb-3">{title}</h3>
        <p className="text-dark-600 mb-6 flex-grow">{description}</p>
        <Button href="/services" variant="ghost" className="mt-auto self-start">
          Learn More
        </Button>
      </Card>
    </motion.div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: <Code className="h-6 w-6 text-primary-600" />,
      title: "Software Development",
      description: "Custom software solutions built with cutting-edge technologies to solve your business challenges and drive growth.",
      delay: 0,
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary-600" />,
      title: "Digital Marketing",
      description: "Data-driven marketing strategies that increase your online presence, engage customers, and deliver measurable results.",
      delay: 0.1,
    },
    {
      icon: <Paintbrush className="h-6 w-6 text-primary-600" />,
      title: "Graphic Design",
      description: "Creative visual solutions that communicate your brand message effectively and leave a lasting impression.",
      delay: 0.2,
    },
  ];

  return (
    <Section bg="white">
      <SectionTitle
        title="Expert Services"
        subtitle="We offer comprehensive consulting services to elevate your business through technology, marketing, and design."
        centered
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            icon={service.icon}
            title={service.title}
            description={service.description}
            delay={service.delay}
          />
        ))}
      </div>

      <div className="text-center mt-16">
        <Button href="/services" size="lg">View All Services</Button>
      </div>
    </Section>
  );
};

export default ServicesSection;