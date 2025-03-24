import gsap from 'gsap'; // Importation statique de GSAP
import { useEffect, useRef } from 'react';

interface Props {
  href?: string;
  onClick?: () => void;
  text: string;
}

export const LinkVariant = ({ href, text, onClick }: Props) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Configuration initiale
    gsap.set(overlayRef.current, { width: 0 });
    gsap.set(arrowRef.current, { y: 20, opacity: 0 });

    // Animation au hover
    buttonRef.current?.addEventListener('mouseenter', () => {
      gsap.to(overlayRef.current, { width: '100%', duration: 0.2, ease: 'power2.inOut' });
      gsap.to(textRef.current, { color: 'var(--fg)', duration: 0.2 });
      gsap.to(arrowRef.current, { y: 0, opacity: 1, duration: 0.2 });
    });

    // Animation au hover out
    buttonRef.current?.addEventListener('mouseleave', () => {
      gsap.to(overlayRef.current, { width: 0, duration: 0.2, ease: 'power2.inOut' });
      gsap.to(textRef.current, { color: 'var(--bg)', duration: 0.1, delay: 0.2 });
      gsap.to(arrowRef.current, { y: 20, opacity: 0, duration: 0.2 });
    });

    return () => {
      // Nettoyage des écouteurs d'événements
      buttonRef.current?.removeEventListener('mouseenter', () => {});
      buttonRef.current?.removeEventListener('mouseleave', () => {});
    };
  }, []);

  return (
    <div className="flex justify-center items-center cursor-pointer">
      <a href={href} ref={buttonRef} onClick={onClick} className="relative flex justify-center items-center px-4 py-2">
        <div ref={overlayRef} className="absolute inset-0 bg-current"></div>
        <span ref={textRef} className="relative z-10 flex items-center">
          {text}
          <div ref={arrowRef} className="ml-2">
            →
          </div>
        </span>
      </a>
    </div>
  );
};
