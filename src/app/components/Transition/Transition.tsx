import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './styles.css';
interface Props {
  title: string;
}
export const Transition = ({ title }: Props) => {
  useGSAP(() => {
    gsap
      .timeline()
      .to('.privacy', {
        x: '0vw',
        duration: 0,
        delay: 0,
        ease: 'power4.inOut',
      })
      .to('.privacy', {
        x: '100vw',
        duration: 1,
        delay: 1.5,
        ease: 'power4.inOut',
      })
      .to('.privacy', {
        x: '-100vw',
        duration: 0,
        delay: 0,
        ease: 'power4.inOut',
      });
  }, []);

  useGSAP(() => {
    gsap
      .timeline()
      .to('.privacy-content', {
        opacity: 0,
        y: '-50px',
        duration: 0,
        ease: 'power4.inOut',
        delay: 0,
      })
      .to('.privacy-content', {
        opacity: 1,
        y: '-0px',
        duration: 1,
        ease: 'power4.inOut',
        display: 'block',
      })
      .to('.privacy-content', {
        opacity: 0,
        y: '50px',
        duration: 1,
        ease: 'power4.inOut',
        display: 'none',
      });
  }, []);
  return (
    <div className="privacy">
      <h1 className="privacy-content">{title}</h1>
    </div>
  );
};
