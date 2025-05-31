
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/inventory', label: 'Inventory' },
    { path: '/finance', label: 'Finance' },
    { path: '/order', label: 'Order Car' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
            <img 
              src="/lovable-uploads/8067f871-0db1-49cc-bf9c-df637cec2b83.png" 
              alt="Andros An. Cars" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-all duration-300 relative group ${
                  isActive(link.path)
                    ? 'text-red-600'
                    : 'text-white hover:text-red-600'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full ${isActive(link.path) ? 'w-full' : ''}`}></span>
              </Link>
            ))}
            <a
              href="tel:+35799123456"
              className="btn-primary flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
            >
              <Phone size={18} />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-gray-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-800 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium py-3 px-4 rounded-lg transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-red-600 bg-red-600/10'
                      : 'text-white hover:text-red-600 hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:+35799123456"
                className="btn-primary flex items-center justify-center space-x-2 mt-4 hover:scale-105 transition-transform duration-300"
              >
                <Phone size={18} />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
