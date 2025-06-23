import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { JSX } from 'react';
import photo from '../../../../public/my-picture.jpg';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import './custom-styles.css';

gsap.registerPlugin(ScrollTrigger);

export const About = (): JSX.Element => {
  return (
    <section id="about" className="w-full px-10 mt-10 text-justify">
      <SectionHeader title="About | #001" url={'#about'} />
      <div className="flex mt-5 text-[0.9rem] flex-row gap-8">
        <div className="flex  gap-8 pb-24 z-5">
          <Image src={photo.src} alt="Me" className="object-cover" width={450} height={500} priority />
          <div>
            <h5>The begining</h5>
            <p className=" ">
              I remember the first time i used a computer, it was my parent's old windows xp machine. i was fascinated by the way it worked. My first
              interaction with it was playing an offline game called "Pinball" and I was hooked. <br /> Later i discovered web browsers and the
              internet, and I got my ass playing flash games all day long. Club pinguin, Blablaland, Fancy pants, bartender the right mix, Electricman
              2... I can't count the number of hours i put into these games
              <br /> At the time i saw computers as a way of entertainment only, i was always looking for new games to play, new series to watch
              (Started watching animes to, my first probably were naruto and Sword Art Online). One day, my dad gave me the old laptop of my older
              sister, it was a windows 7 laptop, i can remember it has barely 4gb of ram, but was enough to do my stuff at the time, thatś when i
              started geting an interest for other usages of my computer.
              <br />
              <h5>Using computer for more than games</h5>I discovered the world of computer science when i wanted to make my own Minecraft server, i
              had no money to host one on the cloud, so i downloaded the .jar file and figured out how to launch it on my laptop, thus hosting the
              server on the same machine i was playing. Forwarding my ports was not an option as i had not the password to my wifi admin dashboard so
              i used to invite my friends via hamachi, heck i learnt so much thanks to this. This easy was some of the best times of my life. Later i
              tried to make my own mods but i was not able to do it, i didn't know how to code at the time.
              <br /> at the same time i was trying to understand how computers works, their components and the science behind them. I was always
              curious about how things worked, i remember taking apart my old toys to see how they worked, and trying to put them back together. I
              secretly disasembled and reassembled my parents computer, toyed with the BIOS settings and i even installed ubuntu on my laptop. Shit
              this was in 2014, i was 12 !
            </p>
            <h5>Getting professional</h5>
            <p className="">
              My first diploma was a scientific baccalaureate, i was always interested in science and technology, so it was a natural choice for me.
              After that i went to Uni, where i studied computer science and software engineering. I learned a lot about programming, algorithms, data
              structures, this was so fascinating to me. At the end of 2nd year i had the opportunity to do an internship at a software development
              company, where i worked on a project that involved building a web application using php symfony. Web development seemed easy, high
              impact and well paid, so i decided to specialize in it. the last 3 years of my studies were focused on web development, and i could
              apply what i learned in my stidies to my internship. I was able to build complex web applications using modern technologies like React
              typescript and golang. In france there is a system called "alternance" where you can work and study at the same time, my rythm was 2
              weeks at work and 1 week at school, this allowed me to gain a lot of experience and skills as well as a master&apos;s degree.
            </p>
            <p className=" ">
              Today I work as a Fullstack web developer at Fives CortX in France, where I contribute to the development of innovative software
              solutions for Industry 4.0. <br />
              <br /> I currently work as a Fullstack web developer at Fives CortX in France, where I contribute to the development of innovative
              software solutions for Industry 4.0. In my free time, I enjoy learning new technologies and honing my skills. I&apos;m always excited to
              explore emerging trends and advancements in the field.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

{
  /* <section id="about-section" className="w-full flex flex-row items-center relative gap-18 pl-36 pr-36 ">
<div className="absolute top-10 left-0 w-full h-[70%]  opacity-100 animated-bg"></div>
<div className="h-full flex flex-col gap-8 pt-24 pb-24 z-5">
  <div className="flex flex-row gap-8">
    <Image src={photo.src} alt="Me" className="object-cover" width={450} height={500} priority />
    <div>
      <h1 id="about-title-header" className="text-3xl m-0">
        About
      </h1>
      <p className=" mb-5">
        Passionate about software development and computer science, I specialize in building reactive and complex applications.
        <br /> I currently work as a Fullstack web developer at Fives CortX in France, where I contribute to the development of innovative
        software solutions for Industry 4.0. <br />
      </p>
      <p className=" mb-5">
        In my free time, I enjoy learning new technologies and honing my skills. As a tech enthusiast and lifelong learner, I&apos;m always
        excited to explore emerging trends and advancements in the field.
      </p>
      <Networks />
    </div>
 */
}
