import React, { useState } from 'react';

const CathedralGallery = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const galleryImages = [
    {
      title: "Façade Illuminée",
      description: "La façade gothique sous les projecteurs dorés de la Fête des Lumières",
      imageUrl: "/nuit.jpg"
    },
    {
      title: "Rosace Mystique",
      description: "Les vitraux révèlent leurs secrets sous la lumière nocturne",
      imageUrl: "/rosase_nuit.jpg"
    },
    {
      title: "Tours Majestueuses",
      description: "Les tours de la cathédrale se dressent vers le ciel étoilé",
      imageUrl: "/tours.jpg"
    },
    {
      title: "Vue depuis la Saône",
      description: "La cathédrale s'admire depuis les eaux calmes de la Saône",
      imageUrl: "/saone.jpg"
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
              <div className="w-full h-full relative">
                <img
                  src={galleryImages[selectedImage].imageUrl}
                  alt={galleryImages[selectedImage].title}
                  className="w-full h-full object-cover object-center"
                  style={{
                    imageRendering: 'crisp-edges',
                    maxWidth: '100%',
                    height: '100%'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-3">{galleryImages[selectedImage].title}</h3>
                  <p className="text-slate-300 max-w-sm">{galleryImages[selectedImage].description}</p>
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
                  <div className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${
                    selectedImage === index
                      ? 'ring-2 ring-white'
                      : 'ring-1 ring-amber-300/30'
                  }`}>
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full h-full object-cover object-center"
                      style={{
                        imageRendering: 'crisp-edges'
                      }}
                      loading="lazy"
                    />
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
