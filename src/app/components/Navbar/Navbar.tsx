import { navigateWithDelay } from '@/app/utils/navigateWithDelay';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { JSX } from 'react';
import { NavLink } from '../NavLink/NavLink';
import './styles.css';

interface Props {}

export const Navbar = ({}: Props): JSX.Element => {
  const pathname = usePathname();

  const isActive = (to: string) => pathname === to;
  const handleNavigate = (to: string) => {
    if (isActive(to)) {
      return;
    }
    gsap.to('.privacy', { display: 'block', duration: 0, delay: 0 });
    gsap.to('.privacy', {
      x: '0vw',
      duration: 1,
      ease: 'power4.inOut',
    });
    navigateWithDelay(to);
  };

  return (
    <nav style={{ zIndex: 1 }} id="navbar">
      <ul id="navbar-list">
        <NavLink isActive={isActive('/')} href="Home" onNavigate={() => handleNavigate('/')} text="Home" />
        <div className="link-divider">/</div>
        <NavLink isActive={isActive('/projects')} href="Projects" onNavigate={() => handleNavigate('/projects')} text="Projects" />
        <div className="link-divider">/</div>
        <NavLink isActive={isActive('/contact')} href="Contact" onNavigate={() => handleNavigate('/contact')} text="Contact" />
      </ul>
    </nav>
  );
};
