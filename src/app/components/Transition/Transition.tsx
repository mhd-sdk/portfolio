'use client';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import './styles.css';
gsap.registerPlugin(TextPlugin);

export const Transition = () => {
  const pathname = usePathname();
  const textRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const getTransitionTitle = () => {
    switch (pathname) {
      case '/':
        return 'Home';
      case '/projects':
        return 'Projects';
      case '/contact':
        return 'Contact';
      default:
        return 'Home';
    }
  };

  useEffect(() => {
    if (textRef.current && cursorRef.current) {
      const cursor = cursorRef.current;
      const text = textRef.current;

      gsap.fromTo(cursor, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, repeat: -1, ease: 'steps(1)' });
      gsap.to(text, {
        text: getTransitionTitle(),
        duration: 1,
        delay: 1,
        ease: 'none',
        onUpdate: () => {
          text.appendChild(cursor);
        },
      });
    }

    const tl = gsap.timeline();
    void tl
      .to('.privacy', {
        display: 'block',
        duration: 0,
      })
      .to('#privacy-content', {
        opacity: 1,
        duration: 1,
        delay: 0,
        ease: 'power4.inOut',
      })
      .to('.transition-span', {
        opacity: 0,
        y: '100%',
        duration: 1,
        delay: 2.5,
        ease: 'power4.inOut',
      })
      .to('.panel', {
        y: '-100%',
        duration: 1.2,
        stagger: 0.1, // Stagger effect between each panel
        ease: 'power4.inOut',
        delay: -1,
      })
      .to('.privacy', {
        display: 'none',
        duration: 0,
      });
  }, [pathname]);

  return (
    <div className="privacy">
      <div className="panels-container">
        <div className="panel "></div>
        <div className="panel "></div>
        <div className="panel "></div>
        <div className="panel "></div>
      </div>

      <div id="privacy-content">
        <span ref={textRef} className="transition-span"></span>
        <span ref={cursorRef} className="transition-span">
          |
        </span>
      </div>
    </div>
  );
};
