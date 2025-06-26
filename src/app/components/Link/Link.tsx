import gsap from 'gsap'; // Importation statique de GSAP
import { AnchorHTMLAttributes, useEffect, useRef } from 'react';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  onClick?: () => void;
  text: string;
  inverted?: boolean;
}

export const Link = ({ href, text, onClick, inverted = false, ...restProps }: Props) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const button = buttonRef.current;

    // Définir les couleurs selon le mode inverted
    const initialTextColor = inverted ? 'var(--bg)' : 'var(--text)';
    const hoverTextColor = inverted ? 'var(--text)' : 'var(--bg)';

    // Configuration initiale
    gsap.set(overlayRef.current, { width: 0 });
    gsap.set(arrowRef.current, { y: 20, opacity: 0 });
    gsap.set(textRef.current, { color: initialTextColor });

    // Animation au hover
    const handleMouseEnter = () => {
      gsap.to(overlayRef.current, { width: '100%', duration: 0.2, ease: 'power2.inOut' });
      gsap.to(textRef.current, { color: hoverTextColor, duration: 0.1 });
      gsap.to(arrowRef.current, { y: 0, opacity: 1, duration: 0.1 });
    };

    // Animation au hover out
    const handleMouseLeave = () => {
      gsap.to(overlayRef.current, { width: 0, duration: 0.2, ease: 'power2.inOut' });
      gsap.to(textRef.current, { color: initialTextColor, duration: 0.1 });
      gsap.to(arrowRef.current, { y: 20, opacity: 0, duration: 0.1 });
    };

    button?.addEventListener('mouseenter', handleMouseEnter);
    button?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (!button) return;
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [inverted]); // Ajouter inverted aux dépendances

  return (
    <div ref={buttonRef} className="flex cursor-pointer">
      <a
        href={href}
        ref={anchorRef}
        onClick={(e) => {
          if (restProps.download === undefined) {
            e.preventDefault();
          }
          onClick?.();
        }}
        className={`relative flex justify-center items-center px-4 py-2 ${inverted ? 'text-bg' : 'text-fg'}`}
        {...restProps}
      >
        <div ref={overlayRef} className={`absolute inset-0 ${inverted ? 'bg-fg' : 'bg-current'}`}></div>
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
