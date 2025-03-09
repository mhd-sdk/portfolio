'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { JSX } from 'react';
import './styles.css';

export const Landing = (): JSX.Element => {
  useGSAP(() => {
    gsap.fromTo(
      '.landing-text',
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'expo.out',
        delay: 5.5,
        stagger: { each: 0.3 },
      }
    );
  }, []);

  return (
    <section id="landing">
      <div className="reveal-overflow">
        <h5 className="landing-text">{"Hi, i'm Mehdi."}</h5>
      </div>
      <div className="reveal-overflow">
        <h1 id="typing-effect" className="landing-text">
          A software engineer
        </h1>
      </div>
    </section>
  );
};
