import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useLightEffect } from './LightProvider';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

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

  const { ref: titleRef, className: titleLightClass } = useLightEffect(1);

  useEffect(() => {
    if (!heroRef.current) return;

    gsap.set([titleRef.current, cathedralRef.current], {
      opacity: 0,
      y: 80,
      scale: 0.9,
      rotationX: 15
    });
    gsap.set(starsRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(particlesRef.current, { opacity: 0 });
    gsap.set(lightBeamsRef.current, { opacity: 0, scaleY: 0 });
    gsap.set(fogRef.current, { opacity: 0, x: '-100%' });

    // Configuration initiale du soleil
    gsap.set(sunRef.current, {
      xPercent: 0,
      yPercent: 0,
      x: '80vw',      // Aligné avec le premier point de l'animation
      y: '30vh',      // Aligné avec le premier point de l'animation
      opacity: 1,
      scale: 1
    });

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
        scrub: 3,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Séquence de couleurs naturelles pour le cycle jour/nuit
    const skyColors = {
      day: 'linear-gradient(180deg, #b5d6e6 0%, #c7e6f5 100%)',              // Bleu ciel doux
      goldenHour: 'linear-gradient(180deg, #d9b897 0%, #eac4a3 100%)',      // Heure dorée
      sunset: 'linear-gradient(180deg, #a86f5f 0%, #694b55 100%)',          // Coucher de soleil
      bluehour: 'linear-gradient(180deg, #4a546d 0%, #2f3c56 100%)',        // Heure bleue
      night: 'linear-gradient(180deg, #1a2238 0%, #0f172a 100%)'            // Nuit
    };

    // Transition jour/nuit améliorée
    scrollTl
      // Animation des nuages
      .to(cloudsRef.current, {
        x: '-30%',
        opacity: 0.4,
        scale: 1.1,
        duration: 3,
        ease: "none"
      }, 0)
      .to(cloudsRef.current, {
        opacity: 0.2,
        scale: 1.2,
        duration: 1,
        ease: "power1.inOut"
      }, 2)

      // Transition du ciel
      .to(skyRef.current, {
        background: skyColors.goldenHour,
        duration: 0.8,
        ease: "none"
      })
      .to(skyRef.current, {
        background: skyColors.sunset,
        duration: 0.8,
        ease: "none"
      })
      .to(skyRef.current, {
        background: skyColors.bluehour,
        duration: 0.8,
        ease: "none"
      })
      .to(skyRef.current, {
        background: skyColors.night,
        duration: 0.8,
        ease: "none"
      })

      // Illumination progressive de la cathédrale
      .to(cathedralRef.current, {
        filter: 'brightness(1.1) contrast(1.05) saturate(1.1)',  // Légère accentuation pour l'heure dorée
        duration: 0.8,
        ease: "power1.inOut"
      }, 0)
      .to(cathedralRef.current, {
        filter: 'brightness(0.9) contrast(1.1) saturate(0.95)',  // Lumière du coucher de soleil
        duration: 0.8,
        ease: "power1.inOut"
      }, 0.8)
      .to(cathedralRef.current, {
        filter: 'brightness(0.7) contrast(1.15) saturate(0.8)',  // Heure bleue
        duration: 0.8,
        ease: "power1.inOut"
      }, 1.6)
      .to(cathedralRef.current, {
        filter: 'brightness(0.6) contrast(1.2) saturate(0.7)',   // Nuit
        duration: 0.8,
        ease: "power1.inOut"
      }, 2.4)

      // Transition du soleil avec mouvement en arc de cercle
      .to(sunRef.current, {
        motionPath: {
          path: [
            {x: '80vw', y: '30vh'},     // Position initiale (plus haut à droite)
            {x: '40vw', y: '15vh'},     // Premier point de l'arc (plus haut)
            {x: '0vw', y: '10vh'},      // Point culminant au-dessus de la cathédrale
            {x: '-40vw', y: '30vh'},    // Point de descente
            {x: '-80vw', y: '70vh'}     // Point de sortie (plus bas à gauche)
          ],
          curviness: 1.5,              // Augmentation de la courbure
          autoRotate: false
        },
        duration: 4,
        ease: "none"
      }, 0)

      // Animation de l'opacité du soleil
      .to(sunRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.in"
      }, 3)  // Commence à disparaître vers la fin du mouvement

      // Transition des rayons du soleil
      .to(sunRaysRef.current, {
        opacity: 0.9,
        scale: 1.1,
        duration: 0.8,
        ease: "power1.inOut"
      }, 0)
      .to(sunRaysRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.6,
        ease: "power1.inOut"
      }, 0.8)

      // Apparition des étoiles
      .to(starsRef.current, {
        opacity: 0.7,
        scale: 1,
        duration: 1.6,
        ease: "power1.inOut"
      }, 2);

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
            className="absolute right-[20%] top-[20%] w-32 h-32 rounded-full"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255,236,179,1) 0%, rgba(255,167,38,1) 100%)',
              boxShadow: `
                0 0 60px 15px rgba(255,236,179,0.4),
                0 0 100px 30px rgba(255,167,38,0.3),
                0 0 140px 45px rgba(255,167,38,0.2)
              `,
              transform: 'translate(0, 0)'  // Position initiale sans transformation
            }}
        />

        {/* Nuages */}
        <div
            ref={cloudsRef}
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1800&auto=format&fit=crop")',
              backgroundSize: '150% cover', // Augmentation de la taille
              backgroundPosition: 'center',
              mixBlendMode: 'soft-light',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              transform: 'scale(1.2)', // Scale initial pour éviter les bords vides
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

        {/* Lune (Premier croissant) */}
        <div
            ref={moonRef}
            className="absolute right-32 bottom-20 w-24 h-24 rounded-full opacity-0"
            style={{
              background: 'radial-gradient(circle at 60% 50%, rgba(255,255,255,0.95) 0%, rgba(220,220,220,0.9) 100%)',
              boxShadow: `
                inset -15px -2px 0px 0px rgba(0,0,0,0.8),
                0 0 20px 5px rgba(255,255,255,0.4)
              `,
              transform: 'rotate(45deg)' // Orientation du croissant
            }}
        />

        {/* Cathédrale */}
        <div ref={cathedralRef} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-full">
            <img
                src="/cathe.png"
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
