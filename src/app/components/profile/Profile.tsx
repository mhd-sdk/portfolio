import { css, cx } from '@emotion/css';
import { useGSAP } from '@gsap/react';
import { JSX } from 'react';

export const Profile = (): JSX.Element => {
  useGSAP(() => {
    gsap.from('#section-2-header-text-1 .char-section-2', {
      opacity: 0.2,
      stagger: 3,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#section-2-header-text-1',
        start: 'top 80%',
        end: 'top 25%',
        scrub: 1,
        toggleActions: 'play play reverse reverse',
      },
    });

    gsap.from('#section-2-body-text-1', {
      opacity: 0.2,
      translateX: -20,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#my-damn-sexy-pic',
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
        toggleActions: 'play play reverse reverse',
      },
    });

    gsap.from('#my-damn-sexy-pic', {
      opacity: 0.2,
      translateX: 20,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#my-damn-sexy-pic',
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
        toggleActions: 'play play reverse reverse',
      },
    });

    gsap.from('#techsearch', {
      opacity: 0.2,
      translateY: 20,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '#my-damn-sexy-pic',
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
        toggleActions: 'play play reverse reverse',
      },
    });

    gsap.to('#thatsme', {
      yPercent: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: '#section-2',
        scrub: 1,
      },
    });
  }, []);
  return (
    <section id="section-2" className={cx(styles.section2)}>
      <div className={styles.section2HeroText}>
        <h2 id="section-2-header-text-1" className={cx('string-to-split-section2-h2', 'font-bold')}>
          Create, test, restart...
        </h2>
        <div>
          <p id="section-2-body-text-1" className={cx('string-to-split-section2-p', 'font-bold')}>
            I'm a code enthusiast, I love to create useful softwares with advanced features.
          </p>
          <p id="section-2-body-text-1" className={cx('string-to-split-section2-p', 'font-bold')}>
            Specialized in web development, I'm always looking for new challenges.
          </p>
          <p id="section-2-body-text-1" className={cx('string-to-split-section2-p', 'font-bold')}>
            I love to learn new technologies and improve my skills.
          </p>
        </div>
        <div>
          <p
            id="section-2-body-text-1"
            className={cx(
              'string-to-split-section2-p',
              'font-bold',
              css`
                margin-bottom: 20px;
              `
            )}
          >
            Here are some of the technologies I like to work with:
          </p>
          <div id="techsearch">{/* <TechnoSearch /> */}</div>
        </div>
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <div id="my-damn-sexy-pic">
          <img src="/picture.png" alt="" className={styles.image} />
        </div>
      </div>
    </section>
  );
};

const styles = {
  thatsme: css`
    position: relative;
    width: 200px;
    height: 80px;
    right: 0px;
    align-self: flex-end;
  `,

  section2HeroText: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
  section2: css`
    width: 100%;
    height: 100vh;
    padding: 100px 150px 0px 150px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 50px;
  `,
  image: css`
    width: 400px;
    object-fit: cover;
    height: 600px;
    border-radius: 10px;
  `,
};
