'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';
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
export const ResumeCard = ({ logoUrl, altText, title, subtitle, href, badges, period, description }: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Link href={href || '#'} className="block cursor-pointer" onClick={handleClick}>
      <Card className="flex">
        <div className="flex-none">
          <Avatar className="border size-12 m-auto">
            <AvatarImage src={logoUrl} alt={altText} className="object-cover" />
            <AvatarFallback>{altText[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow ml-4 items-center flex-col group">
          <CardHeader className="mb-2">
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center leading-none">
                {title}
                {badges && (
                  <span className="inline-flex gap-x-1">
                    {badges.map((badge, index) => (
                      <Badge variant="secondary" className="align-middle text-xs" key={index}>
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}
                <div
                  className={cn(
                    'text-xl translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100',
                    isExpanded ? 'rotate-90' : 'rotate-0'
                  )}
                >
                  {'>'}
                </div>
              </h3>
              <div className="text-xs sm:text-sm tabular-nums text-right">{period}</div>
            </div>
            {subtitle && <div className="text-xs">{subtitle}</div>}
          </CardHeader>
          <AnimatePresence>
            {description && isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                exit={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className=" text-xs sm:text-sm"
              >
                {description}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </Link>
  );
};
