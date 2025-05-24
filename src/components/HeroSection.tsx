import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLightEffect } from './LightProvider';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const cathedralRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const sunRaysRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const lightBeamsRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);

  // Utiliser notre hook d'effet lumineux spécifiquement pour le titre
  const { ref: titleRef, className: titleLightClass } = useLightEffect(1);

  useEffect(() => {
    if (!heroRef.current) return;

    // Configuration initiale plus dramatique
    gsap.set([titleRef.current, cathedralRef.current], {
      opacity: 0,
      y: 80,
      scale: 0.9,
      rotationX: 15
    });
    gsap.set(moonRef.current, {
      x: '300px',
      y: '-50px',
      opacity: 0,
      scale: 0.3,
      rotation: -45
    });
    gsap.set(starsRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(particlesRef.current, { opacity: 0 });
    gsap.set(lightBeamsRef.current, { opacity: 0, scaleY: 0 });
    gsap.set(fogRef.current, { opacity: 0, x: '-100%' });

    // Animation du soleil plus dynamique
    gsap.set(sunRef.current, { scale: 1, opacity: 1 });

    // Animation de pulsation améliorée pour le soleil
    const sunPulse = gsap.timeline({ repeat: -1 });
    sunPulse
        .to(sunRef.current, {
          scale: 1.08,
          duration: 3,
          ease: "sine.inOut"
        })
        .to(sunRef.current, {
          scale: 0.95,
          duration: 2,
          ease: "sine.inOut"
        })
        .to(sunRef.current, {
          scale: 1,
          duration: 2.5,
          ease: "sine.inOut"
        });

    // Animation des rayons du soleil avec variation de vitesse
    gsap.to(sunRaysRef.current, {
      rotation: 360,
      duration: 80,
      repeat: -1,
      ease: "none"
    });

    // Animation de variation d'opacité des rayons
    gsap.to(sunRaysRef.current, {
      opacity: 0.7,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Animation d'entrée orchestrée
    const masterEnterTl = gsap.timeline();
    masterEnterTl
        // Apparition du titre avec effet cinématique
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 2,
          ease: "power4.out"
        })
        // Cathédrale apparaît avec un léger délai
        .to(cathedralRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.8,
          ease: "power3.out"
        }, "-=1.2")
        // Brouillard qui se dissipe
        .to(fogRef.current, {
          opacity: 0.3,
          x: '0%',
          duration: 3,
          ease: "power2.out"
        }, "-=1.5");

    // Timeline de scroll ultra-améliorée
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // Transition jour/nuit magistrale
    scrollTl
        // Phase 1: Coucher du soleil (0-20%)
        .to(sunRef.current, {
          y: '30vh',
          scale: 1.3,
          opacity: 0.8,
          duration: 0.3,
          ease: "power2.out",
        }, 0)
        .to(sunRaysRef.current, {
          scale: 1.5,
          opacity: 0.4,
          rotation: "+=180",
          duration: 0.3,
          ease: "power2.out"
        }, 0)
           .to(skyRef.current, {
                // background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 20%, #ffd23f 40%, #4ecdc4 60%, #45b7d1 80%, #96ceb4 100%)',
                duration: 0.3,
          ease: "power2.inOut"
        }, 0)

        // Phase 2: Crépuscule (20-40%)
        .to([sunRef.current, sunRaysRef.current], {
          opacity: 0,
          y: '50vh',
          scale: 0.5,
          duration: 0.2,
          ease: "power2.in",
        }, 0.3)
        .to(skyRef.current, {
        //  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
          duration: 0.2,
          ease: "power2.inOut"
        }, 0.3)

        // Phase 3: Début de nuit (40-60%)
        .to(skyRef.current, {
         // background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 20%, #4a6741 40%, #2c5530 60%, #0f3460 80%, #0c2461 100%)',
          duration: 0.2,
          ease: "power2.inOut"
        }, 0.5)

        // Apparition progressive des étoiles avec scintillement
        .to(starsRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        }, 0.4)

        // Phase 4: Nuit profonde (60-80%)
        .to(skyRef.current, {
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 70%, #475569 100%)',
          duration: 0.2,
          ease: "power3.out"
        }, 0.7)

        // Animation des nuages plus complexe
        .to(cloudsRef.current, {
          x: '-120%',
          opacity: 0.1,
          rotation: 8,
          scale: 1.1,
          duration: 0.8,
          ease: "power2.out"
        }, 0.2)

        // Apparition majestueuse de la lune
        .to(moonRef.current, {
          x: '0px',
          y: '0px',
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.8)"
        }, 0.6)

        // Effets lumineux sur la cathédrale progressifs
        .to(cathedralRef.current, {
          filter: 'contrast(1.4) brightness(0.7) drop-shadow(0 0 30px rgba(251, 191, 36, 0.4))',
          duration: 0.3
        }, 0.7)
        .to(cathedralRef.current, {
          filter: 'contrast(1.5) brightness(0.8) drop-shadow(0 0 60px rgba(251, 191, 36, 0.7)) drop-shadow(0 0 120px rgba(251, 191, 36, 0.4))',
          duration: 0.2
        }, 0.8)

        // Animation du titre avec effet de lueur progressive
        .to(titleRef.current, {
          textShadow: '0 0 10px rgba(251, 191, 36, 0.6)',
          duration: 0.2
        }, 0.9)
        .to(titleRef.current, {
          textShadow: '0 0 30px rgba(251, 191, 36, 0.9), 0 0 60px rgba(251, 191, 36, 0.6), 0 0 90px rgba(251, 191, 36, 0.3)',
          duration: 0.3
        }, 1)

        // Particules magiques
        .to(particlesRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        }, 0.6)

        // Rayons de lumière depuis la cathédrale
        .to(lightBeamsRef.current, {
          opacity: 0.6,
          scaleY: 1,
          duration: 0.4,
          ease: "power3.out"
        }, 0.8)

        // Brouillard mystique final
        .to(fogRef.current, {
          opacity: 0.15,
          x: '20%',
          duration: 0.3,
          ease: "power2.out"
        }, 0.9);

    // Animation continue de la lune (oscillation subtile)
    gsap.to(moonRef.current, {
      y: '+=10px',
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });



    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
      <div ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Ciel de fond */}
        <div
            ref={skyRef}
            className="absolute inset-0 transition-all duration-1000"
            style={{
              background: 'linear-gradient(135deg, #87CEEB 0%, #98D8E8 30%, #B6E5D8 60%, #A8E6A3 100%)'
            }}
        />

        {/* Soleil */}
        <div
            ref={sunRef}

        />


        {/* Nuages */}
        <div
            ref={cloudsRef}
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1800&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mixBlendMode: 'soft-light'
            }}
        />

        {/* Étoiles améliorées */}
        <div ref={starsRef} className="absolute inset-0 opacity-0">
          {[...Array(150)].map((_, i) => (
              <div
                  key={i}
                  className="absolute bg-white rounded-full animate-pulse"
                  style={{
                    width: Math.random() > 0.8 ? '3px' : Math.random() > 0.6 ? '2px' : '1px',
                    height: Math.random() > 0.8 ? '3px' : Math.random() > 0.6 ? '2px' : '1px',
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 70}%`,
                    opacity: Math.random() * 0.8 + 0.2,
                    animationDuration: `${Math.random() * 4 + 2}s`,
                    animationDelay: `${Math.random() * 6}s`,
                    boxShadow: Math.random() > 0.7 ? '0 0 4px rgba(255,255,255,0.8)' : 'none'
                  }}
              />
          ))}
        </div>

        {/* Particules magiques */}
        <div ref={particlesRef} className="absolute inset-0 opacity-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
              <div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.6 + 0.2,
                    animation: `float ${Math.random() * 6 + 4}s infinite ease-in-out`,
                    animationDelay: `${Math.random() * 8}s`,
                    boxShadow: '0 0 6px rgba(251, 191, 36, 0.8)'
                  }}
              />
          ))}
        </div>

        {/* Rayons de lumière depuis la cathédrale */}
        <div
            ref={lightBeamsRef}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-full opacity-0"
            style={{
              background: `conic-gradient(from 180deg at 50% 100%, 
            transparent 0deg, rgba(251, 191, 36, 0.1) 20deg, transparent 40deg,
            transparent 50deg, rgba(251, 191, 36, 0.15) 70deg, transparent 90deg,
            transparent 100deg, rgba(251, 191, 36, 0.1) 120deg, transparent 140deg,
            transparent 150deg, rgba(251, 191, 36, 0.15) 170deg, transparent 190deg,
            transparent 200deg, rgba(251, 191, 36, 0.1) 220deg, transparent 240deg,
            transparent 250deg, rgba(251, 191, 36, 0.15) 270deg, transparent 290deg,
            transparent 300deg, rgba(251, 191, 36, 0.1) 320deg, transparent 340deg,
            transparent 350deg, rgba(251, 191, 36, 0.15) 360deg)`,
              transformOrigin: '50% 100%'
            }}
        />

        {/* Lune avec aura améliorée */}
        <div
            ref={moonRef}
            className="absolute right-10 top-32 w-32 h-32 rounded-full opacity-0"
            style={{
              background: 'radial-gradient(circle at 60% 40%, rgba(255,255,255,1) 0%, rgba(251, 191, 36, 0.8) 100%)',
              boxShadow: `
            0 0 40px 10px rgba(255,223,186,0.6),
            0 0 80px 20px rgba(255,223,186,0.4),
            0 0 120px 30px rgba(255,223,186,0.2)
          `
            }}
        />

        {/* Cathédrale */}
        <div ref={cathedralRef} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-full">
            <img
                src="../../../public/cathe.png"
                alt="Cathédrale Saint-Jean"
                className="justify-center mx-auto"
                style={{
                    filter: 'contrast(1.3) brightness(0.9)',
                    transform: 'scale(1)', // Ajuste la valeur selon le rendu souhaité
                    maxWidth: '400px',      // Limite la largeur maximale
                    width: '100%',
                    height: 'auto'
                }}
            />
        </div>

        {/* Titre principal avec effet lumineux */}
        <div
            ref={titleRef}
            className={`${titleLightClass} absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center z-10`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)]">
            Lyon et ses Lumières
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            Un voyage magique à travers l'histoire et la splendeur de la Fête des Lumières
          </p>
        </div>
      </div>
  );
};