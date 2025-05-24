import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LightSphereProps {
  targetRefs?: React.RefObject<HTMLElement>[];
  radius?: number;
  color?: string;
  intensity?: number;
  zigzagStrength?: number;
}

const LightSphere: React.FC<LightSphereProps> = ({
  targetRefs = [],
  radius = 300,
  color = '#FFCC88',
  intensity = 1,
  zigzagStrength = 0.5
}) => {
  const sphereRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<number>(-1);

  useEffect(() => {
    if (!sphereRef.current || !wrapperRef.current) return;

    // Position initiale (sur le titre principal)
    gsap.set(sphereRef.current, {
      left: '50%',
      top: '50vh',
      xPercent: -50,
      yPercent: -50,
      opacity: 0
    });

    // Fade in initial
    gsap.to(sphereRef.current, {
      duration: 2,
      opacity: 0.9,
      ease: 'power2.out'
    });

    // Points d'ancrage pour le zig-zag (sera remplacé dynamiquement)
    const defaultAnchors = [
      { x: '50%', y: '20vh' },   // position titre
      { x: '25%', y: '60vh' },   // premier zigzag
      { x: '75%', y: '100vh' },  // deuxième zigzag
      { x: '40%', y: '140vh' },  // troisième zigzag
      { x: '60%', y: '180vh' },  // quatrième zigzag
    ];

    // Créer des points d'ancrage dynamiques si nous avons des refs cibles
    const anchors = targetRefs.length > 0
      ? targetRefs.map(ref => {
          if (!ref.current) return { x: '50%', y: '50vh' };
          const rect = ref.current.getBoundingClientRect();
          return {
            x: `${rect.left + rect.width/2}px`,
            y: `${rect.top + rect.height/2 + window.scrollY}px`
          };
        })
      : defaultAnchors;

    // Créer la timeline pour l'animation de la sphère au scroll
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          // Déterminer la section actuelle en fonction de la progression
          const newSection = Math.floor(self.progress * anchors.length);
          if (newSection !== currentSection) {
            setCurrentSection(newSection);
          }
        },
      }
    });

    // Ajouter des mouvements en zigzag entre les points d'ancrage
    anchors.forEach((anchor, i) => {
      if (i === 0) {
        timeline.to(sphereRef.current, {
          left: anchor.x,
          top: anchor.y,
          ease: 'power1.inOut',
          duration: 1 / anchors.length
        });
      } else {
        // Calculer un point de contrôle pour créer un effet de zigzag
        const prevAnchor = anchors[i-1];
        const isEven = i % 2 === 0;
        const controlPoint = {
          x: `${isEven ? 'random(20, 30)' : 'random(70, 80)'}%`,
          y: `+=${(parseInt(anchor.y) - parseInt(prevAnchor.y)) / 2}px`,
        };

        // Mouvement zigzag en utilisant une animation bezier
        timeline.to(sphereRef.current, {
          motionPath: {
            path: [
              { x: prevAnchor.x, y: prevAnchor.y },
              { x: controlPoint.x, y: controlPoint.y },
              { x: anchor.x, y: anchor.y }
            ],
            curviness: zigzagStrength
          },
          ease: 'power1.inOut',
          duration: 1 / anchors.length
        });

        // Ajouter une légère pause sur chaque point d'ancrage important
        if (targetRefs[i] && targetRefs[i].current) {
          timeline.to(sphereRef.current, {
            scale: 1.2,
            duration: 0.2 / anchors.length
          });
          timeline.to(sphereRef.current, {
            scale: 1,
            duration: 0.2 / anchors.length
          });
        }
      }
    });

    return () => {
      timeline.kill();
    };
  }, [targetRefs, radius, color, intensity, zigzagStrength, currentSection]);

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        ref={sphereRef}
        className="absolute rounded-full blur-[100px] pointer-events-none"
        style={{
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
          background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)`,
          opacity: intensity,
          filter: `blur(${radius / 5}px)`,
          mixBlendMode: 'screen',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>
  );
};

export default LightSphere;
