import { usePathname } from 'next/navigation';
import { JSX } from 'react';
import { NavLink } from '../NavLink/NavLink';
import './styles.css';

interface Props {
  onNavigate: (to: string) => void;
}

export const Navbar = ({ onNavigate }: Props): JSX.Element => {
  const pathname = usePathname();

  const isActive = (to: string) => pathname === to;
  const handleNavigate = (to: string) => {
    if (isActive(to)) {
      return;
    }
    onNavigate(to);
  };

  return (
    <nav id="navbar">
      <ul id="navbar-list">
        <NavLink isActive={isActive('/')} href="Home" onNavigate={() => handleNavigate('/')} text="Home" />
        <div className="link-divider" />
        <NavLink isActive={isActive('/projects')} href="Projects" onNavigate={() => handleNavigate('/projects')} text="Projects" />
        <div className="link-divider" />
        <NavLink isActive={isActive('/contact')} href="Contact" onNavigate={() => handleNavigate('/contact')} text="Contact" />
      </ul>
    </nav>
  );
};
