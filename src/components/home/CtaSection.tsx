import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Button from '../ui/Button';

const CtaSection = () => {
  const benefits = [
    "Free initial consultation",
    "Custom solutions tailored to your needs",
    "Transparent pricing and timeline",
    "Ongoing support and maintenance"
  ];

  return (
    <Section bg="gradient" spacing="large" className="relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-6">
                Ready to Get Started?
              </span>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                Transform Your Business Today
              </h2>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Let's work together to create innovative solutions that drive growth, enhance efficiency, and position your business for long-term success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  href="/contact" 
                  size="lg" 
                  className="bg-white text-primary-600 hover:bg-white/90 px-8 py-4 text-lg"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  href="/services" 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  Explore Services
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-display font-semibold text-white mb-6">
              Why Choose NexusConsult?
            </h3>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <div className="p-1 bg-white/20 rounded-full mr-4">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-white/90">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-white/80 text-sm">
                Join 500+ satisfied clients who have transformed their businesses with our expertise.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default CtaSection;