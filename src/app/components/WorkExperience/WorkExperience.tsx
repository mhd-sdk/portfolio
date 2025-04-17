import { JSX } from 'react';
import { ResumeCard } from '../ResumeCard/ResumeCard';
import { workData } from './data';

export const Experience = (): JSX.Element => {
  return (
    <section className="py-20 px-36 w-full h-[50vh] relative">
      <h1 id="about-title-header" className="text-3xl m-0 mb-10">
        Work experience
      </h1>
      <div className="flex min-h-0 flex-col gap-y-3 w-full relative gap-18">
        {workData.map((work) => (
          <ResumeCard
            key={work.company}
            logoUrl={work.logoUrl}
            altText={work.company}
            title={work.company}
            subtitle={work.title}
            href={work.href}
            badges={work.badges}
            period={`${work.start} - ${work.end ?? 'Present'}`}
            description={work.description}
          />
        ))}
      </div>
    </section>
  );
};
