import { ReactNode, useEffect } from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

interface SmoothScrollProps {
  to: string;
  children: ReactNode;
  duration?: number;
  offset?: number;
  className?: string;
  spy?: boolean;
  smooth?: boolean;
  onClick?: () => void;
}

export const scrollToTop = (duration = 500) => {
  scroll.scrollToTop({
    duration,
    smooth: 'easeInOutQuart'
  });
};

export const scrollToSection = (id: string, duration = 500, offset = -100) => {
  scroll.scrollTo(document.getElementById(id)?.offsetTop || 0 + (offset || 0), {
    duration,
    smooth: 'easeInOutQuart'
  });
};

const SmoothScroll = ({
  to,
  children,
  duration = 500,
  offset = -100,
  className = '',
  spy = true,
  smooth = true,
  onClick
}: SmoothScrollProps) => {
  
  // Handle direct # links throughout the site
  useEffect(() => {
    const handleHashLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        
        const id = anchor.hash.substring(1);
        const element = document.getElementById(id);
        
        if (element) {
          scrollToSection(id, duration, offset);
        }
      }
    };
    
    document.addEventListener('click', handleHashLinkClick);
    
    return () => {
      document.removeEventListener('click', handleHashLinkClick);
    };
  }, [duration, offset]);
  
  return (
    <ScrollLink
      to={to}
      spy={spy}
      smooth={smooth}
      offset={offset}
      duration={duration}
      className={`cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </ScrollLink>
  );
};

export default SmoothScroll;