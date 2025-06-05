import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Zap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-6 w-6 text-primary-400" />
              <span className="font-display text-xl font-bold text-white">
                NexusConsult
              </span>
            </div>
            <p className="text-dark-300 mb-6 max-w-xs">
              Transforming businesses through innovative software solutions, strategic marketing, and stunning design.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-dark-300 hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-dark-300 hover:text-primary-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-dark-300 hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-dark-300 hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-dark-300 hover:text-primary-400 transition-colors">
                  Software Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-dark-300 hover:text-primary-400 transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-dark-300 hover:text-primary-400 transition-colors">
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-dark-300 hover:text-primary-400 transition-colors">
                  UX/UI Design
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-dark-300 hover:text-primary-400 transition-colors">
                  Brand Strategy
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/portfolio" className="text-dark-300 hover:text-primary-400 transition-colors">
                  Our Portfolio
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-dark-300 hover:text-primary-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-dark-300 hover:text-primary-400 transition-colors">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link to="#" className="text-dark-300 hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-dark-300 hover:text-primary-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-400 mr-3 mt-0.5" />
                <span className="text-dark-300">
                  123 Innovation Drive<br />
                  San Francisco, CA 94103
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary-400 mr-3" />
                <a href="tel:+14155550123" className="text-dark-300 hover:text-primary-400 transition-colors">
                  (415) 555-0123
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary-400 mr-3" />
                <a href="mailto:info@nexusconsult.com" className="text-dark-300 hover:text-primary-400 transition-colors">
                  info@nexusconsult.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-dark-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} NexusConsult. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="#" className="text-dark-400 hover:text-primary-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-dark-400 hover:text-primary-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-dark-400 hover:text-primary-400 text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;