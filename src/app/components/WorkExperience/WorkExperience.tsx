import { JSX } from 'react';
import { ResumeCard } from '../ResumeCard/ResumeCard';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { workData } from './data';

export const Experience = (): JSX.Element => {
  return (
    <section id="workxp" className="mt-20 px-10 w-full relative ">
      <SectionHeader title="Work experience | #002" url="#workxp" />
      <div className="flex min-h-0 flex-col w-full relative ">
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
