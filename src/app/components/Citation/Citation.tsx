import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const Citation: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current && sectionRef.current) {
      const splitText = new SplitType(textRef.current, { types: 'words' });
      const words = splitText.words;

      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: true,
          scrub: true,
        },
      });

      revealTl
        .from(words, {
          opacity: 0.2,
          stagger: 3,
          ease: 'power4.inOut',
        })
        .to({}, { duration: 5 });

      return () => {
        splitText.revert();
      };
    }
  }, []);

  return (
    <section ref={sectionRef} className="text-2xl font-bold p-4 text-9xl h-screen w-screen flex flex-row items-center relative pl-36 pr-36">
      <div ref={textRef}>
        Talk is cheap.
        <br /> Show me the Code.
      </div>
    </section>
  );
};

export default Citation;
