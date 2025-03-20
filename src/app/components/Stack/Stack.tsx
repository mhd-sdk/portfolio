import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Matter from 'matter-js';
import React, { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import './styles.css';

interface FallingSpritesProps {
  backgroundColor?: string;
  spriteCount?: number;
}

export const Stack: React.FC<FallingSpritesProps> = ({ backgroundColor = '#000000', spriteCount = 20 }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const isInitializedRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  // Remplacer l'Intersection Observer par ScrollTrigger pour initialiser Matter.js
  useEffect(() => {
    if (!containerRef.current || !sceneRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Créer un ScrollTrigger pour détecter quand la section est visible
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom-=100",
      end: "bottom top+=100", // Ajouter une fin pour détecter quand on quitte la section
      onEnter: () => {
        // Initialiser Matter.js quand la section devient visible
        if (!isInitializedRef.current) {
          initMatterJS();
        }
      },
      onLeave: () => {
        // Nettoyer Matter.js quand on quitte la section
        cleanupMatterJS();
      },
      onEnterBack: () => {
        // Réinitialiser Matter.js quand on revient à la section
        if (!isInitializedRef.current) {
          initMatterJS();
        }
      },
      onLeaveBack: () => {
        // Nettoyer Matter.js quand on quitte la section en remontant
        cleanupMatterJS();
      }
    });
    
    return () => {
      trigger.kill();
      cleanupMatterJS();
    };
  }, []);
  
  // Fonction pour initialiser Matter.js
  const initMatterJS = () => {
    const container = sceneRef.current;
    if (!container || !containerRef.current || isInitializedRef.current) return;
    
    // Obtenir les dimensions directement du conteneur
    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;
    
    if (width === 0 || height === 0) return;
    
    isInitializedRef.current = true;
    
    // Créer un moteur Matter.js
    const engine = Matter.Engine.create();
    engineRef.current = engine;
    
    // Créer le renderer
    const render = Matter.Render.create({
      element: container,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: backgroundColor,
      },
    });
    renderRef.current = render;
    
    // Créer la cuve (murs et sol)
    const wallThickness = 10;
    const walls = [
      // Sol
      Matter.Bodies.rectangle(width / 2, height, width, wallThickness, {
        isStatic: true,
        render: { fillStyle: 'white' },
      }),
      // Mur gauche
      Matter.Bodies.rectangle(0, height / 2, wallThickness, height, {
        isStatic: true,
        render: { fillStyle: 'white' },
      }),
      // Mur droit
      Matter.Bodies.rectangle(width, height / 2, wallThickness, height, {
        isStatic: true,
        render: { fillStyle: 'white' },
      }),
    ];
    
    Matter.Composite.add(engine.world, walls);
    
    // Créer les sprites qui tombent avec différentes formes
    const sprites: Matter.Body[] = [];
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3'];
    
    for (let i = 0; i < spriteCount; i++) {
      // Randomiser la forme (cercle, rectangle ou polygone)
      const shapeType = Math.floor(Math.random() * 3);
      const x = Math.random() * (width - 100) + 50;
      const y = Math.random() * -500 - 20; // Au-dessus de la zone visible
      const color = colors[Math.floor(Math.random() * colors.length)];
      let body;
      
      switch (shapeType) {
        case 0: // Cercle
          const radius = Math.random() * 20 + 10;
          body = Matter.Bodies.circle(x, y, radius, {
            restitution: 0.8,
            friction: 0.005,
            render: { fillStyle: color },
          });
          break;
        case 1: // Rectangle
          const w = Math.random() * 40 + 20;
          const h = Math.random() * 40 + 20;
          body = Matter.Bodies.rectangle(x, y, w, h, {
            restitution: 0.6,
            friction: 0.01,
            render: { fillStyle: color },
          });
          break;
        case 2: // Polygone
          const sides = Math.floor(Math.random() * 3) + 3; // 3 à 5 côtés
          const size = Math.random() * 25 + 15;
          body = Matter.Bodies.polygon(x, y, sides, size, {
            restitution: 0.7,
            friction: 0.02,
            render: { fillStyle: color },
          });
          break;
      }
      
      if (body) {
        // Ajouter une rotation aléatoire
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
        sprites.push(body);
      }
    }
    
    // Ajouter les sprites au monde avec un petit délai pour les faire tomber progressivement
    const addSpritesWithDelay = () => {
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < sprites.length) {
          Matter.Composite.add(engine.world, sprites[index]);
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, 100);
    };
    
    // Démarrer le moteur et le renderer
    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    runnerRef.current = runner;
    
    // Ajouter les sprites avec un délai
    addSpritesWithDelay();
  };

  // Ajouter une fonction pour nettoyer Matter.js
  const cleanupMatterJS = () => {
    if (runnerRef.current) {
      Matter.Runner.stop(runnerRef.current);
      runnerRef.current = null;
    }
    
    if (renderRef.current) {
      Matter.Render.stop(renderRef.current);
      renderRef.current = null;
    }
    
    if (engineRef.current) {
      Matter.Engine.clear(engineRef.current);
      engineRef.current = null;
    }
    
    // Réinitialiser le flag pour permettre une nouvelle initialisation
    isInitializedRef.current = false;
    
    // Nettoyer le contenu du conteneur
    if (sceneRef.current) {
      while (sceneRef.current.firstChild) {
        sceneRef.current.removeChild(sceneRef.current.firstChild);
      }
    }
  };

  // Animation du texte similaire à About
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!headerRef.current || !descriptionRef.current || !sectionRef.current) return;

    const descriptionText = new SplitType(descriptionRef.current, { types: 'lines' });

    gsap.set(descriptionText.lines, {
      y: 50,
      opacity: 0,
    });
    gsap.set(headerRef.current, {
      y: -20,
      opacity: 0,
    });

    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        pinSpacing: true,
        scrub: false,
      },
    });

    headerTl.to(headerRef.current, {
      opacity: 1,
      ease: 'power2.out',
      y: 0,
      duration: 9,
    });
    headerTl.to({}, { duration: 5 });

    const descriptionTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
        scrub: false,
      },
    });

    descriptionTl.to(descriptionText.lines, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.3,
      ease: 'power2.out',
    });
    descriptionTl.to({}, { duration: 2 });

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill(false));
      }

      descriptionTl.kill();
      if (descriptionText) {
        descriptionText.revert();
      }
    };
  }, []);

  return (
    <section id="stack-section" ref={sectionRef}>
      <div id="stack-content">
        {/* Inverser l'ordre: texte à gauche, container à droite */}
        <div className="stack-content-wrapper">
          <div className="stack-title-container">
            <h1 id="stack-title-header" ref={headerRef}>
              Tech Stack
            </h1>
          </div>
          <div className="stack-description-container">
            <p className="stack-description-text" ref={descriptionRef}>
              I work with a variety of technologies to build modern web applications.
              <br />
              My primary stack includes React, TypeScript, and Node.js.
              <br />
              I'm also experienced with databases like MongoDB and PostgreSQL.
              <br />
              For styling, I use CSS-in-JS solutions and Tailwind CSS.
              <br />
              I'm always eager to learn new technologies and improve my skills.
            </p>
          </div>
        </div>
        <div ref={containerRef} id="stack-container">
          <div
            id="stack-scene"
            ref={sceneRef}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>
    </section>
  );
};
