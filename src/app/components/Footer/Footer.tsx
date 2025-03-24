import React from 'react';
import { Link } from '../Link/Link';
import { navigateWithDelay } from '@/app/utils/navigateWithDelay';

export const Footer: React.FC = () => {
  const handleNavigate = (to: string) => {
    if (isActive(to)) {
      return;
    }
    const tl = gsap.timeline();
    void tl
      .to('.privacy', {
        display: 'block',
        duration: 0,
      })
      .to('.panel', {
        y: '0%',
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.inOut',
      });
    navigateWithDelay(to);
  };
  return (
    <footer className="h-[20vh] p-8 w-full flex   justify-between bg-[var(--bg2)]">
      <nav className="flex flex-col w-100 justify-start">
        <Link text="Home" href="/" onClick={() => handleNavigate('/')} />
        <Link text="Projects" href="/projects" onClick={() => handleNavigate('/projects')} />
        <Link text="Contact" href="/contact" onClick={() => handleNavigate('/contact')} />
      </nav>
      <p className="self-end text-center">© {new Date().getFullYear()} Mehdi Seddik. All rights reserved.</p>
    </footer>
  );
};
