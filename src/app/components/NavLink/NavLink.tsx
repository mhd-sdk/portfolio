'use client';
import { JSX, useEffect, useRef } from 'react';
import './styles.css';

interface Props {
  id?: string;
  className?: string;
  href: string;
  text: string;
  isActive: boolean;
  onNavigate?: () => void;
  invertColor?: boolean;
  blank?: boolean;
}

export const NavLink = ({ href, onNavigate, text, isActive, invertColor, className, blank }: Props): JSX.Element => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const handleNavigate = (to: string) => {
    if (window.location.pathname === to) {
      return;
    }
    onNavigate?.();
  };

  useEffect(() => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const link = linkRef.current;

    if (link) {
      // Créer des spans pour chaque lettre
      const originalText = text;
      link.innerHTML = originalText
        .split('')
        .map((letter, index) => `<span data-letter="${letter}" data-index="${index}" style="display: inline-block;">${letter}</span>`)
        .join('');

      // Ajouter les événements sur chaque span
      const spans = link.querySelectorAll('span');

      spans.forEach((span) => {
        let interval: NodeJS.Timeout;

        span.addEventListener('mouseenter', () => {
          clearInterval(interval);

          // Animation continue tant qu'on survole
          interval = setInterval(() => {
            span.textContent = letters[Math.floor(Math.random() * 26)];
          }, 50);
        });

        span.addEventListener('mouseleave', () => {
          clearInterval(interval);
          const originalLetter = span.getAttribute('data-letter') || '';
          let iteration = 0;

          // Animation de transition qui ralentit progressivement
          interval = setInterval(() => {
            if (iteration >= 150) {
              span.textContent = originalLetter;
              clearInterval(interval);
            } else {
              span.textContent = letters[Math.floor(Math.random() * 26)];
            }
            iteration++;
          }, 5);
        });
      });
    }

    return () => {
      // Nettoyage des intervals
      const spans = link?.querySelectorAll('span');
      spans?.forEach((span) => {
        span.removeEventListener('mouseenter', () => {});
        span.removeEventListener('mouseleave', () => {});
      });
    };
  }, [text]);

  return (
    <a
      href={href}
      ref={linkRef}
      onClick={(e) => {
        if (onNavigate == undefined) {
          return;
        }
        e.preventDefault();
        handleNavigate(href);
      }}
      className={(isActive ? 'active-navlink ' : 'inactive-navlink ') + className + (invertColor ? ` text-[var(--bg)]!` : '')}
      target={blank ? '_blank' : undefined}
    ></a>
  );
};
