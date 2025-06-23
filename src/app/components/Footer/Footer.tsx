'use client';
import { navigateWithDelay } from '@/app/utils/navigateWithDelay';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Link } from '../Link/Link';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  const isActive = (to: string) => pathname === to;

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
    <footer className="h-[20vh] p-8 w-full flex  justify-between bg-[var(--fg)]">
      <nav className="flex flex-col justify-start">
        {!isActive('/') && <Link text="Home" href="/" onClick={() => handleNavigate('/')} />}
        {!isActive('/projects') && <Link text="Projects" href="/projects" onClick={() => handleNavigate('/projects')} />}
        {!isActive('/blog') && <Link text="Blog" href="/blog" onClick={() => handleNavigate('/blog')} />}
      </nav>
      <p className="self-end text-center">© {new Date().getFullYear()} Mehdi Seddik. All rights reserved.</p>
    </footer>
  );
};
