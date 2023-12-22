import { useRef } from 'react';
import { navigateWithDelay } from './navigateWithDelay';
import { Navbar } from '@ui/Navbar/Navbar';
import { Transition } from './Transition';
import gsap from 'gsap';

export const Contact = () => {
  const privacyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleNavigate = (to: string) => {
    gsap.to(privacyRef.current, { display: 'block', duration: 0, delay: 0 })
    gsap.to(privacyRef.current, { x: '0vw', duration: 1, ease: 'power4.inOut' })
    navigateWithDelay(to);
  }

  return (
  <>
    <div>
      <Navbar onNavigate={handleNavigate} />
        <h5>{'Contact'}</h5>

    </div>
      <Transition title="Contact" privacyRef={privacyRef} titleRef={titleRef} />
  </>
  )
};
