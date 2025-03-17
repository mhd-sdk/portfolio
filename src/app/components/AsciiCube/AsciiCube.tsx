import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { AsciiEffect, TrackballControls } from 'three/examples/jsm/Addons.js';
const AsciiCube: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    const { width, height } = dimensions;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0, 0, 0);

    const camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
    camera.position.y = 150;
    camera.position.z = 500;

    const pointLight1 = new THREE.PointLight(0xffffff, 3, 0, 0);
    pointLight1.position.set(500, 500, 500);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0);
    pointLight2.position.set(-500, -500, -500);
    scene.add(pointLight2);

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(200, 20, 10), new THREE.MeshPhongMaterial({ flatShading: true }));
    scene.add(sphere);

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshBasicMaterial({ color: 0xe0e0e0 }));
    plane.position.y = -200;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // Define renderer here
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    // Now create the AsciiEffect after renderer is defined
    const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
    effect.setSize(width, height);
    effect.domElement.style.color = 'white';
    effect.domElement.style.backgroundColor = 'black';

    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(effect.domElement);

    // Create controls after effect is defined
    const controls = new TrackballControls(camera, effect.domElement);

    const start = Date.now();
    let animationFrameId: number;

    const animate = (): void => {
      const timer = Date.now() - start;
      sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 150;
      sphere.rotation.x = timer * 0.0003;
      sphere.rotation.z = timer * 0.0002;

      controls.update();
      effect.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current) {
        if (containerRef.current.contains(effect.domElement)) {
          containerRef.current.removeChild(effect.domElement);
        }
      }
      renderer.dispose();
      controls.dispose();
    };
  }, [dimensions]);

  return (
    <div
      className="ascii-effect-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      />
    </div>
  );
};

export default AsciiCube;
