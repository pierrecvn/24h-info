
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
          , side: 'left', year: '1872'
        },
        {
          title: "Basilique de Fourvière",
          description:
              "Construite entre 1872 et 1896 sur les hauteurs de Lyon, la basilique est un symbole spirituel et architectural. Elle combine des styles byzantin, roman et gothique, et a été édifiée pour remercier la Vierge Marie d’avoir protégé la ville de la peste et des invasions. Elle est visible depuis toute la ville, de jour comme de nuit."
          , side: 'right', year: '1896'
        },
        {
          title: "Quartier de la Croix-Rousse",
          description:
              "Surnommée 'la colline qui travaille', la Croix-Rousse fut au XIXe siècle le cœur de l’industrie de la soie. Les Canuts, ouvriers tisserands, y travaillaient dans de vastes ateliers à hauts plafonds. Aujourd’hui, le quartier conserve un esprit indépendant et artistique, mêlant histoire ouvrière et vie de quartier dynamique."
          , side: 'left', year: '1896'
        }
      ];
  const timelineEvents2 = [
    {
      title: "Fondation de Lugdunum",
      description:
          "Lugdunum est fondée en 43 av. J.-C. par Lucius Munatius Plancus sur la colline de Fourvière. Grâce à sa position stratégique au confluent du Rhône et de la Saône, la ville devient la capitale des Gaules et un important carrefour commercial et administratif.",
      side: "left",
      year: "43 av. J.-C."
    },
    {
      title: "Développement du réseau romain",
      description:
          "Sous l’Empire romain, Lyon voit la construction d’un réseau complexe d’aqueducs, routes pavées et bâtiments publics. Les infrastructures comme les théâtres, les thermes et les forums marquent l’organisation de la cité romaine et sa modernité.",
      side: "right",
      year: "Ier – IIe siècle"
    },
    {
      title: "Moyen Âge et fortifications",
      description:
          "Du Ve au XVe siècle, Lyon se restructure autour de la cathédrale Saint-Jean et des églises. Des remparts sont édifiés pour protéger la cité. Les ruelles étroites du Vieux Lyon témoignent encore de cette époque médiévale dense et défensive.",
      side: "left",
      year: "XIIIe siècle"
    },
    {
      title: "Renaissance lyonnaise",
      description:
          "Au XVIe siècle, Lyon devient un centre économique majeur avec ses foires internationales. De riches marchands y construisent des maisons somptueuses, notamment dans le quartier Saint-Jean. C’est l'âge d’or architectural de la Renaissance à Lyon.",
      side: "right",
      year: "XVIe siècle"
    },
    {
      title: "Urbanisme du XIXe siècle",
      description:
          "Sous le préfet Vaïsse, Lyon se modernise sur le modèle haussmannien : percées de grandes avenues, aménagement des quais, construction d’hôpitaux et d’équipements publics. La ville s'étend vers les pentes de la Croix-Rousse et au-delà de la Presqu'île.",
      side: "left",
      year: "1853"
    },
    {
      title: "Grand Lyon et architecture contemporaine",
      description:
          "Depuis les années 1980, Lyon repense son territoire avec de grands projets urbains comme Part-Dieu, Confluence ou Gerland. La ville valorise son patrimoine tout en intégrant une architecture moderne, durable et innovante.",
      side: "right",
      year: "1980 – aujourd’hui"
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
        <div className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div ref={timelineRef} className="relative">
              {/* Ligne centrale */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500"></div>

              {timelineEvents2.map((event, index) => (
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
                      "Né à Lyon en 1900, cet aviateur et écrivain est l’auteur du célèbre Petit Prince. Il allie poésie, humanisme et aventure, et reste une figure emblématique de la littérature française.",
                  link: "exup.jpg"
                },
                {
                  title: "André-Marie Ampère",
                  description:
                      "Physicien et mathématicien né à Lyon en 1775, Ampère est l’un des fondateurs de l’électrodynamique. L’unité de mesure du courant électrique, l’ampère, porte son nom.",
                  link: "ampere.jpg"
                },
                {
                  title: "Les Frères Lumière",
                  description:
                      "Auguste et Louis Lumière, inventeurs lyonnais, ont réalisé en 1895 la première projection publique de cinéma. Leur invention, le cinématographe, a donné naissance à l'industrie cinématographique mondiale.",
                  link: "frere.jpg"
                },
                {
                  title: "Paul Bocuse",
                  description:
                      "Chef cuisinier emblématique né près de Lyon en 1926, Paul Bocuse a révolutionné la gastronomie française avec la 'nouvelle cuisine'. Son restaurant triplement étoilé et son influence mondiale font de lui une figure centrale de l'identité culinaire lyonnaise.",
                  link: "paul.jpg"
                },
                {
                  title: "Édouard Herriot",
                  description:
                      "Homme politique influent et maire de Lyon pendant plus de 50 ans au total (entre 1905 et 1957), Édouard Herriot a profondément transformé la ville avec la création de nombreuses infrastructures, dont l’Hôpital Édouard-Herriot. Il fut aussi président du Conseil et membre de l'Académie française.",
                  link: "herriot.jpg"
                },
                {
                  title: "Tony Garnier",
                  description:
                      "Architecte visionnaire du début du XXe siècle, Tony Garnier a imaginé la 'Cité industrielle' et conçu plusieurs bâtiments emblématiques de Lyon, comme le quartier des États-Unis, les abattoirs devenus la Halle Tony Garnier, et l’hôpital Grange-Blanche. Il incarne l'urbanisme moderne à Lyon.",
                  link: "garnier.jpeg"
                }
              ].map((person, index) => (
                  <div
                      key={index}
                      className="bg-slate-800 p-8 rounded-xl border border-amber-300/20 hover:border-amber-300/40 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <h3 className="text-2xl font-bold text-amber-300 mb-4">{person.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{person.description}</p>
                    <img src={person.link} alt="" className="w-full h-64 object-cover rounded-xl" />
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
