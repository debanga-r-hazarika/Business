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
      <div className="absolute inset-0 z-10 pointer-events-none">
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

      <div className="container mx-auto px-4 md:px-6 relative z-20 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Professional Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-center lg:text-left"
          >
            <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20">
              Professional Consulting Services
            </span>
          </motion.div>

          {/* Animated Headlines Container */}
          <div className="relative mb-8 overflow-hidden">
            {/* Fixed height container with responsive sizing */}
            <div className="relative h-[160px] sm:h-[180px] md:h-[200px] lg:h-[240px] xl:h-[280px] flex items-center">
              {headlines.map((headline, index) => (
                <motion.h1
                  key={index}
                  className="absolute inset-0 flex items-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-white leading-[1.1] sm:leading-[1.1] md:leading-[1.1] lg:leading-[1.1] xl:leading-[1.1] px-2 text-center lg:text-left"
                  style={{
                    zIndex: currentHeadline === index ? 30 : 20,
                  }}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ 
                    opacity: currentHeadline === index ? 1 : 0,
                    y: currentHeadline === index ? 0 : 60
                  }}
                  transition={{
                    opacity: { duration: 0.8, ease: "easeOut" },
                    y: { duration: 0.6, ease: "easeOut" }
                  }}
                >
                  <span className="block max-w-full break-words">
                    {headline}
                  </span>
                </motion.h1>
              ))}
            </div>
            
            {/* Ensure minimum spacing after headlines */}
            <div className="h-8 sm:h-12 md:h-16 lg:h-20"></div>
          </div>

          {/* Description Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 sm:mb-16 text-center lg:text-left"
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl text-white/90 max-w-4xl mx-auto lg:mx-0 leading-relaxed px-2">
              We deliver cutting-edge software solutions, strategic marketing, and exceptional design to transform your business.
            </p>
          </motion.div>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start px-2"
          >
            <Button 
              href="/contact" 
              size="lg" 
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              href="/portfolio" 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
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