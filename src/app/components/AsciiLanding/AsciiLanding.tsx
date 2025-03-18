import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const AsciiLanding: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (marqueeRef.current) {
      gsap.fromTo(marqueeRef.current, { x: '100%' }, { x: '-100%', duration: 5, repeat: -1, ease: 'linear' });
    }
  }, []);

  return (
    <div className="overflow-hidden w-full bg-black text-green-400 font-mono text-lg">
      <div ref={marqueeRef} className="whitespace-nowrap">
        {'<ASCII MARQUEE SCROLLING...>'.repeat(5)}
      </div>
    </div>
  );
};
