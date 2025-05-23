
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Histoire = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation d'entrée
    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    // Animation de la timeline au scroll
    const timelineItems = timelineRef.current?.children;
    if (timelineItems) {
      Array.from(timelineItems).forEach((item, index) => {
        gsap.fromTo(item, {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          scale: 0.8
        }, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const timelineEvents = [
    {
      year: "IIe siècle",
      title: "Fondation de Lugdunum",
      description: "Les Romains établissent Lugdunum, qui devient rapidement la capitale des Gaules.",
      side: "left"
    },
    {
      year: "1165",
      title: "Construction de la Cathédrale",
      description: "Début de la construction de la Cathédrale Saint-Jean-Baptiste, joyau de l'art gothique.",
      side: "right"
    },
    {
      year: "1998",
      title: "Patrimoine UNESCO",
      description: "Le Vieux Lyon et la Cathédrale sont inscrits au Patrimoine mondial de l'UNESCO.",
      side: "left"
    },
    {
      year: "1999",
      title: "Première Fête des Lumières",
      description: "Naissance de la Fête des Lumières moderne, transformant Lyon en capitale mondiale de la lumière.",
      side: "right"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <div ref={headerRef} className="relative h-96 bg-gradient-to-br from-slate-800 via-slate-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' fillOpacity='0.05'%3E%3Cpath d='M20 20c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10zm10 0c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl px-6">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
              Histoire
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Découvrez l'histoire millénaire de Lyon et de sa cathédrale, 
              témoin privilégié de l'évolution de la Capitale des Gaules
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div ref={timelineRef} className="relative">
            {/* Ligne centrale */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500"></div>
            
            {timelineEvents.map((event, index) => (
              <div key={index} className={`flex items-center mb-16 ${event.side === 'right' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-5/12 ${event.side === 'right' ? 'text-right pl-8' : 'text-left pr-8'}`}>
                  <div className="bg-slate-800 p-8 rounded-xl shadow-2xl border border-amber-300/20 hover:border-amber-300/40 transition-all duration-300 hover:shadow-amber-300/20">
                    <div className="text-amber-300 text-lg font-semibold mb-2">{event.year}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{event.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{event.description}</p>
                  </div>
                </div>
                
                {/* Point central */}
                <div className="w-2/12 flex justify-center">
                  <div className="w-6 h-6 bg-amber-400 rounded-full border-4 border-slate-900 shadow-lg relative">
                    <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>
                
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Architecture */}
      <div className="py-20 bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Architecture <span className="text-amber-300">Gothique</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              La Cathédrale Saint-Jean-Baptiste, chef-d'œuvre de l'art gothique français, 
              marie harmonieusement les styles roman et gothique
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Façade Occidentale",
                description: "Trois portails sculptés racontent l'histoire sainte avec une finesse remarquable"
              },
              {
                title: "Rosace Centrale",
                description: "Chef-d'œuvre de la verrerie médiévale, elle illumine la nef de mille feux colorés"
              },
              {
                title: "Trésor de la Cathédrale",
                description: "Collection exceptionnelle d'objets liturgiques et de manuscrits précieux"
              }
            ].map((item, index) => (
              <div key={index} className="bg-slate-700 p-8 rounded-xl border border-amber-300/20 hover:border-amber-300/40 transition-all duration-300 hover:transform hover:scale-105">
                <h3 className="text-2xl font-bold text-amber-300 mb-4">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Histoire;
