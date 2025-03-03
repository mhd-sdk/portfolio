import { faGithub, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { JSX } from 'react';
import './styles.css';

export const Networks = (): JSX.Element => {
  useGSAP(() => {
    gsap.from('.network-buttons', {
      y: 100,
      stagger: 0.055,
      delay: 1.5,
      duration: 3,
      ease: 'power4.inOut',
    });
  }, []);
  return (
    <div id="networks">
      <a className="network-buttons" href="https://www.linkedin.com/in/mehdi-seddik-841b341b9/" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
      <a className="network-buttons" href="https://www.instagram.com/bogoss.mhd_/" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a className="network-buttons" href="https://github.com/mhd-sdk" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </div>
  );
};
