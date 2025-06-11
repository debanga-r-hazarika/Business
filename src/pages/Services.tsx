import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, BarChart3, Paintbrush, Search, Users, FileText, LineChart, PenTool, MessageCircle, ChevronDown, CheckCircle, Monitor, Database } from 'lucide-react';
import Section from '../components/ui/Section';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SmoothScroll from '../components/ui/SmoothScroll';

interface ServiceCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  delay: number;
}

interface ProcessStep {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface AccordionItem {
  question: string;
  answer: string;
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
        <Button variant="ghost" className="mt-auto self-start">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Card>
    </motion.div>
  );
};

// Software Process Steps
const softwareProcessSteps: ProcessStep[] = [
  {
    icon: <Monitor className="h-6 w-6 text-primary-600" />,
    title: "Discovery & Planning",
    description: "We analyze your business requirements and develop a strategic roadmap for your software solution."
  },
  {
    icon: <PenTool className="h-6 w-6 text-primary-600" />,
    title: "Design & Architecture",
    description: "Our team designs intuitive interfaces and robust system architecture tailored to your needs."
  },
  {
    icon: <Code className="h-6 w-6 text-primary-600" />,
    title: "Development",
    description: "We build your solution using modern technologies and best practices for optimal performance."
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-primary-600" />,
    title: "Testing & QA",
    description: "Rigorous testing ensures your software is reliable, secure, and meets all requirements."
  },
  {
    icon: <Database className="h-6 w-6 text-primary-600" />,
    title: "Deployment",
    description: "We handle the technical aspects of launching your solution in your preferred environment."
  },
  {
    icon: <Users className="h-6 w-6 text-primary-600" />,
    title: "Support & Maintenance",
    description: "Ongoing support and updates keep your software running smoothly and secure."
  }
];

// Marketing Process Steps
const marketingProcessSteps: ProcessStep[] = [
  {
    icon: <Search className="h-6 w-6 text-primary-600" />,
    title: "Research & Analysis",
    description: "We study your market, audience, and competition to identify opportunities and challenges."
  },
  {
    icon: <FileText className="h-6 w-6 text-primary-600" />,
    title: "Strategy Development",
    description: "We create a comprehensive marketing plan aligned with your business objectives."
  },
  {
    icon: <PenTool className="h-6 w-6 text-primary-600" />,
    title: "Content Creation",
    description: "Our team develops compelling content that resonates with your target audience."
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-primary-600" />,
    title: "Campaign Execution",
    description: "We implement your marketing campaigns across relevant channels for maximum impact."
  },
  {
    icon: <LineChart className="h-6 w-6 text-primary-600" />,
    title: "Performance Tracking",
    description: "Real-time analytics provide insights into campaign performance and ROI."
  },
  {
    icon: <ArrowRight className="h-6 w-6 text-primary-600" />,
    title: "Optimization",
    description: "Continuous improvement based on data to enhance results and maximize returns."
  }
];

// Design Process Steps
const designProcessSteps: ProcessStep[] = [
  {
    icon: <MessageCircle className="h-6 w-6 text-primary-600" />,
    title: "Discovery & Brief",
    description: "We define your design goals, target audience, and brand requirements."
  },
  {
    icon: <Search className="h-6 w-6 text-primary-600" />,
    title: "Research & Inspiration",
    description: "We explore visual directions and gather inspiration that aligns with your brand."
  },
  {
    icon: <PenTool className="h-6 w-6 text-primary-600" />,
    title: "Concept Development",
    description: "Our designers create initial concepts for review and feedback."
  },
  {
    icon: <Paintbrush className="h-6 w-6 text-primary-600" />,
    title: "Design Refinement",
    description: "We refine and perfect your designs based on your feedback and requirements."
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-primary-600" />,
    title: "Finalization",
    description: "Final designs are prepared and optimized for their intended use."
  },
  {
    icon: <FileText className="h-6 w-6 text-primary-600" />,
    title: "Implementation Support",
    description: "We provide guidelines and support for implementing your designs consistently."
  }
];

// FAQs
const faqs: AccordionItem[] = [
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on scope and complexity. A small website might take 4-6 weeks, while a custom software application could take 3-6 months. During our initial consultation, we'll provide you with a detailed timeline based on your specific requirements."
  },
  {
    question: "What is your pricing structure?",
    answer: "We offer flexible pricing options including fixed-price projects, retainer agreements, and hourly rates depending on your needs. Each proposal includes a detailed breakdown of costs and deliverables. We believe in transparent pricing with no hidden fees."
  },
  {
    question: "Do you work with startups and small businesses?",
    answer: "Absolutely! We have experience working with businesses of all sizes, from startups to enterprise organizations. We tailor our approach to meet your specific needs and budget constraints while delivering high-quality solutions."
  },
  {
    question: "Can you support our existing systems and applications?",
    answer: "Yes, we provide support and maintenance for existing systems, even those not originally developed by us. Our team can audit your current solution, suggest improvements, and implement updates to enhance functionality and performance."
  },
  {
    question: "Do you offer ongoing maintenance and support?",
    answer: "Yes, we offer flexible maintenance and support packages to ensure your solution remains secure, up-to-date, and functioning optimally. Our support packages include regular updates, monitoring, troubleshooting, and technical assistance."
  }
];

const services = [
  {
    icon: <Code className="h-6 w-6 text-primary-600" />,
    title: "Custom Software Development",
    description: "Tailored software solutions designed to address your specific business challenges and streamline operations.",
    category: "software",
    delay: 0,
  },
  {
    icon: <LineChart className="h-6 w-6 text-primary-600" />,
    title: "Data Analytics & BI",
    description: "Transform your data into actionable insights with our comprehensive business intelligence solutions.",
    category: "software",
    delay: 0.1,
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-primary-600" />,
    title: "Digital Marketing Strategy",
    description: "Strategic marketing plans that increase your online presence and drive measurable business growth.",
    category: "marketing",
    delay: 0.2,
  },
  {
    icon: <Search className="h-6 w-6 text-primary-600" />,
    title: "SEO Optimization",
    description: "Improve your search engine rankings and increase organic traffic with our proven SEO techniques.",
    category: "marketing",
    delay: 0.3,
  },
  {
    icon: <Paintbrush className="h-6 w-6 text-primary-600" />,
    title: "Graphic Design",
    description: "Eye-catching visual designs that communicate your brand message effectively and memorably.",
    category: "design",
    delay: 0.4,
  },
  {
    icon: <PenTool className="h-6 w-6 text-primary-600" />,
    title: "UI/UX Design",
    description: "User-centered design that creates intuitive, engaging experiences across all digital touchpoints.",
    category: "design",
    delay: 0.5,
  },
  {
    icon: <Users className="h-6 w-6 text-primary-600" />,
    title: "Social Media Management",
    description: "Build and engage your community with strategic content and data-driven social media campaigns.",
    category: "marketing",
    delay: 0.6,
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-primary-600" />,
    title: "Brand Strategy",
    description: "Develop a cohesive brand identity that resonates with your target audience and stands out from competitors.",
    category: "design",
    delay: 0.7,
  },
  {
    icon: <FileText className="h-6 w-6 text-primary-600" />,
    title: "Content Creation",
    description: "Compelling content that tells your story, showcases your expertise, and drives customer engagement.",
    category: "marketing",
    delay: 0.8,
  },
];

const Services = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [activeProcessCategory, setActiveProcessCategory] = useState<string>('software');

  const toggleAccordion = (question: string) => {
    if (activeAccordion === question) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(question);
    }
  };

  useEffect(() => {
    document.title = 'Our Services | NexusConsult';
    
    // Handle hash navigation on load
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
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
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-dark-100 mb-8"
          >
            Comprehensive consulting solutions to help your business thrive in the digital age.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <SmoothScroll to="software" offset={-100}>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Software
              </Button>
            </SmoothScroll>
            <SmoothScroll to="marketing" offset={-100}>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Marketing
              </Button>
            </SmoothScroll>
            <SmoothScroll to="design" offset={-100}>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Design
              </Button>
            </SmoothScroll>
          </motion.div>
        </div>
      </Section>

      {/* All Services */}
      <Section bg="white">
        <SectionTitle
          title="Comprehensive Solutions"
          subtitle="We offer a wide range of services designed to help businesses grow, innovate, and succeed."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
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
      </Section>

      {/* Process Section - Software */}
      <Section bg="light" id="software">
        <div className="mb-12">
          <SectionTitle
            title="Our Process"
            subtitle={
              <div>
                <p className="mb-6">We follow a structured approach to ensure exceptional results for every project.</p>
                <div className="flex flex-wrap justify-center gap-3 mt-8">
                  <button
                    onClick={() => setActiveProcessCategory('software')}
                    className={`px-5 py-2.5 rounded-full font-medium transition-colors ${
                      activeProcessCategory === 'software' 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-white text-dark-600 hover:bg-dark-100'
                    }`}
                  >
                    Software Development
                  </button>
                  <button
                    onClick={() => setActiveProcessCategory('marketing')}
                    className={`px-5 py-2.5 rounded-full font-medium transition-colors ${
                      activeProcessCategory === 'marketing' 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-white text-dark-600 hover:bg-dark-100'
                    }`}
                  >
                    Digital Marketing
                  </button>
                  <button
                    onClick={() => setActiveProcessCategory('design')}
                    className={`px-5 py-2.5 rounded-full font-medium transition-colors ${
                      activeProcessCategory === 'design' 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-white text-dark-600 hover:bg-dark-100'
                    }`}
                  >
                    Design
                  </button>
                </div>
              </div>
            }
            centered
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeProcessCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              {/* Process steps visualization */}
              <div className="hidden lg:block absolute left-1/2 top-24 bottom-0 w-1 bg-primary-100 transform -translate-x-1/2 z-0"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4 relative">
                {(activeProcessCategory === 'software' ? softwareProcessSteps : 
                  activeProcessCategory === 'marketing' ? marketingProcessSteps : 
                  designProcessSteps).map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`${
                      index % 2 === 0 
                        ? 'lg:mr-auto lg:pr-16' 
                        : 'lg:ml-auto lg:pl-16 lg:row-start-auto'
                    } ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}
                  >
                    <div className="relative bg-white p-6 rounded-lg shadow-medium">
                      {/* Connector line and circle for desktop */}
                      <div className="hidden lg:block absolute top-1/2 transform -translate-y-1/2 z-10">
                        {index % 2 === 0 ? (
                          <div className="absolute right-0 translate-x-1/2">
                            <div className="h-1 w-16 bg-primary-100"></div>
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 h-6 w-6 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-bold">
                              {index + 1}
                            </div>
                          </div>
                        ) : (
                          <div className="absolute left-0 -translate-x-1/2">
                            <div className="h-1 w-16 bg-primary-100"></div>
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-bold">
                              {index + 1}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Mobile step indicator */}
                      <div className="lg:hidden flex items-center mb-4">
                        <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                          {index + 1}
                        </div>
                        <h3 className="text-xl font-display font-semibold text-dark-800">{step.title}</h3>
                      </div>
                      
                      {/* Desktop content */}
                      <div className="hidden lg:block">
                        <div className="flex items-center mb-4 justify-end">
                          <div className={`p-3 bg-primary-50 rounded-full ${index % 2 === 0 ? 'order-1 ml-4' : 'order-0 mr-4'}`}>
                            {step.icon}
                          </div>
                          <h3 className={`text-xl font-display font-semibold text-dark-800 ${index % 2 === 0 ? 'order-0' : 'order-1'}`}>
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-dark-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Section>
      
      {/* Marketing Services Section */}
      <Section bg="white" id="marketing">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle
              title="Digital Marketing Services"
              subtitle="Drive growth and engagement with our data-driven marketing solutions."
            />
            <div className="space-y-4 mt-8">
              <div className="flex items-start">
                <div className="p-2 bg-primary-50 rounded-full mr-4 mt-1">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-dark-800 mb-1">SEO & Content Marketing</h4>
                  <p className="text-dark-600">Improve your search visibility and drive organic traffic with optimized content and technical SEO strategies.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 bg-primary-50 rounded-full mr-4 mt-1">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-dark-800 mb-1">Social Media Marketing</h4>
                  <p className="text-dark-600">Build brand awareness and community engagement through strategic social media campaigns and content.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 bg-primary-50 rounded-full mr-4 mt-1">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-dark-800 mb-1">Email Marketing</h4>
                  <p className="text-dark-600">Nurture leads and drive conversions with personalized email campaigns and automation workflows.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 bg-primary-50 rounded-full mr-4 mt-1">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-dark-800 mb-1">PPC & Paid Advertising</h4>
                  <p className="text-dark-600">Maximize ROI with targeted paid advertising campaigns across search, social, and display networks.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button href="/contact">
                Get Marketing Proposal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <div className="rounded-lg overflow-hidden shadow-medium">
              <img 
                src="https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Digital Marketing" 
                className="w-full h-auto"
              />
              <div className="p-6 bg-white">
                <h4 className="text-xl font-display font-semibold text-dark-800 mb-4">Marketing Success Metrics</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-dark-600">Organic Traffic Growth</span>
                      <span className="text-sm font-medium text-primary-600">+155%</span>
                    </div>
                    <div className="w-full bg-dark-100 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-dark-600">Conversion Rate</span>
                      <span className="text-sm font-medium text-primary-600">+82%</span>
                    </div>
                    <div className="w-full bg-dark-100 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-dark-600">Social Media Engagement</span>
                      <span className="text-sm font-medium text-primary-600">+210%</span>
                    </div>
                    <div className="w-full bg-dark-100 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-dark-600">Email Campaign ROI</span>
                      <span className="text-sm font-medium text-primary-600">+120%</span>
                    </div>
                    <div className="w-full bg-dark-100 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Design Services Section */}
      <Section bg="light" id="design">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="col-span-2"
              >
                <img 
                  src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Design Services" 
                  className="w-full h-auto rounded-lg shadow-medium"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Web Design" 
                  className="w-full h-auto rounded-lg shadow-medium"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.pexels.com/photos/327540/pexels-photo-327540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Brand Design" 
                  className="w-full h-auto rounded-lg shadow-medium"
                />
              </motion.div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <SectionTitle
              title="Design Services"
              subtitle="Create stunning visuals and user experiences that elevate your brand and engage your audience."
            />
            
            <div className="mt-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-4 rounded-lg shadow-soft"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-primary-50 rounded-full mr-4">
                    <PenTool className="h-5 w-5 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-medium text-dark-800">Brand Identity</h4>
                </div>
                <p className="mt-2 text-dark-600 pl-12">Logo design, color palettes, typography, and comprehensive brand guidelines that capture your unique identity.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-4 rounded-lg shadow-soft"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-primary-50 rounded-full mr-4">
                    <Monitor className="h-5 w-5 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-medium text-dark-800">UI/UX Design</h4>
                </div>
                <p className="mt-2 text-dark-600 pl-12">User-centered interface design that creates intuitive, engaging experiences across web and mobile platforms.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-4 rounded-lg shadow-soft"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-primary-50 rounded-full mr-4">
                    <Paintbrush className="h-5 w-5 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-medium text-dark-800">Print & Digital Design</h4>
                </div>
                <p className="mt-2 text-dark-600 pl-12">Eye-catching marketing materials, social media graphics, and advertising assets that boost engagement.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white p-4 rounded-lg shadow-soft"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-primary-50 rounded-full mr-4">
                    <FileText className="h-5 w-5 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-medium text-dark-800">Design Systems</h4>
                </div>
                <p className="mt-2 text-dark-600 pl-12">Scalable design systems with reusable components that ensure consistency across all touchpoints.</p>
              </motion.div>
              
              <div className="mt-8">
                <Button href="/portfolio?category=Design">
                  View Design Portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section bg="white">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our services and process."
          centered
        />
        
        <div className="max-w-3xl mx-auto mt-12">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-4"
            >
              <div 
                className="border border-dark-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(faq.question)}
                  className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-dark-50 transition-colors"
                >
                  <span className="font-display font-semibold text-dark-800">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-dark-500 transition-transform ${activeAccordion === faq.question ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeAccordion === faq.question && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 border-t border-dark-100">
                        <p className="text-dark-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section bg="light">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle
            title="Ready to Get Started?"
            subtitle="Contact us today to discuss how we can help your business grow and succeed."
            centered
          />
          <div className="mt-8">
            <Button href="/contact" size="lg">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Services;