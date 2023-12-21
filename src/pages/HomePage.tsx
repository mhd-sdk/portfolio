import { useRef } from 'react';
import { css } from '@emotion/css';
import { navigateWithDelay } from './navigateWithDelay';
import { Navbar } from '@ui/Navbar/Navbar';
import { Transition } from './Transition';
import gsap from 'gsap';
import { theme } from '../dim-theme';

export const HomePage = () => {
  const privacyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleNavigate = (to: string) => {
    gsap.to(privacyRef.current, { display: 'block', duration: 0, delay: 0 })
    gsap.to(privacyRef.current, { x: '0vw', duration: 1, ease: 'power4.inOut' })
    navigateWithDelay(to);
  }

  return (
    <div className={css`overflow: hidden`}>
      <Navbar onNavigate={handleNavigate} />
      <Transition title="Mehdi Seddik" privacyRef={privacyRef} titleRef={titleRef} />
      <div className={styles.heroWrapper}>
        <h5>{"Hi, i'm Mehdi."}</h5>
        <h1 className="font-bold">A full stack {'<Software Engineer />'}</h1>
        <p className="text-base">I like working on complex projects involving challenges and innovative features</p>
      </div>
    </div>
  )
};

const styles = {
  heroWrapper: css`
    height: 100vh;
    padding: 100px 150px 50px 150px;
    display: flex;
    flex-direction: column;
  `,
  technologies: css`
    // take left space
    margin-top: 30px;
    flex: 1;
    background-color: ${theme['base-200']};
    border-radius: 10px;
    padding: 20px;
    `
}
