
import React, { useState } from 'react';

const CathedralGallery = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const galleryImages = [
    {
      title: "Façade Illuminée",
      description: "La façade gothique sous les projecteurs dorés de la Fête des Lumières"
    },
    {
      title: "Rosace Mystique",
      description: "Les vitraux révèlent leurs secrets sous la lumière nocturne"
    },
    {
      title: "Tours Majestueuses",
      description: "Les tours de la cathédrale se dressent vers le ciel étoilé"
    },
    {
      title: "Reflets sur Saône",
      description: "La cathédrale se mire dans les eaux calmes de la Saône"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Galerie
            <span className="text-amber-300 ml-3">Lumineuse</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Une collection d'instantanés capturant la beauté éternelle 
            de la Cathédrale Saint-Jean sous toutes ses lumières
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Zone d'affichage principale */}
          <div className="relative">
            <div className="aspect-square bg-slate-700 rounded-2xl overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="text-4xl">🏰</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{galleryImages[selectedImage].title}</h3>
                  <p className="text-slate-300 max-w-sm mx-auto">{galleryImages[selectedImage].description}</p>
                </div>
              </div>
            </div>

            {/* Effet de halo */}
            <div className="absolute -inset-8 bg-gradient-radial from-amber-300/20 to-transparent rounded-full animate-pulse -z-10"></div>
          </div>

          {/* Miniatures */}
          <div className="space-y-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                  selectedImage === index
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-2xl'
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                    selectedImage === index 
                      ? 'bg-white/20' 
                      : 'bg-gradient-to-br from-amber-300 to-amber-500'
                  }`}>
                    <span className="text-2xl">🏰</span>
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-lg font-semibold mb-1 ${
                      selectedImage === index ? 'text-white' : 'text-slate-300'
                    }`}>
                      {image.title}
                    </h4>
                    <p className={`text-sm ${
                      selectedImage === index ? 'text-white/80' : 'text-slate-400'
                    }`}>
                      {image.description}
                    </p>
                  </div>
                </div>

                {/* Indicateur actif */}
                {selectedImage === index && (
                  <div className="mt-4 h-1 bg-white/30 rounded-full">
                    <div className="h-full bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CathedralGallery;
