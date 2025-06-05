import React from 'react';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface MasonryGridProps {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  breakpointColumns?: {
    default: number;
    [key: number]: number;
  };
  className?: string;
}

const defaultBreakpointColumns = {
  default: 3,
  1280: 3,
  1024: 3,
  768: 2,
  640: 1,
};

const MasonryGrid: React.FC<MasonryGridProps> = ({
  items,
  renderItem,
  breakpointColumns = defaultBreakpointColumns,
  className = '',
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px 200px 0px',
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex w-full -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {items.map((item, index) => renderItem(item, index))}
      </Masonry>
    </motion.div>
  );
};

export { LazyLoadImage };
export default MasonryGrid;