'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { JSX, useRef } from 'react';
import SplitType from 'split-type';

export const Landing = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (sectionRef.current) {
      new SplitType('#typing-effect', { types: 'chars', charClass: 'char-landing' });
      new SplitType('.overflow-hidden h5', { types: 'chars', charClass: 'char-landing' });
    }

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
        stagger: {
          each: 0.55,
          from: 'start',
        },
      }
    );
  }, []);

  return (
    <section id="landing" ref={sectionRef} className="w-screen flex-col flex flex-1 items-center justify-center h-[90vh]">
      <div className="overflow-hidden">
        <h2 className="landing-text">Mehdi Seddik</h2>
      </div>
      <div className="overflow-hidden">
        <h1 id="typing-effect" className="landing-text font-bold text-8xl">
          SOFTWARE ENGINEER
        </h1>
      </div>
      {/* <div className="flex items-center justify-center gap-2 mt-5">
        <Image alt="" height={40} src={caution} />
        <p>Website under active development</p>
        <Image alt="" height={40} src={caution} />
      </div> */}
      <div className="mt-10">↓ See more ↓</div>
    </section>
  );
};
