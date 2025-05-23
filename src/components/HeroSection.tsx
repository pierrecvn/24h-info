
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const cathedralRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Animation d'entrée immédiate
    gsap.set([titleRef.current, cathedralRef.current], { opacity: 0, y: 50 });
    gsap.set(moonRef.current, { x: '200px', opacity: 0, scale: 0.5 });
    gsap.set(starsRef.current, { opacity: 0 });

    // Animation d'entrée
    const enterTl = gsap.timeline();
    enterTl
      .to(titleRef.current, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" })
      .to(cathedralRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.8");

    // Timeline de scroll améliorée
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Transition du ciel plus douce et progressive
    scrollTl
      .to(skyRef.current, {
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 70%, #475569 100%)',
        duration: 1,
        ease: "power2.inOut"
      })
      // Animation des nuages avec rotation
      .to(cloudsRef.current, {
        x: '-60%',
        opacity: 0.4,
        rotation: 5,
        duration: 1
      }, 0)
      // Apparition progressive des étoiles
      .to(starsRef.current, {
        opacity: 1,
        duration: 0.8
      }, 0.2)
      // Apparition de la lune plus dramatique
      .to(moonRef.current, {
        x: '0px',
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)"
      }, 0.3)
      // Effets lumineux sur la cathédrale
      .to(cathedralRef.current, {
        filter: 'drop-shadow(0 0 40px rgba(251, 191, 36, 0.6)) drop-shadow(0 0 80px rgba(251, 191, 36, 0.3))',
        duration: 0.8
      }, 0.5)
      // Animation du titre avec effet de lueur
      .to(titleRef.current, {
        textShadow: '0 0 20px rgba(251, 191, 36, 0.8), 0 0 40px rgba(251, 191, 36, 0.4)',
        duration: 0.6
      }, 0.7);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Ciel animé avec dégradé amélioré */}
      <div 
        ref={skyRef}
        className="absolute inset-0 bg-gradient-to-br from-sky-200 via-sky-300 to-blue-400 transition-all duration-1000"
      />

      {/* Étoiles */}
      <div ref={starsRef} className="absolute inset-0 opacity-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Nuages améliorés */}
      <div ref={cloudsRef} className="absolute inset-0">
        <div className="absolute top-16 left-8 w-40 h-20 bg-white/30 rounded-full blur-md animate-pulse"></div>
        <div className="absolute top-28 right-16 w-48 h-24 bg-white/25 rounded-full blur-md animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-36 left-1/3 w-32 h-16 bg-white/35 rounded-full blur-md animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-48 right-1/3 w-36 h-18 bg-white/20 rounded-full blur-md animate-pulse" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Lune améliorée */}
      <div ref={moonRef} className="absolute top-16 right-16 w-28 h-28 opacity-0">
        <div className="w-full h-full bg-gradient-radial from-amber-100 via-amber-50 to-amber-200 rounded-full shadow-2xl">
          <div className="w-full h-full bg-gradient-radial from-white/40 to-transparent rounded-full"></div>
          <div className="absolute inset-0 bg-gradient-radial from-amber-200/60 to-transparent rounded-full blur-xl"></div>
        </div>
      </div>

      {/* Cathédrale Saint-Jean améliorée */}
      <div ref={cathedralRef} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-0">
        <div className="cathedral-silhouette">
          {/* Façade principale */}
          <div className="w-96 h-[400px] bg-gradient-to-t from-slate-800 via-slate-700 to-slate-600 relative shadow-2xl">
            {/* Portail central gothique */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-32 bg-gradient-to-t from-slate-900 to-slate-800 rounded-t-full border-2 border-amber-300/20"></div>
            
            {/* Tours jumelles */}
            <div className="absolute -top-20 left-12 w-20 h-40 bg-gradient-to-t from-slate-700 to-slate-600 shadow-xl">
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-amber-200/40 rounded-t-full"></div>
            </div>
            <div className="absolute -top-20 right-12 w-20 h-40 bg-gradient-to-t from-slate-700 to-slate-600 shadow-xl">
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-amber-200/40 rounded-t-full"></div>
            </div>
            
            {/* Rosace centrale lumineuse */}
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-16 h-16 border-4 border-amber-300 rounded-full bg-gradient-radial from-amber-100/30 to-amber-300/10 shadow-lg">
              <div className="absolute inset-2 border-2 border-amber-200 rounded-full"></div>
              <div className="absolute inset-4 bg-amber-100/20 rounded-full animate-pulse"></div>
            </div>
            
            {/* Fenêtres gothiques avec lumière */}
            <div className="absolute top-40 left-16 w-6 h-12 bg-gradient-to-t from-amber-200/40 to-amber-100/60 rounded-t-full shadow-inner"></div>
            <div className="absolute top-40 right-16 w-6 h-12 bg-gradient-to-t from-amber-200/40 to-amber-100/60 rounded-t-full shadow-inner"></div>
            <div className="absolute top-56 left-20 w-5 h-10 bg-gradient-to-t from-amber-200/30 to-amber-100/50 rounded-t-full"></div>
            <div className="absolute top-56 right-20 w-5 h-10 bg-gradient-to-t from-amber-200/30 to-amber-100/50 rounded-t-full"></div>
          </div>
        </div>
      </div>

      {/* Titre principal amélioré */}
      <div ref={titleRef} className="absolute inset-0 flex items-center justify-center opacity-0">
        <div className="text-center text-white">
          <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-b from-white via-amber-100 to-amber-200 bg-clip-text text-transparent drop-shadow-2xl">
            Lyon
          </h1>
          <p className="text-3xl md:text-4xl font-light opacity-95 mb-2 text-amber-100">
            et ses Lumières
          </p>
          <div className="mt-8">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto animate-pulse"></div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-2 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>

      {/* Indication de scroll améliorée */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-3 opacity-80 text-amber-100">Découvrez l'histoire</span>
          <div className="w-6 h-12 border-2 border-amber-300 rounded-full flex justify-center bg-white/10 backdrop-blur-sm">
            <div className="w-1 h-4 bg-amber-300 rounded-full mt-2 animate-pulse shadow-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
