'use client';
import { navigateWithDelay } from '@/app/utils/navigateWithDelay';
import { useGSAP } from '@gsap/react';
import anime from 'animejs';
import gsap from 'gsap';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { JSX } from 'react';
import { NavLink } from '../NavLink/NavLink';
import { Moon } from '../Svg/Moon';
import { Sun } from '../Svg/Sun';

export const Navbar = (): JSX.Element => {
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

  useGSAP(() => {
    anime.timeline({ loop: false }).add({
      targets: '.animate-nav',
      opacity: [0, 1],
      translateZ: 0,
      translateY: [100, 0],
      easing: 'easeOutExpo',
      duration: 2500,
      delay: 4700,
    });
  }, []);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <nav id="navbar" className="absolute top-0 left-1/2 -translate-x-1/2 flex  justify-center justify-between gap-4 p-4 w-[1000px]">
        <div className="flex-1">
          {theme === 'dark' ? (
            <button onClick={() => setTheme('light')}>
              <Sun width={25} height={25} fill="var(--fg)" />
            </button>
          ) : (
            <button onClick={() => setTheme('dark')}>
              <Moon width={25} height={25} fill="var(--fg)" />
            </button>
          )}
        </div>
        <ul id="navbar-list" className="flex gap-2 items-center overflow-hidden">
          <NavLink isActive={isActive('/')} href="Home" onNavigate={() => handleNavigate('/')} text="Home" />
          <div className="h-4/5 !opacity-50 animate-nav">/</div>
          <NavLink isActive={isActive('/projects')} href="Projects" onNavigate={() => handleNavigate('/projects')} text="Projects" />
          <div className="h-4/5 !opacity-50 animate-nav">/</div>
          <NavLink isActive={isActive('/contact')} href="Contact" onNavigate={() => handleNavigate('/contact')} text="Contact" />
        </ul>
      </nav>
    </>
  );
};
