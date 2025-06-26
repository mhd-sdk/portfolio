'use client';

import { CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: ReactNode;
}
export const ResumeCard = ({ title, subtitle, period, description }: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <>
      <Link href={`#${title}`} className="block cursor-pointer py-1 px-4 mt-3 bg-[var(--bg2)]" onClick={handleClick}>
        <div className="flex overflow-hidden">
          <div className="flex-grow text-[var(--text)] items-center flex-col group">
            <CardHeader className="mb-2">
              <div className="flex items-center justify-between gap-x-2 text-base">
                <div className="inline-flex items-center justify-center leading-none">
                  {title}
                  <div
                    className={cn(
                      'text-xl translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:opacity-100',
                      isExpanded ? 'rotate-90' : 'rotate-0'
                    )}
                  >
                    {'>'}
                  </div>
                </div>
                <div className="text-xs sm:text-sm tabular-nums text-right">{period}</div>
              </div>
              {subtitle && <div className="text-xs">{subtitle}</div>}
            </CardHeader>
          </div>
        </div>
      </Link>
      <AnimatePresence>
        {description && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className=" text-xs pl-7 sm:text-sm bg-[var(--bg)]"
          >
            <section id="title">{description}</section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
