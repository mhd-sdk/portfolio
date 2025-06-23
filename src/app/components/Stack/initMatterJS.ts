import Matter, { Composite, Mouse, MouseConstraint } from 'matter-js';
import golang from '../../../../public/stack-icons/golang.png';
import react from '../../../../public/stack-icons/react.png';
import typescript from '../../../../public/stack-icons/typescript.png';

interface InitMatterJSProps {
  containerRef: React.RefObject<HTMLDivElement>;
  sceneRef: React.RefObject<HTMLDivElement>;
  engineRef: React.MutableRefObject<Matter.Engine | null>;
  renderRef: React.MutableRefObject<Matter.Render | null>;
  runnerRef: React.MutableRefObject<Matter.Runner | null>;
  isInitializedRef: React.MutableRefObject<boolean>;
  backgroundColor: string;
}

export const initMatterJS = ({ containerRef, sceneRef, engineRef, renderRef, runnerRef, isInitializedRef, backgroundColor }: InitMatterJSProps) => {
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

  const visibleFloor = Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, {
    isStatic: true,
    render: { fillStyle: 'transparent' },
  });

  const collisionFloor = Matter.Bodies.rectangle(width / 2, height + (collisionThickness + wallThickness) / 2, width, collisionThickness, {
    isStatic: true,
    render: { fillStyle: 'transparent', opacity: 0 },
    collisionFilter: { group: 1 },
  });

  const visibleLeftWall = Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height + collisionThickness, {
    isStatic: true,
    render: { fillStyle: 'transparent' },
  });

  const visibleRightWall = Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height + collisionThickness, {
    isStatic: true,
    render: { fillStyle: 'transparent' },
  });

  Matter.Composite.add(floor, [visibleFloor, collisionFloor]);
  Matter.Composite.add(leftWall, [visibleLeftWall]);
  Matter.Composite.add(rightWall, [visibleRightWall]);

  Matter.Composite.add(engine.world, [floor, leftWall, rightWall]);

  const y = Math.random() * -500 - 20;
  const sprites: Matter.Body[] = [
    Matter.Bodies.rectangle(0.25, y, 100, 100, {
      restitution: 0.3,
      friction: 0.5,
      render: {
        sprite: {
          texture: typescript.src,
          xScale: 0.21,
          yScale: 0.21,
        },
      },
    }),
    Matter.Bodies.rectangle(width * 0.5, y, 145, 100, {
      restitution: 0.3,
      friction: 0.5,
      render: {
        sprite: {
          texture: golang.src,
          xScale: 0.14,
          yScale: 0.14,
        },
      },
    }),
    Matter.Bodies.circle(width * 0.75, y, 50, {
      restitution: 0.6,
      friction: 0.11,
      render: {
        sprite: {
          texture: react.src,
          xScale: 0.026,
          yScale: 0.026,
        },
      },
    }),
  ];

  sprites.forEach((sprite) => {
    Matter.Body.setAngularVelocity(sprite, (Math.random() - 0.5) * 0.1);
  });

  const addSpritesWithDelay = () => {
    sprites.forEach((sprite) => {
      setTimeout(() => {
        Matter.World.add(engine.world, sprite);
      });
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

    const visibleCeiling = Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, {
      isStatic: true,
      render: { fillStyle: 'transparent' },
    });

    const collisionCeiling = Matter.Bodies.rectangle(width / 2, -(collisionThickness + wallThickness) / 2, width, collisionThickness, {
      isStatic: true,
      render: { fillStyle: 'transparent', opacity: 0 },
      collisionFilter: { group: 1 },
    });

    Matter.Composite.add(ceilingComposite, [visibleCeiling, collisionCeiling]);
    Matter.Composite.add(engine.world, ceilingComposite);
  }, 3500);
};
