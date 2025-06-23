'use client';
import { navigateWithDelay } from '@/app/utils/navigateWithDelay';
import { useGSAP } from '@gsap/react';
import anime from 'animejs';
import gsap from 'gsap';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { JSX } from 'react';
import { NavLink } from '../NavLink/NavLink';

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
    <div className="header z-100 px-10 mt-6 sticky top-0">
      <nav id="navbar" className="py-1 px-4 bg-[var(--fg)] flex bg-fg justify-center justify-between gap-4 w-full sticky top-0">
        <div className="flex-1 overflow-hidden">
          {theme === 'dark' ? (
            <button className="flex animate-nav text-[var(--bg)]" onClick={() => setTheme('light')}>
              Light
            </button>
          ) : (
            <button className="flex animate-nav text-[var(--bg)]" onClick={() => setTheme('dark')}>
              Dark
            </button>
          )}
        </div>
        <ul id="navbar-list" className="flex gap-4 items-center overflow-hidden">
          <NavLink invertColor={true} isActive={isActive('/')} href="Home" onNavigate={() => handleNavigate('/')} text="Home" />
          <NavLink
            invertColor={true}
            isActive={isActive('/projects')}
            href="Projects"
            onNavigate={() => handleNavigate('/projects')}
            text="Projects"
          />
          <NavLink invertColor={true} isActive={isActive('/blog')} href="Blog" onNavigate={() => handleNavigate('/blog')} text="Blog" />
        </ul>
      </nav>
    </div>
  );
};
