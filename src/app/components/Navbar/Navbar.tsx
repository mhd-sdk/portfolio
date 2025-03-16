import { navigateWithDelay } from '@/app/utils/navigateWithDelay';
import { useGSAP } from '@gsap/react';
import anime from 'animejs';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { JSX } from 'react';
import { NavLink } from '../NavLink/NavLink';
import './styles.css';

interface Props { }

export const Navbar = ({ }: Props): JSX.Element => {
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
        stagger: 0.1, // Stagger effect between each panel
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
  return (
    <nav style={{ zIndex: 1 }} id="navbar">
      <ul id="navbar-list">
        <NavLink isActive={isActive('/')} href="Home" onNavigate={() => handleNavigate('/')} text="Home" />
        <div className="link-divider animate-nav">/</div>
        <NavLink isActive={isActive('/projects')} href="Projects" onNavigate={() => handleNavigate('/projects')} text="Projects" />
        <div className="link-divider animate-nav">/</div>
        <NavLink isActive={isActive('/contact')} href="Contact" onNavigate={() => handleNavigate('/contact')} text="Contact" />
      </ul>
    </nav>
  );
};
