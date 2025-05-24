import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Galerie = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    // Animation d'entrée
    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    // Animation de la galerie
    const galleryItems = galleryRef.current?.children;
    if (galleryItems) {
      gsap.fromTo(galleryItems, {
        opacity: 0,
        scale: 0.8,
        y: 50
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5
      });
    }
  }, []);

  const galleryImages = [
    {
      title: "Cathédrale de Jour",
      description: "La majestueuse façade gothique sous le soleil lyonnais",
      category: "Architecture",
      imageUrl: "/cathedrale.png"
    },
    {
      title: "Fête des Lumières 2023",
      description: "Projection spectaculaire sur la façade occidentale",
      category: "Événement",
      imageUrl: "/fete_lumiere.jpg"
    },
    {
      title: "Rosace Centrale",
      description: "Détail de la rosace médiévale et ses vitraux colorés",
      category: "Détail",
      imageUrl: "/rosase.jpg"
    },
    {
      title: "Illumination Dorée",
      description: "Éclairage nocturne mettant en valeur l'architecture",
      category: "Nuit",
      imageUrl: "/illumination_doree.jpg"
    },
    {
      title: "Intérieur Sacré",
      description: "La nef gothique baignée de lumière divine",
      category: "Intérieur",
      imageUrl: "/interieur.jpg"
    },
    {
      title: "Mapping Numérique",
      description: "Art contemporain projeté sur les pierres millénaires",
      category: "Événement",
      imageUrl: "/lumiere.jpg"
    }
  ];

  const categories = ["Tous", "Architecture", "Événement", "Détail", "Nuit", "Intérieur"];
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredImages = activeCategory === "Tous" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <div ref={headerRef} className="relative h-96 bg-gradient-to-br from-slate-800 via-slate-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23fbbf24' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl px-6">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
              Galerie
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Explorez la beauté de la Cathédrale Saint-Jean à travers une collection 
              d'images captivantes, du jour à la nuit
            </p>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="py-12 border-b border-slate-700">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-amber-400 text-slate-900 shadow-lg'
                    : 'bg-slate-800 text-white hover:bg-slate-700 border border-amber-300/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Galerie */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div ref={galleryRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="group relative bg-slate-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-amber-300/20 transition-all duration-500 cursor-pointer transform hover:scale-105"
                onClick={() => setSelectedImage(index)}
              >
                {/* Image avec overlay */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Overlay avec informations */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-4 border border-amber-300/20">
                      <span className="text-xs text-amber-300 font-medium">{image.category}</span>
                      <h3 className="text-lg font-bold mb-2">{image.title}</h3>
                      <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal d'image */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl w-full bg-slate-800 rounded-xl overflow-hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-slate-900/80 hover:bg-slate-900 rounded-full flex items-center justify-center text-white z-10 transition-colors duration-200"
            >
              ✕
            </button>
            
            <div className="aspect-[16/10] relative">
              <img
                src={filteredImages[selectedImage].imageUrl}
                alt={filteredImages[selectedImage].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-bold text-white mb-2">{filteredImages[selectedImage].title}</h3>
                <p className="text-slate-300">{filteredImages[selectedImage].description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Galerie;
