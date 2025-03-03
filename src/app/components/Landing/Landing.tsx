'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { JSX } from 'react';
import SplitType from 'split-type';
import './styles.css';

export const Landing = (): JSX.Element => {
  useGSAP(() => {
    SplitType.create('.split-landing', {
      charClass: 'char-landing',
    });
    gsap.from('.char-landing', {
      y: 100,
      stagger: 0.05,
      delay: 1,
      duration: 3,
      ease: 'power4.inOut',
    });
    // avoid ssr flicker
    gsap.to('#landing', {
      duration: 1,
      ease: 'power4.inOut',
      opacity: 1,
    });
  }, []);

  return (
    <section id="landing">
      <div className="reveal-overflow">
        <h5 className="split-landing">{"Hi, i'm Mehdi."}</h5>
      </div>
      <div className="reveal-overflow">
        <h1 id="typing-effect" className="split-landing">
          A software engineer
        </h1>
      </div>
    </section>
  );
};
