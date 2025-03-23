import gsap from 'gsap'; // Importation statique de GSAP
import { useEffect, useRef } from 'react';

export const Link = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef(null);
  const arrowRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Configuration initiale
    gsap.set(overlayRef.current, { width: 0 });
    gsap.set(arrowRef.current, { y: 20, opacity: 0 });
    
    // Animation au hover
    buttonRef.current?.addEventListener('mouseenter', () => {
      gsap.to(overlayRef.current, { width: '100%', duration: 0.5, ease: 'power2.inOut' });
      gsap.to(textRef.current, { color: 'black', duration: 0.3, delay: 0.2 });
      gsap.to(arrowRef.current, { y: 0, opacity: 1, duration: 0.4, delay: 0.1 });
    });

    // Animation au hover out
    buttonRef.current?.addEventListener('mouseleave', () => {
      gsap.to(overlayRef.current, { width: 0, duration: 0.5, ease: 'power2.inOut' });
      gsap.to(textRef.current, { color: 'white', duration: 0.3 });
      gsap.to(arrowRef.current, { y: 20, opacity: 0, duration: 0.3 });
    });

    return () => {
      // Nettoyage des écouteurs d'événements
      buttonRef.current?.removeEventListener('mouseenter', () => {});
      buttonRef.current?.removeEventListener('mouseleave', () => {});
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-64">
      <a 
        href="#" 
        ref={buttonRef}
        className="relative inline-block px-6 py-3 bg-black border-2 border-white overflow-hidden"
      >
        <div 
          ref={overlayRef} 
          className="absolute top-0 left-0 h-full bg-white z-0"
        ></div>
        
        <span 
          ref={textRef}
          className="relative z-10 text-white font-medium flex items-center"
        >
          Découvrir
          <span ref={arrowRef} className="ml-2 inline-flex">
            ↗
          </span>
        </span>
      </a>
    </div>
  );
};