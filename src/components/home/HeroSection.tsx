import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { Link as ScrollLink } from 'react-scroll';

// Array of dynamic headlines for the animation
const headlines = [
  "Elevate Your Business",
  "Transform Your Vision", 
  "Accelerate Innovation",
  "Drive Digital Excellence"
];

const HeroSection = () => {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
          alt="Modern office workspace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/70 to-dark-900/50"></div>
      </div>

      {/* Subtle animated elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              height: 200 + i * 100,
              width: 200 + i * 100,
              top: `${20 + i * 30}%`,
              right: `${10 + i * 15}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20">
              Professional Consulting Services
            </span>
          </motion.div>

          <div className="relative h-[120px] md:h-[140px] mb-8">
            {headlines.map((headline, index) => (
              <motion.h1
                key={index}
                className="absolute text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: currentHeadline === index ? 1 : 0,
                  y: currentHeadline === index ? 0 : 50
                }}
                transition={{
                  opacity: { duration: 0.8 },
                  y: { duration: 0.6 }
                }}
              >
                {headline}
              </motion.h1>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl leading-relaxed"
          >
            We deliver cutting-edge software solutions, strategic marketing, and exceptional design to transform your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button href="/contact" size="lg" className="text-lg px-8 py-4">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              href="/portfolio" 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
            >
              View Our Work
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ScrollLink to="services-section" smooth={true} offset={-100} duration={800}>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center cursor-pointer group"
          >
            <span className="text-white/80 text-sm mb-2 group-hover:text-white transition-colors">
              Explore
            </span>
            <ChevronDown className="h-6 w-6 text-white/80 group-hover:text-white transition-colors" />
          </motion.div>
        </ScrollLink>
      </motion.div>
    </div>
  );
};

export default HeroSection;