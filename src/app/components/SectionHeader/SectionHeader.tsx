import { JSX } from 'react';

interface Props {
  title: string;
  url: string;
}

export const SectionHeader = ({ url, title }: Props): JSX.Element => {
  return (
    <h6>
      <a href={url} className="py-1 px-4 bg-[var(--fg)] text-[var(--bg)]! flex bg-fg justify-between gap-4 w-full sticky top-0">
        {title}
      </a>

      <div className="h-1 mt-0.5 px-4 bg-[var(--fg)] text-[var(--bg)]! flex bg-fg justify-between gap-4 w-full sticky top-0" />
    </h6>
  );
};
