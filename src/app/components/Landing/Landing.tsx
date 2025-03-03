'use client';
import { useGSAP } from '@gsap/react';
import anime from 'animejs';
import { JSX } from 'react';
import './styles.css';

export const Landing = (): JSX.Element => {
  useGSAP(() => {
    // gsap.from('.split-landing', {
    //   y: 100,
    //   stagger: 0.5,
    //   delay: 2.5,
    //   duration: 5,
    //   ease: 'power4.inOut',
    // });
    // // avoid ssr flicker
    // gsap.to('#landing', {
    //   duration: 1,
    //   ease: 'power4.inOut',
    //   opacity: 1,
    // });

    anime.timeline({ loop: false }).add({
      targets: '.split-landing',
      opacity: [0, 1],
      translateZ: 0,
      translateY: [100, 0],
      easing: 'easeOutExpo',
      duration: 2000,
      delay: anime.stagger(300, { start: 5000 }),
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
