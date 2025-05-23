
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo et description */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-amber-300">Lyon Lumières</h3>
            <p className="text-slate-300 leading-relaxed">
              Une expérience immersive célébrant le patrimoine lumineux 
              de Lyon et la majesté de la Cathédrale Saint-Jean.
            </p>
            <div className="flex space-x-4">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-400 transition-colors duration-300 cursor-pointer transform hover:scale-110"
                >
                  <span className="text-slate-900 font-bold">L</span>
                </div>
              ))}
            </div>
          </div>

          {/* Liens rapides */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Explorer</h4>
            <ul className="space-y-3">
              {['Accueil', 'Histoire', 'Galerie', 'Fête des Lumières', 'Contact'].map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-slate-300 hover:text-amber-300 transition-colors duration-300 relative group"
                  >
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Lyon</h4>
            <div className="space-y-4 text-slate-300">
              <p>Cathédrale Saint-Jean-Baptiste</p>
              <p>Place Saint-Jean, 69005 Lyon</p>
              <p>Patrimoine UNESCO</p>
            </div>
            
            {/* Effet lumineux décoratif */}
            <div className="relative">
              <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-300 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300/20 to-orange-500/20 blur-sm rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation avec effet lumineux */}
        <div className="my-12 relative">
          <div className="h-px bg-slate-700"></div>
          <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-50"></div>
        </div>

        {/* Copyright */}
        <div className="text-center text-slate-400">
          <p>&copy; 2024 Lyon Lumières. Une création immersive célébrant le patrimoine lyonnais.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
