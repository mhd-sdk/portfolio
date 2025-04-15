import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { JSX } from 'react';
import './custom-styles.css';
import photo from '../../../../public/my-picture.jpg';
import Image from 'next/image';
import { Networks } from '../Networks/Networks';

gsap.registerPlugin(ScrollTrigger);

export const About = (): JSX.Element => {
  return (
    <section id="about-section" className="w-full flex flex-row items-center relative gap-18 pl-36 pr-36 ">
      <div className="absolute top-10 left-0 w-full h-[70%]  opacity-100 animated-bg"></div>
      <div className="h-full flex flex-col gap-8 pt-24 pb-24 z-5">
        <div className="flex flex-row gap-8">
          <Image src={photo.src} alt="Me" className="object-cover" width={500} height={500} priority />
          <div>
            <h1 id="about-title-header" className="text-3xl m-0">
              About
            </h1>
            <p className="text-[1rem] leading-[1.6] mb-5">
              Passionate about software development and computer science, I specialize in building reactive and high-performance applications.
              <br /> I currently work as a Fullstack Developer at Fives CortX in France, where I contribute to the development of an innovative
              software solutions for Industry 4.0. <br />
            </p>
            <p className="text-[1rem] leading-[1.6] mb-5">
              In my free time, I enjoy learning new technologies and honing my skills. As a tech enthusiast and lifelong learner, I&apos;m always
              excited to explore emerging trends and advancements in the field.
            </p>
            <Networks />
          </div>
        </div>
      </div>
    </section>
  );
};
