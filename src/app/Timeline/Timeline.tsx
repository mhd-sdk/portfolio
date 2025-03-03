import { css, cx } from '@emotion/css';
import { gsap } from 'gsap';

import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
export const Timeline = (): JSX.Element => {
  useGSAP(() => {
    // Horizontal scroll section with GSAP ScrollTrigger & Locomotive Scroll
    const sections = document.querySelectorAll('.step');
    const container = document.querySelector('.side-scroll-container');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: true,
      },
    });

    tl.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
    });

    // animate h3 in each section, from 0 to 1 opacity while scrolling
    sections.forEach((section, i) => {
      gsap.to(section.querySelector('h3'), {
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        opacity: 1,
      });
    });
  }, []);

  return (
    <section className={cx('timeline-section', styles.section)}>
      <div className={cx(styles.scrollWrapper, 'side-scroll-container')}>
        <div className={cx('step', styles.step)}>
          <p>Started working as a software engineer at a company in Tokyo.</p>
          <h3>2021</h3>
        </div>
        <div className={cx('step', styles.step)}>
          <p>Started working as a software engineer at a company in Tokyo.</p>
          <h3>2021</h3>
        </div>
        <div className={cx('step', styles.step)}>
          <p>Started working as a software engineer at a company in Tokyo.</p>
          <h3>2021</h3>
        </div>
      </div>
    </section>
  );
};

const styles = {
  scrollWrapper: css`
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    width: 300%;
  `,
  section: css`
    width: 100%;
    height: 300vh;
    overflow: hidden;
  `,
  step: css`
    height: 100vh;
    width: 100vw;
    white-space: nowrap;
    padding: 100px 200px 0px 200px;
    display: flex;
    flex-direction: column;
  `,
};
