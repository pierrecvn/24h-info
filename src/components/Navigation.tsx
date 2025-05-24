import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      isScrolled 
        ? 'bg-slate-900/90 backdrop-blur-lg shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-amber-300 transition-colors duration-300"
            onClick={() => handleNavigation('/')}
          >
            Lyon Lumières
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-white hover:text-amber-300 transition-colors duration-300 relative group"
              onClick={() => handleNavigation('/')}
            >
              Accueil
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/histoire"
              className="text-white hover:text-amber-300 transition-colors duration-300 relative group"
              onClick={() => handleNavigation('/histoire')}
            >
              Histoire
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/galerie"
              className="text-white hover:text-amber-300 transition-colors duration-300 relative group"
              onClick={() => handleNavigation('/galerie')}
            >
              Galerie
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
