import { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import PortfolioSection from '../components/home/PortfolioSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CtaSection from '../components/home/CtaSection';

const Home = () => {
  useEffect(() => {
    // Set page title
    document.title = 'NexusConsult | Software, Marketing & Design Consulting';
  }, []);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
};

export default Home;