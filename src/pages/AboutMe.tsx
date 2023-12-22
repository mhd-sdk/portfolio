import { useRef } from 'react';
import { css } from '@emotion/css';
import { navigateWithDelay } from './navigateWithDelay';
import { Navbar } from '@ui/Navbar/Navbar';
import { Transition } from './Transition';
import gsap from 'gsap';
import { theme } from '../dim-theme';
import image from '../../public/picture.png';

export const AboutMe = () => {
  const privacyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleNavigate = (to: string) => {
    gsap.to(privacyRef.current, { display: 'block', duration: 0, delay: 0 });
    gsap.to(privacyRef.current, {
      x: '0vw',
      duration: 1,
      ease: 'power4.inOut'
    });
    navigateWithDelay(to);
  };

  return (
    <>
      <div>
        <Navbar onNavigate={handleNavigate} />

        <section className={styles.section1}>
          <h5 className={css``}>{"Hi, i'm Mehdi."}</h5>
          <h1 className="font-bold">A full stack developer</h1>
        </section>

        <section className={styles.section2}>
          <h1 className="font-bold">
            I like working on complex projects involving challenges and
            innovative features
          </h1>
          <div
            className={css`
              display: flex;
              flex-direction: row;
              gap: 20px;
              padding: 50px 0px 0px 0px;
            `}
          >
            <img src={image} alt="" className={styles.image} />
            <div>
              <ol className="relative border-s border-gray-200 dark:border-gray-700">
                <li className="mb-10 ms-4">
                  <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    February 2022
                  </time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Application UI code in Tailwind CSS
                  </h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    Get access to over 20+ pages including a dashboard layout,
                    charts, kanban board, calendar, and pre-order E-commerce &
                    Marketing pages.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    Learn more{' '}
                    <svg
                      className="ms-2 h-3 w-3 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </li>
                <li className="mb-10 ms-4">
                  <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    March 2022
                  </time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Marketing UI design in Figma
                  </h3>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    All of the pages and components are first designed in Figma
                    and we keep a parity between the two versions even as we
                    update the project.
                  </p>
                </li>
                <li className="ms-4">
                  <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    April 2022
                  </time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    E-Commerce UI code in Tailwind CSS
                  </h3>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Get started with dozens of web components and interactive
                    elements built on top of Tailwind CSS.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </section>
        <section></section>
      </div>
      <Transition
        title="Mehdi Seddik"
        privacyRef={privacyRef}
        titleRef={titleRef}
      />
    </>
  );
};

const styles = {
  section1: css`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // center content
    align-items: center;
    background-color: ${theme['base-200']};
  `,
  section2: css`
    height: 100vh;
    width: 100vw;
    padding: 100px 200px 0px 200px;
    display: flex;
    flex-direction: column;
    background-color: ${theme['base-200']};
  `,
  heroContent: css`
    display: flex;
    flex-direction: column;
  `,
  image: css`
    width: 400px;
    margin: 50 auto;
  `,
  heroWrapper: css`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
  `,
  technologies: css`
    // take left space
    margin-top: 30px;
    flex: 1;
    background-color: ${theme['base-200']};
    border-radius: 10px;
    padding: 20px;
  `
};
