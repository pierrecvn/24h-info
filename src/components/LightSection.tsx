
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const LightSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeLight, setActiveLight] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLight(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLightHover = (index: number) => {
    setActiveLight(index);
  };

  const lightEffects = [
    { name: "Projection Architecturale", color: "from-blue-400 to-purple-600" },
    { name: "Halos Dorés", color: "from-amber-300 to-orange-500" },
    { name: "Faisceaux Célestes", color: "from-white to-blue-300" },
    { name: "Aurores Lyonnaises", color: "from-green-400 to-teal-500" }
  ];

  return (
    <div ref={sectionRef} className="relative min-h-screen bg-slate-900 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Symphonie de
            <span className="text-amber-300 ml-3">Lumières</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Découvrez les différents effets lumineux qui transforment 
            la Cathédrale Saint-Jean en œuvre d'art vivante
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {lightEffects.map((effect, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                activeLight === index 
                  ? 'bg-gradient-to-br ' + effect.color + ' shadow-2xl' 
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
              onMouseEnter={() => handleLightHover(index)}
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${
                  activeLight === index 
                    ? 'bg-white/20 shadow-lg' 
                    : 'bg-gradient-to-br ' + effect.color
                }`}>
                  <div className="w-full h-full rounded-full bg-gradient-radial from-white/40 to-transparent animate-pulse"></div>
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  activeLight === index ? 'text-white' : 'text-slate-300'
                }`}>
                  {effect.name}
                </h3>
                <div className="w-12 h-0.5 bg-current mx-auto opacity-50"></div>
              </div>

              {/* Effet de halo */}
              {activeLight === index && (
                <div className="absolute -inset-4 bg-gradient-radial from-current/20 to-transparent rounded-xl -z-10 animate-pulse"></div>
              )}
            </div>
          ))}
        </div>

        {/* Simulation interactive de la cathédrale */}
        <div className="relative bg-slate-800 rounded-2xl p-8 overflow-hidden">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Cathédrale Interactive</h3>
            <p className="text-slate-300">Survolez les zones pour découvrir les effets lumineux</p>
          </div>

          <div className="relative max-w-md mx-auto">
            {/* Silhouette de la cathédrale */}
            <div className="cathedral-interactive relative">
              <svg viewBox="0 0 300 400" className="w-full h-80">
                {/* Corps principal */}
                <rect 
                  x="100" y="200" width="100" height="200" 
                  fill="currentColor" 
                  className={`text-slate-600 transition-all duration-500 hover:text-amber-300 cursor-pointer ${
                    activeLight === 0 ? 'text-blue-400 drop-shadow-lg' : ''
                  }`}
                  onMouseEnter={() => handleLightHover(0)}
                />
                
                {/* Tours */}
                <rect 
                  x="80" y="150" width="30" height="80" 
                  fill="currentColor" 
                  className={`text-slate-600 transition-all duration-500 hover:text-amber-300 cursor-pointer ${
                    activeLight === 1 ? 'text-amber-400 drop-shadow-lg' : ''
                  }`}
                  onMouseEnter={() => handleLightHover(1)}
                />
                <rect 
                  x="190" y="150" width="30" height="80" 
                  fill="currentColor" 
                  className={`text-slate-600 transition-all duration-500 hover:text-amber-300 cursor-pointer ${
                    activeLight === 1 ? 'text-amber-400 drop-shadow-lg' : ''
                  }`}
                  onMouseEnter={() => handleLightHover(1)}
                />
                
                {/* Rosace */}
                <circle 
                  cx="150" cy="250" r="20" 
                  fill="currentColor" 
                  className={`text-slate-600 transition-all duration-500 hover:text-white cursor-pointer ${
                    activeLight === 2 ? 'text-white drop-shadow-lg' : ''
                  }`}
                  onMouseEnter={() => handleLightHover(2)}
                />
                
                {/* Flèche */}
                <polygon 
                  points="150,100 130,150 170,150" 
                  fill="currentColor" 
                  className={`text-slate-600 transition-all duration-500 hover:text-teal-400 cursor-pointer ${
                    activeLight === 3 ? 'text-teal-400 drop-shadow-lg' : ''
                  }`}
                  onMouseEnter={() => handleLightHover(3)}
                />
              </svg>
            </div>

            {/* Effet lumineux actif */}
            <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
              activeLight !== null ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className={`absolute inset-0 bg-gradient-radial ${
                lightEffects[activeLight]?.color || 'from-transparent to-transparent'
              } opacity-20 animate-pulse rounded-full`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightSection;
