import React, { useRef, useEffect, useState, ReactNode, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import LightSphere from './LightSphere';

// Créer un contexte pour suivre les éléments qui doivent être illuminés
interface LightContextType {
  registerElement: (ref: React.RefObject<HTMLElement>, priority: number) => void;
  unregisterElement: (ref: React.RefObject<HTMLElement>) => void;
}

const LightContext = createContext<LightContextType>({
  registerElement: () => {},
  unregisterElement: () => {},
});

// Hook pour utiliser la lumière sur un élément - exporté pour être utilisé dans d'autres composants
export const useLightEffect = (priority: number = 0) => {
  const ref = useRef<HTMLDivElement>(null);
  const context = useContext(LightContext);

  useEffect(() => {
    if (ref.current) {
      context.registerElement(ref, priority);
    }
    return () => {
      context.unregisterElement(ref);
    };
  }, [context, priority]);

  return { ref, className: "light-target transition-all duration-700" };
};

interface LightProviderProps {
  children: ReactNode;
  radius?: number;
  color?: string;
  intensity?: number;
  zigzagStrength?: number;
}

const LightProvider: React.FC<LightProviderProps> = ({
  children,
  radius = 300,
  color = '#FFCC88',
  intensity = 0.9,
  zigzagStrength = 1
}) => {
  const [targetElements, setTargetElements] = useState<{ref: React.RefObject<HTMLElement>, priority: number}[]>([]);

  // Fonction pour enregistrer un élément qui doit être éclairé
  const registerElement = (ref: React.RefObject<HTMLElement>, priority: number) => {
    setTargetElements(prev => [...prev, { ref, priority }].sort((a, b) => a.priority - b.priority));
  };

  // Fonction pour supprimer un élément de la liste
  const unregisterElement = (ref: React.RefObject<HTMLElement>) => {
    setTargetElements(prev => prev.filter(item => item.ref !== ref));
  };

  useEffect(() => {
    // Appliquer des styles CSS pour créer l'effet que les éléments hors sphère sont moins visibles
    const style = document.createElement('style');
    style.textContent = `
      body {
        background-color: #080b14;
        color: #ffffff;
      }
      .light-target {
        opacity: 0.4;
        filter: brightness(0.5) saturate(0.8);
        transition: opacity 0.8s ease-out, filter 0.8s ease-out;
      }
      .light-target.illuminated {
        opacity: 1;
        filter: brightness(1.2) saturate(1.2);
      }
    `;
    document.head.appendChild(style);

    // Observer l'intersection avec la sphère lumineuse
    const observer = new MutationObserver(() => {
      // Mettre à jour les classes des éléments cibles
      document.querySelectorAll('.light-target').forEach(element => {
        element.classList.remove('illuminated');
      });

      // Déterminer quel élément est actuellement illuminé (par défaut le premier)
      if (targetElements.length > 0 && targetElements[0].ref.current) {
        targetElements[0].ref.current.classList.add('illuminated');
      }
    });

    // Observer les changements dans le DOM
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.head.removeChild(style);
      observer.disconnect();
    };
  }, []);

  return (
    <LightContext.Provider value={{ registerElement, unregisterElement }}>
      {children}
      {createPortal(
        <LightSphere
          targetRefs={targetElements.map(item => item.ref)}
          radius={radius}
          color={color}
          intensity={intensity}
          zigzagStrength={zigzagStrength}
        />,
        document.body
      )}
    </LightContext.Provider>
  );
};

export default LightProvider;
