
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

const TransitionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lightsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animation du contenu principal
    gsap.fromTo(contentRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animation des particules lumineuses améliorée
    const lights = lightsRef.current?.children;
    if (lights) {
      Array.from(lights).forEach((light, index) => {
        gsap.fromTo(light, {
          opacity: 0,
          scale: 0,
          y: 100,
          rotation: 0
        }, {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 360,
          duration: 3,
          delay: index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Effets de lumière flottants améliorés */}
      <div ref={lightsRef} className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${8 + Math.random() * 16}px`,
              height: `${8 + Math.random() * 16}px`,
              background: `radial-gradient(circle, ${
                ['rgba(251, 191, 36, 0.8)', 'rgba(255, 255, 255, 0.6)', 'rgba(251, 146, 60, 0.7)'][Math.floor(Math.random() * 3)]
              }, transparent)`,
              filter: 'blur(1px)',
              boxShadow: `0 0 ${20 + Math.random() * 20}px rgba(251, 191, 36, 0.4)`
            }}
          />
        ))}
      </div>

      {/* Motif de fond subtil */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23fbbf24' fillOpacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Contenu de la section */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div ref={contentRef} className="text-center text-white max-w-5xl px-6 py-20">
          <h2 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
            La Magie de la
            <span className="block text-amber-300 mt-2">Fête des Lumières</span>
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed opacity-90 mb-16 text-slate-200">
            Chaque année, Lyon se transforme en un théâtre d'art et de lumière,
            où la Cathédrale Saint-Jean devient le témoin privilégié d'un spectacle féerique
            qui illumine l'âme de la ville et touche le cœur de millions de visiteurs.
          </p>

          {/* Boutons d'action améliorés */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/histoire"
              className="group relative bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-amber-400/40"
            >
              <span className="relative z-10">Explorer l'Histoire</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              to="/galerie"
              className="group relative border-2 border-amber-300 text-amber-300 hover:text-slate-900 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">Découvrir la Galerie</span>
              <div className="absolute inset-0 bg-amber-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          </div>

          {/* Statistiques visuelles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {[
              { number: "800+", label: "Ans d'Histoire", icon: "🏛️" },
              { number: "4M", label: "Visiteurs Annuels", icon: "✨" },
              { number: "1998", label: "Patrimoine UNESCO", icon: "🌟" }
            ].map((stat, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-amber-300/20 rounded-xl p-6 hover:border-amber-300/40 transition-all duration-300">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-amber-300 mb-2">{stat.number}</div>
                <div className="text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Effet de halo en bas */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-amber-300/10 to-transparent rounded-full blur-3xl"></div>
    </div>
  );
};

export default TransitionSection;
