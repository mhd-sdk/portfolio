'use client';
import { navigateWithDelay } from '@/app/utils/navigateWithDelay';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { JSX, useEffect, useRef } from 'react';
import { NavLink } from '../NavLink/NavLink';
import './styles.css';
gsap.registerPlugin(TextPlugin);

export const Navbar = (): JSX.Element => {
  const pathname = usePathname();
  const textRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const getTransitionTitle = () => {
      switch (pathname) {
        case '/':
          return 'Home';
        case '/projects':
          return 'Projects';
        case '/blog':
          return 'Blog';
        default:
          return 'Home';
      }
    };
    if (textRef.current && cursorRef.current) {
      const cursor = cursorRef.current;
      const text = textRef.current;

      gsap.fromTo(cursor, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, repeat: -1, ease: 'steps(1)' });
      gsap.to(text, {
        text: getTransitionTitle(),
        duration: 1,
        delay: 1,
        ease: 'none',
        onUpdate: () => {
          text.appendChild(cursor);
        },
      });
    }

    const tl = gsap.timeline();
    void tl
      .to('#privacy-content', {
        opacity: 1,
        duration: 1,
        delay: 0,
        ease: 'power4.inOut',
      })
      .to('.transition-span', {
        opacity: 0,
        y: '100%',
        duration: 1.5,
        delay: 2,
        ease: 'power4.inOut',
      })
      .to('.privacy', {
        display: 'none',
        duration: 0,
      });
  }, [pathname]);

  useEffect(() => {
    const currentScroll = window.scrollY;
    const navbarWrapperTL = gsap.timeline();

    void navbarWrapperTL
      .to('#navbar', {
        marginTop: '1.6rem',
        marginLeft: '120px',
        marginRight: '120px',
        height: 'auto',
        duration: 3,
        ease: 'power4.inOut',
        delay: 3,
        onUpdate: () => {
          window.scrollTo(0, currentScroll);
        },
      })
      .to('.navbar-animate', {
        display: 'block',
        duration: 0,
      })
      .fromTo(
        '.navbar-animate',
        {
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 3,
          ease: 'expo.out',
          stagger: {
            each: 0.3,
            from: 'start',
          },
        }
      );
  }, []);

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

  const { theme, setTheme } = useTheme();

  return (
    <nav id="navbar" className="py-1 px-4 bg-[var(--text)] z-100 flex bg-fg justify-center justify-between gap-4 h-screen top-0 sticky">
      <div className="flex-1 overflow-hidden bg-[var(--text)] ">
        {theme === 'dark' ? (
          <button className="flex text-[var(--bg)] navbar-animate opacity-0" onClick={() => setTheme('light')}>
            Light
          </button>
        ) : (
          <button className="flex text-[var(--bg)] navbar-animate opacity-0" onClick={() => setTheme('dark')}>
            Dark
          </button>
        )}
      </div>
      <ul id="navbar-list" className="flex gap-4 items-center overflow-hidden">
        <div className="flex gap-4 items-center overflow-hidden">
          <NavLink
            invertColor={true}
            className="navbar-animate hidden"
            isActive={isActive('/')}
            href="Home"
            onNavigate={() => handleNavigate('/')}
            text="Home"
          />
          <NavLink
            invertColor={true}
            className="navbar-animate hidden"
            isActive={isActive('/projects')}
            href="Projects"
            onNavigate={() => handleNavigate('/projects')}
            text="Projects"
          />
          <NavLink
            invertColor={true}
            className="navbar-animate hidden"
            isActive={isActive('/blog')}
            href="Blog"
            onNavigate={() => handleNavigate('/blog')}
            text="Blog"
          />
        </div>
      </ul>
      <div id="privacy-content">
        <span ref={textRef} className="transition-span text-[var(--bg)] text-4xl"></span>
        <span ref={cursorRef} className="transition-span text-[var(--bg)] text-4xl">
          |
        </span>
      </div>
    </nav>
    // </div>
  );
};
