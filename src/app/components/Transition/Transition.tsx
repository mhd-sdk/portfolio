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
        return 'Mehdi';
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
      .to('#privacy-content', {
        opacity: 1,
        duration: 1,
        delay: 0,
        ease: 'power4.inOut',
      })
      .to('.privacy', {
        x: '100vw',
        duration: 1.2,
        delay: 2.5,
        ease: 'power4.inOut',
      })
      .to('#privacy-content', {
        opacity: 0,
        duration: 0,
        delay: 0,
        ease: 'power4.inOut',
      });
  }, [pathname]);

  return (
    <div className="privacy">
      <h1 id="privacy-content">
        <span ref={textRef} id="transition-span"></span>
        <span ref={cursorRef} id="transition-cursor">
          |
        </span>
      </h1>
    </div>
  );
};
