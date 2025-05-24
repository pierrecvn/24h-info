
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

// ...imports identiques...

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
          title: "Théâtres Romains de Fourvière",
          description:
              "Situés sur la colline de Fourvière, ces théâtres témoignent de la grandeur de Lugdunum. Le Grand Théâtre, construit au Ier siècle av. J.-C., pouvait accueillir jusqu'à 10 000 spectateurs. Encore utilisés aujourd’hui pour les Nuits de Fourvière, ils illustrent la continuité culturelle de la ville à travers les siècles."
        },
        {
          title: "Basilique de Fourvière",
          description:
              "Construite entre 1872 et 1896 sur les hauteurs de Lyon, la basilique est un symbole spirituel et architectural. Elle combine des styles byzantin, roman et gothique, et a été édifiée pour remercier la Vierge Marie d’avoir protégé la ville de la peste et des invasions. Elle est visible depuis toute la ville, de jour comme de nuit."
        },
        {
          title: "Quartier de la Croix-Rousse",
          description:
              "Surnommée 'la colline qui travaille', la Croix-Rousse fut au XIXe siècle le cœur de l’industrie de la soie. Les Canuts, ouvriers tisserands, y travaillaient dans de vastes ateliers à hauts plafonds. Aujourd’hui, le quartier conserve un esprit indépendant et artistique, mêlant histoire ouvrière et vie de quartier dynamique."
        }
      ];

  return (
      <div className="min-h-screen bg-slate-900">
        <Navigation />

        {/* Hero Section */}
        <div ref={headerRef} className="relative h-96 bg-gradient-to-br from-slate-800 via-slate-900 to-black overflow-hidden">
          {/* ...style SVG inchangé... */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white max-w-4xl px-6">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                Histoire de Lyon
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Plongez dans plus de deux mille ans d’histoire : des origines romaines de Lugdunum jusqu'à la modernité d’une métropole européenne, Lyon a su conserver les traces vivantes de son passé tout en se tournant vers l’avenir.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        {/* ...même structure, utilise les nouveaux timelineEvents... */}

        {/* Section Architecture */}
        <div className="py-20 bg-slate-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">
                Monuments <span className="text-amber-300">Historiques</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Lyon regorge de trésors architecturaux témoignant de son passé antique, médiéval et industriel.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Théâtres Romains de Fourvière",
                  description: "Haut lieu de spectacles antiques, ces théâtres sont parmi les plus anciens de la Gaule romaine."
                },
                {
                  title: "Basilique de Fourvière",
                  description: "Érigée au XIXe siècle, elle domine la ville et symbolise la foi lyonnaise à travers son style éclectique."
                },
                {
                  title: "Quartier de la Croix-Rousse",
                  description: "Ancien fief des Canuts, il incarne l'histoire ouvrière et industrielle de Lyon liée à la soie."
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

        {/* Section Personnalités */}
        <div className="py-20 bg-slate-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">
                Figures <span className="text-amber-300">Lyonnaises</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                De l’Antiquité à l’époque contemporaine, de nombreux hommes et femmes ont marqué l’histoire de Lyon et rayonné bien au-delà de ses frontières.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Antoine de Saint-Exupéry",
                  description:
                      "Né à Lyon en 1900, cet aviateur et écrivain est l’auteur du célèbre Petit Prince. Il allie poésie, humanisme et aventure, et reste une figure emblématique de la littérature française."
                },
                {
                  title: "André-Marie Ampère",
                  description:
                      "Physicien et mathématicien né à Lyon en 1775, Ampère est l’un des fondateurs de l’électrodynamique. L’unité de mesure du courant électrique, l’ampère, porte son nom."
                },
                {
                  title: "Les Frères Lumière",
                  description:
                      "Auguste et Louis Lumière, inventeurs lyonnais, ont réalisé en 1895 la première projection publique de cinéma. Leur invention, le cinématographe, a donné naissance à l'industrie cinématographique mondiale."
                }
              ].map((person, index) => (
                  <div
                      key={index}
                      className="bg-slate-800 p-8 rounded-xl border border-amber-300/20 hover:border-amber-300/40 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <h3 className="text-2xl font-bold text-amber-300 mb-4">{person.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{person.description}</p>
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
