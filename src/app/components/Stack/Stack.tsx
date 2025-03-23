import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Matter, { Composite, Mouse, MouseConstraint } from 'matter-js';
import React, { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import docker from '../../../../public/stack-icons/docker.jpg';
import golang from '../../../../public/stack-icons/golang.png';
import grafana from '../../../../public/stack-icons/grafana.png';
import javascript from '../../../../public/stack-icons/javascript.png';
import mariadb from '../../../../public/stack-icons/mariadb.png';
import postgres from '../../../../public/stack-icons/postgres.png';
import react from '../../../../public/stack-icons/react.png';
import typescript from '../../../../public/stack-icons/typescript.png';

interface FallingSpritesProps {
  backgroundColor?: string;
}

export const Stack: React.FC<FallingSpritesProps> = ({ backgroundColor = 'var(--bg)' }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const isInitializedRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sceneRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom-=100',
      end: 'bottom top+=100',
      onEnter: () => {
        if (!isInitializedRef.current) {
          initMatterJS();
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const initMatterJS = () => {
    const container = sceneRef.current;
    if (!container || !containerRef.current || isInitializedRef.current) return;

    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;

    if (width === 0 || height === 0) return;

    isInitializedRef.current = true;

    const engine = Matter.Engine.create();
    engineRef.current = engine;

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

    const wallThickness = 10;
    const collisionThickness = 500;

    const floor = Matter.Composite.create();
    const leftWall = Matter.Composite.create();
    const rightWall = Matter.Composite.create();

    const visibleFloor = Matter.Bodies.rectangle(width / 2, height, width, wallThickness, {
      isStatic: true,
      render: { fillStyle: 'transparent' },
    });

    const collisionFloor = Matter.Bodies.rectangle(width / 2, height + (collisionThickness - wallThickness) / 2, width, collisionThickness, {
      isStatic: true,
      render: { fillStyle: 'transparent', opacity: 0 },
      collisionFilter: { group: 1 },
    });

    const visibleLeftWall = Matter.Bodies.rectangle(0, height / 2, wallThickness, height, {
      isStatic: true,
      render: { fillStyle: 'transparent' },
    });

    const collisionLeftWall = Matter.Bodies.rectangle(-(collisionThickness - wallThickness) / 2, height / 2, collisionThickness, height, {
      isStatic: true,
      render: { fillStyle: 'transparent', opacity: 0 },
      collisionFilter: { group: 1 },
    });

    const visibleRightWall = Matter.Bodies.rectangle(width, height / 2, wallThickness, height, {
      isStatic: true,
      render: { fillStyle: 'transparent' },
    });

    const collisionRightWall = Matter.Bodies.rectangle(width + (collisionThickness - wallThickness) / 2, height / 2, collisionThickness, height, {
      isStatic: true,
      render: { fillStyle: 'transparent', opacity: 0 },
      collisionFilter: { group: 1 },
    });

    Matter.Composite.add(floor, [visibleFloor, collisionFloor]);
    Matter.Composite.add(leftWall, [visibleLeftWall, collisionLeftWall]);
    Matter.Composite.add(rightWall, [visibleRightWall, collisionRightWall]);

    Matter.Composite.add(engine.world, [floor, leftWall, rightWall]);

    const y = Math.random() * -500 - 20;
    const sprites: Matter.Body[] = [
      Matter.Bodies.rectangle(Math.floor(Math.random() * (width - 0 + 1)), y, 70, 70, {
        restitution: 0.3,
        friction: 0.5,
        render: {
          sprite: {
            texture: typescript.src,
            xScale: 0.145,
            yScale: 0.145,
          },
        },
      }),
      Matter.Bodies.rectangle(Math.floor(Math.random() * (width - 0 + 1)), y, 70, 70, {
        restitution: 0.3,
        friction: 0.5,
        render: {
          sprite: {
            texture: javascript.src,
            xScale: 0.135,
            yScale: 0.135,
          },
        },
      }),
      Matter.Bodies.rectangle(Math.floor(Math.random() * (width - 0 + 1)), y, 70, 70, {
        restitution: 0.3,
        friction: 0.5,
        render: {
          sprite: {
            texture: docker.src,
            xScale: 0.135,
            yScale: 0.135,
          },
        },
      }),
      Matter.Bodies.rectangle(Math.floor(Math.random() * (width - 0 + 1)), y, 100, 70, {
        restitution: 0.3,
        friction: 0.5,
        render: {
          sprite: {
            texture: golang.src,
            xScale: 0.1,
            yScale: 0.1,
          },
        },
      }),
      Matter.Bodies.rectangle(Math.floor(Math.random() * (width - 0 + 1)), y, 70, 70, {
        restitution: 0.3,
        friction: 0.5,
        render: {
          sprite: {
            texture: mariadb.src,
            xScale: 0.135,
            yScale: 0.135,
          },
        },
      }),
      Matter.Bodies.circle(Math.floor(Math.random() * (width - 0 + 1)), y, 50, {
        restitution: 0.6,
        friction: 0.11,
        render: {
          sprite: {
            texture: react.src,
            xScale: 0.025,
            yScale: 0.025,
          },
        },
      }),
      Matter.Bodies.circle(Math.floor(Math.random() * (width - 0 + 1)), y, 50, {
        restitution: 0.6,
        friction: 0.11,
        render: {
          sprite: {
            texture: grafana.src,
            xScale: 0.025,
            yScale: 0.025,
          },
        },
      }),
      Matter.Bodies.circle(Math.floor(Math.random() * (width - 0 + 1)), y, 50, {
        restitution: 0.6,
        friction: 0.11,
        render: {
          sprite: {
            texture: postgres.src,
            xScale: 0.025,
            yScale: 0.025,
          },
        },
      }),
    ];

    sprites.forEach((sprite) => {
      Matter.Body.setAngularVelocity(sprite, (Math.random() - 0.5) * 0.05);
    });

    const addSpritesWithDelay = () => {
      sprites.forEach((sprite) => {
        setTimeout(() => {
          Matter.World.add(engine.world, sprite);
        }, Math.random() * 500);
      });
    };

    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

    Composite.add(engine.world, mouseConstraint);

    render.mouse = mouse;
    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    runnerRef.current = runner;

    addSpritesWithDelay();

    setTimeout(() => {
      const ceilingComposite = Matter.Composite.create();

      const visibleCeiling = Matter.Bodies.rectangle(width / 2, 0, width, wallThickness, {
        isStatic: true,
        render: { fillStyle: 'var(--bg)' },
      });

      const collisionCeiling = Matter.Bodies.rectangle(width / 2, -(collisionThickness - wallThickness) / 2, width, collisionThickness, {
        isStatic: true,
        render: { fillStyle: 'var(--bg)', opacity: 0 },
        collisionFilter: { group: 1 },
      });

      Matter.Composite.add(ceilingComposite, [visibleCeiling, collisionCeiling]);
      Matter.Composite.add(engine.world, ceilingComposite);
    }, 2000);
  };

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
        start: 'top bottom',
        end: '+=100%',
        scrub: false,
      },
    });

    headerTl.to(headerRef.current, {
      opacity: 1,
      ease: 'power2.out',
      y: 0,
      duration: 2.5,
    });

    const descriptionTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
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
    <section 
      id="stack-section" 
      className="h-screen w-full flex items-center justify-center relative"
      ref={sectionRef}
    >
      <div 
        ref={containerRef} 
        id="stack-container" 
        className="absolute inset-0 overflow-hidden z-10"
      >
        <div id="stack-scene" ref={sceneRef} className="w-full h-full" />
      </div>
      <div className="absolute z-20 text-center">
        <h1 id="stack-title-header" ref={headerRef} className="text-5xl m-0 text-white">Technologies</h1>
        <p className="text-[1.4rem] leading-[1.6] text-white">
          I use a variety of technologies, and I'm always open to learn new ones.
          <br />
          At the moment, I'm focusing on React, TypeScript, and Golang.
        </p>
      </div>
    </section>
  );
};
