import { JSX, useEffect, useRef } from 'react';
import './styles.css';
interface Props {
  href: string;
  text: string;
  isActive: boolean;
  onNavigate: () => void;
}

export const NavLink = ({ href, onNavigate, text, isActive }: Props): JSX.Element => {
  const linkRef = useRef<HTMLAnchorElement | null>(null); // Utilisation de useRef pour cibler le lien spécifique
  // Fonction pour gérer la navigation
  const handleNavigate = (to: string) => {
    if (window.location.pathname === to) {
      return;
    }
    onNavigate();
  };
  useEffect(() => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let interval: NodeJS.Timeout;

    const link = linkRef.current;

    if (link) {
      link.onmouseover = (ev: MouseEvent) => {
        let iteration = 0;

        clearInterval(interval);

        // Démarre l'animation sur le texte du lien
        interval = setInterval(() => {
          if (ev.target instanceof HTMLElement) {
            ev.target.innerText = ev.target.innerText
              .split('')
              .map((letter: string, index: number) => {
                if (index < iteration) {
                  const target = ev.target as HTMLElement;
                  return target && target.dataset.value ? target.dataset.value[index] : letter;
                }

                return letters[Math.floor(Math.random() * 26)];
              })
              .join('');

            if (iteration >= ev.target.dataset.value!.length) {
              clearInterval(interval);
            }
          }

          iteration += 1 / 3;
        }, 20);
      };
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <a
      href={href}
      ref={linkRef}
      data-value={text}
      onClick={(e) => {
        e.preventDefault();
        handleNavigate(href);
      }}
      className={isActive ? 'active-navlink' : ''}
    >
      {text}
    </a>
  );
};
