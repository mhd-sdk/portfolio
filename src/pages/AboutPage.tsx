import { navigateWithDelay } from './navigateWithDelay';
import { useRef } from 'react';
import gsap from 'gsap';
import { Navbar } from '@ui/Navbar/Navbar';
import { Transition } from './Transition';

export const AboutPage = () => {
  const privacyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleNavigate = (to: string) => {
    gsap.to(privacyRef.current, { display: 'block', duration: 0, delay: 0 })
    gsap.to(privacyRef.current, { x: '0vw', duration: 1, ease: 'power4.inOut' })
    navigateWithDelay(to);
  }
  return (
    <div>
      <Navbar onNavigate={handleNavigate} />
      <Transition privacyRef={privacyRef} titleRef={titleRef} title={'About me'} />
    </div>
  )
};
