import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { Link as ScrollLink } from 'react-scroll';

// Array of dynamic headlines for the animation
const headlines = [
  "Transform Your Business with Expert Consulting",
  "Elevate Your Brand with Strategic Solutions",
  "Accelerate Growth with Innovative Technology",
  "Unlock Your Business Potential Today"
];

const HeroSection = () => {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative min-h-screen flex items-center pt-16 pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-primary-900 to-dark-900 z-0"></div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute h-full w-full">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                height: Math.random() * 300 + 50,
                width: Math.random() * 300 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0.1 }}
              animate={{
                opacity: [0.1, 0.15, 0.1],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[180px] md:h-[210px]"
            >
              {headlines.map((headline, index) => (
                <motion.h1
                  key={index}
                  className="absolute text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ 
                    opacity: currentHeadline === index ? 1 : 0,
                    y: currentHeadline === index ? 0 : 40
                  }}
                  transition={{
                    opacity: { duration: 0.7 },
                    y: { duration: 0.5 }
                  }}
                >
                  {headline}
                </motion.h1>
              ))}
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-dark-100 mb-8 max-w-2xl"
            >
              We combine cutting-edge technology, creative marketing strategies, and stunning design to elevate your brand and drive growth.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button href="/services" size="lg">
                Explore Our Services
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <span>Get in Touch</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Abstract animated graphic representation */}
              <div className="aspect-square max-w-md mx-auto relative">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-primary-400 to-accent-400 rounded-full opacity-40 blur-2xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                />
                <motion.div 
                  className="absolute inset-10 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl"
                  animate={{ 
                    borderColor: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.2)']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-8">
                    {['Software', 'Marketing', 'Design', 'Strategy'].map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: 'rgba(255,255,255,0.3)'
                        }}
                      >
                        <span className="text-white font-medium">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
      >
        <span className="text-sm mb-2">Scroll to explore</span>
        <ScrollLink to="services-section" smooth={true} offset={-100} duration={800}>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center cursor-pointer">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            ></motion.div>
          </div>
        </ScrollLink>
      </motion.div>
    </div>
  );
};

export default HeroSection;