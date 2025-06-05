import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, ChevronDown, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

interface SubmenuItem {
  name: string;
  path: string;
}

interface NavItem {
  name: string;
  path: string;
  hasSubmenu?: boolean;
  submenu?: SubmenuItem[];
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const location = useLocation();

  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    { 
      name: 'Services', 
      path: '/services',
      hasSubmenu: true,
      submenu: [
        { name: 'Software Development', path: '/services#software' },
        { name: 'Digital Marketing', path: '/services#marketing' },
        { name: 'Graphic Design', path: '/services#design' },
        { name: 'Brand Strategy', path: '/services#strategy' },
        { name: 'Data Analytics', path: '/services#analytics' },
      ]
    },
    { 
      name: 'Portfolio', 
      path: '/portfolio',
      hasSubmenu: true,
      submenu: [
        { name: 'Software Projects', path: '/portfolio?category=Software' },
        { name: 'Marketing Campaigns', path: '/portfolio?category=Marketing' },
        { name: 'Design Work', path: '/portfolio?category=Design' },
      ]
    },
    { 
      name: 'Careers', 
      path: '/careers',
      hasSubmenu: true,
      submenu: [
        { name: 'Open Positions', path: '/careers' },
        { name: 'Internships', path: '/careers#internships' },
        { name: 'Benefits', path: '/careers#benefits' },
        { name: 'Culture', path: '/careers#culture' },
      ]
    },
    { 
      name: 'Blog', 
      path: '/blog',
      hasSubmenu: true,
      submenu: [
        { name: 'Technology', path: '/blog?category=Technology' },
        { name: 'Marketing', path: '/blog?category=Marketing' },
        { name: 'Design', path: '/blog?category=Design' },
        { name: 'Industry Insights', path: '/blog?category=Industry' },
      ]
    },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (name: string) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
    setActiveSubmenu(name);
  };

  const handleMouseLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 300);
  };

  const handleSubmenuMouseEnter = () => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
  };

  const handleSubmenuMouseLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 300);
  };

  const toggleMobileSubmenu = (name: string) => {
    if (activeSubmenu === name) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(name);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-soft py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 relative z-10">
            <Zap className={`h-8 w-8 ${isScrolled || isMobileMenuOpen ? 'text-primary-500' : 'text-white'}`} />
            <span className={`font-display text-xl font-bold ${isScrolled || isMobileMenuOpen ? 'text-dark-800' : 'text-white'}`}>
              NexusConsult
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => item.hasSubmenu ? handleMouseEnter(item.name) : undefined}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                    location.pathname === item.path
                      ? isScrolled ? 'text-primary-600' : 'text-white'
                      : isScrolled 
                        ? 'text-dark-600 hover:text-primary-500 hover:bg-primary-50' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.name}
                  {item.hasSubmenu && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>

                {/* Dropdown menu */}
                {item.hasSubmenu && activeSubmenu === item.name && (
                  <div
                    className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                    onMouseEnter={handleSubmenuMouseEnter}
                    onMouseLeave={handleSubmenuMouseLeave}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="py-1 rounded-md bg-white"
                    >
                      {item.submenu?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-dark-700 hover:bg-primary-50 hover:text-primary-600"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            ))}
            <div className="ml-4">
              <Button href="/login" variant={isScrolled ? "outline" : "primary"} size="sm">
                Client Login
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-dark-800 hover:text-primary-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white z-50"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasSubmenu ? (
                    <>
                      <button
                        onClick={() => toggleMobileSubmenu(item.name)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                          location.pathname === item.path
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-dark-600 hover:text-primary-500 hover:bg-primary-50'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`h-5 w-5 transition-transform ${activeSubmenu === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeSubmenu === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4"
                          >
                            {item.submenu?.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className="flex items-center px-4 py-2 text-sm text-dark-600 hover:text-primary-500"
                              >
                                <ChevronRight className="h-4 w-4 mr-2" />
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 block ${
                        location.pathname === item.path
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-dark-600 hover:text-primary-500 hover:bg-primary-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-2">
                <Button href="/login" variant="outline" fullWidth>
                  Client Login
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;