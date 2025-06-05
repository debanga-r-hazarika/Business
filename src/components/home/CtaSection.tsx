import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Button from '../ui/Button';

const CtaSection = () => {
  return (
    <Section bg="gradient" spacing="large" className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              height: Math.random() * 300 + 100,
              width: Math.random() * 300 + 100,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6"
        >
          Ready to Transform Your Business?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-xl text-dark-100 mb-10 max-w-2xl mx-auto"
        >
          Let's work together to create innovative solutions tailored to your specific needs.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href="/contact" size="lg">
            <span>Schedule a Consultation</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button href="/services" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
            Explore Services
          </Button>
        </motion.div>
      </div>
    </Section>
  );
};

export default CtaSection;