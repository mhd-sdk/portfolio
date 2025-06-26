'use client';
import { navigateWithDelay } from '@/app/utils/navigateWithDelay';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import React from 'react';
import { NavLink } from '../NavLink/NavLink';
import { Networks } from '../Networks/Networks';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  const isActive = (to: string) => pathname === to;
  const handleNavigate = async (to: string) => {
    if (isActive(to)) {
      return;
    }
    const navbarWrapperTL = gsap.timeline();
    await void navbarWrapperTL.to('#navbar', {
      marginTop: '0rem',
      marginLeft: '0px',
      marginRight: '0px',
      height: '100vh',
      duration: 2,
      ease: 'power4.inOut',
    });

    const nb = gsap.timeline();
    await void nb.fromTo(
      '.navbar-animate',
      {
        y: 0,
      },
      {
        delay: 0.5,
        ease: 'expo.out',
        duration: 2,
        opacity: 0,
        y: -30,
        overwrite: 'auto',
      }
    );

    navigateWithDelay(to);
  };

  return (
    <footer className="h-[20vh] mx-30 flex justify-between bg-[var(--text)]">
      <nav className="flex p-4 w-full">
        <div className="flex flex-col">
          {!isActive('/home') && (
            <NavLink invertColor={true} isActive={isActive('/')} href="home" onNavigate={() => handleNavigate('/')} text="Home" />
          )}

          {!isActive('/projects') && (
            <NavLink
              invertColor={true}
              isActive={isActive('/projects')}
              href="projects"
              onNavigate={() => handleNavigate('/projects')}
              text="Projects"
            />
          )}
          {!isActive('/blog') && (
            <NavLink invertColor={true} isActive={isActive('/blog')} href="blog" onNavigate={() => handleNavigate('/blog')} text="Blog" />
          )}
          <p className="self-end text-[var(--bg)] mt-auto text-center">© {new Date().getFullYear()} Mehdi Seddik. All rights reserved.</p>
        </div>
        <Networks />
      </nav>
    </footer>
  );
};
