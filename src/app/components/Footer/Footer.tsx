import React from 'react';
import { Link } from '../Link/Link';
import { LinkVariant } from '../Link/LinkVariant';

export const Footer: React.FC = () => {
  return (
    <footer className="h-[20vh] w-full flex flex-col items-center justify-center bg-[var(--fg)] text-white">
      <nav className="mb-4">
        <LinkVariant text="Home" href="/" />
        <Link text="Home" href="/projects" />
        <Link text="Home" href="/contact" />
      </nav>
      <p className="text-center">© {new Date().getFullYear()} Mehdi Seddik. All rights reserved.</p>
    </footer>
  );
};
