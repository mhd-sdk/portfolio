import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/Addons.js';

interface GeometricShape {
  mesh: THREE.LineSegments;
  value: string;
  lifespan: number;
  maxLife: number;
  size: number;
}

const AsciiLanding: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const shapesRef = useRef<GeometricShape[]>([]);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const effectRef = useRef<any>(null);
  const animationFrameId = useRef<number | null>(null);
  const cameraTargetRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

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

  // Initialisation de Three.js
  useEffect(() => {
    if (!containerRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    const { width, height } = dimensions;

    // Création de la scène
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x000000);

    // Création de la caméra
    const camera = new THREE.PerspectiveCamera(70, width / height, 1, 3000);
    cameraRef.current = camera;
    camera.position.z = 1500;

    // Création du renderer
    const renderer = new THREE.WebGLRenderer();
    rendererRef.current = renderer;
    renderer.setSize(width, height);

    // Création de l'effet ASCII avec uniquement des caractères binaires et espaces
    const effect = new AsciiEffect(renderer, ' 01', { invert: true });
    effectRef.current = effect;
    effect.setSize(width, height);
    effect.domElement.style.color = 'white';
    effect.domElement.style.backgroundColor = 'black';
    effect.domElement.style.fontSize = '10px';
    effect.domElement.style.fontFamily = 'monospace';

    // Nettoyage et ajout au DOM
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(effect.domElement);

    // Création des cubes initiaux (12 au total - triple de 4)
    createInitialCubes();

    // Gestion des événements de souris
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      // Sauvegarde de la position précédente
      previousMousePosition.current = { ...mousePosition.current };

      // Normaliser la position de la souris entre -1 et 1
      mousePosition.current = {
        x: ((event.clientX - rect.left) / width) * 2 - 1,
        y: -((event.clientY - rect.top) / height) * 2 + 1
      };

      // Calculer les rotations cibles de la caméra en fonction de la position de la souris
      // Inverser l'axe X pour que le mouvement soit naturel
      cameraTargetRotation.current = {
        x: mousePosition.current.y * 0.3,
        y: -mousePosition.current.x * 0.3  // Axe X inversé ici
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !effectRef.current) return;

      // Animer les cubes (rotation lente)
      animateCubes();

      // Animation fluide de la rotation de la caméra
      if (cameraRef.current) {
        cameraRef.current.rotation.x += (cameraTargetRotation.current.x - cameraRef.current.rotation.x) * 0.05;
        cameraRef.current.rotation.y += (cameraTargetRotation.current.y - cameraRef.current.rotation.y) * 0.05;
      }

      effectRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    // Nettoyage
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }

      if (containerRef.current && effect.domElement && containerRef.current.contains(effect.domElement)) {
        containerRef.current.removeChild(effect.domElement);
      }

      window.removeEventListener('mousemove', handleMouseMove);

      // Nettoyage des cubes
      shapesRef.current.forEach(shape => {
        if (sceneRef.current) {
          sceneRef.current.remove(shape.mesh);
        }
        if (shape.mesh.geometry) {
          shape.mesh.geometry.dispose();
        }
        if (shape.mesh.material) {
          const material = shape.mesh.material as THREE.Material | THREE.Material[];
          if (Array.isArray(material)) {
            material.forEach(m => m.dispose());
          } else {
            material.dispose();
          }
        }
      });

      shapesRef.current = [];
      renderer.dispose();
    };
  }, [dimensions]);

  // Fonction pour créer les cubes initiaux (12 au total - triple de 4)
  const createInitialCubes = () => {
    if (!sceneRef.current) return;

    // Triple le nombre de cubes (12 au lieu de 4)
    const cubeCount = 12;

    // Créer une grille 3D de positions pour les 12 cubes
    // Avec un espace régulier entre eux
    const positions = [];

    // Définir l'espacement entre les cubes
    const spacing = 600;

    // Créer une disposition en grille 3x2x2 (3 couches, 2 lignes, 2 colonnes)
    for (let z = 0; z < 3; z++) {
      for (let y = 0; y < 2; y++) {
        for (let x = 0; x < 2; x++) {
          positions.push({
            x: (x * 2 - 1) * spacing,
            y: (y * 2 - 1) * spacing,
            z: (z - 1) * spacing
          });
        }
      }
    }

    // S'assurer qu'on n'a que 12 positions
    positions.length = cubeCount;

    for (let i = 0; i < cubeCount; i++) {
      addCube(positions[i]);
    }
  };

  // Fonction pour ajouter un cube avec seulement les arêtes
  const addCube = (position: { x: number, y: number, z: number }) => {
    if (!sceneRef.current) return;

    const scene = sceneRef.current;

    // Valeur binaire (pour déterminer certaines caractéristiques)
    const value = Math.random() > 0.5 ? '1' : '0';

    // Taille beaucoup plus grande
    const size = Math.random() * 150 + 200;

    // Création du cube en utilisant uniquement les arêtes (edges)
    const geometry = new THREE.BoxGeometry(size, size, size);

    // Convertir la géométrie en edges pour n'avoir que les arêtes
    const edgesGeometry = new THREE.EdgesGeometry(geometry);

    // Matériau pour les lignes
    const material = new THREE.LineBasicMaterial({
      color: value === '1' ? 0xffffff : 0xcccccc,
      transparent: true,
      opacity: 0.8
    });

    // Création du mesh avec seulement les arêtes
    const mesh = new THREE.LineSegments(edgesGeometry, material);

    // Position - bien écartée comme demandé
    mesh.position.set(position.x, position.y, position.z);

    // Rotation aléatoire initiale
    mesh.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );

    // Durée de vie très longue
    const maxLife = 10000 + Math.random() * 5000;

    // Ajouter à la scène
    scene.add(mesh);

    // Stocker le cube
    shapesRef.current.push({
      mesh,
      value,
      lifespan: maxLife,
      maxLife,
      size
    });
  };

  // Fonction pour animer les cubes
  const animateCubes = () => {
    if (!sceneRef.current) return;

    // Parcourir tous les cubes
    shapesRef.current.forEach((shape) => {
      // Rotation très lente des cubes
      if (shape.value === '1') {
        // Les '1' tournent un peu différemment
        shape.mesh.rotation.x += 0.0005;
        shape.mesh.rotation.y += 0.0008;
      } else {
        shape.mesh.rotation.y += 0.0004;
        shape.mesh.rotation.z += 0.0006;
      }

      // Pour les '1', parfois faire clignoter légèrement
      if (shape.value === '1' && Math.random() > 0.995) {
        const material = shape.mesh.material as THREE.LineBasicMaterial;
        material.opacity = 0.5 + Math.random() * 0.5;
      }
    });
  };

  return (
    <div
      className="binary-scene-container"
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

export default AsciiLanding;
