'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { JSX, useRef } from 'react';
import SplitType from 'split-type';
import './styles.css';

export const Landing = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (sectionRef.current) {
      new SplitType('#typing-effect', { types: 'chars', charClass: 'char-landing' });
      new SplitType('.reveal-overflow h5', { types: 'chars', charClass: 'char-landing' });
    }
    // Animation des lettres avec stagger
    gsap.fromTo(
      '.landing-text',
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 2.5,
        ease: 'expo.out',
        delay: 4,
        stagger: {
          each: 0.55,
          from: 'start',
        },
      }
    );
  }, []);

  return (
    <section id="landing" ref={sectionRef}>
      <div className="reveal-overflow">
        <h5 className="landing-text">Mehdi Seddik</h5>
      </div>
      <div className="reveal-overflow">
        <h1 id="typing-effect" className="landing-text">
          Software Developer
        </h1>
      </div>
    </section>
  );
};
