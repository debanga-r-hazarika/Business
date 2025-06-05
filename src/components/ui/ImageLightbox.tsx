import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Image {
  src: string;
  alt: string;
}

interface ImageLightboxProps {
  images: Image[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

const ImageLightbox = ({ images, initialIndex = 0, isOpen, onClose }: ImageLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  useEffect(() => {
    // When the lightbox opens, set the initial index
    if (isOpen) {
      setCurrentIndex(initialIndex);
      
      // Disable body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scroll when closed
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, initialIndex]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          prev();
          break;
        case 'ArrowRight':
          next();
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose]);
  
  const prev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  const next = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 z-10 p-2 bg-dark-800/80 text-white rounded-full hover:bg-dark-700/80 transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={24} />
          </button>
          
          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button 
                className="absolute left-4 z-10 p-2 bg-dark-800/80 text-white rounded-full hover:bg-dark-700/80 transition-colors"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                className="absolute right-4 z-10 p-2 bg-dark-800/80 text-white rounded-full hover:bg-dark-700/80 transition-colors"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
          
          {/* Image container */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ type: 'spring', damping: 15 }}
            className="relative max-w-4xl max-h-[85vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Current image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center items-center"
              >
                <img
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-hard"
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-dark-800/80 text-white text-sm px-3 py-1 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;