import React from 'react';
import { FAIcons } from '@/helpers/FAIcons';
import { cn } from '@/utils/cn';
import { getCSLPAttributes } from '@/lib/type-guards';
import { CSLPFieldMapping } from '@/lib/generated';
export type TestimonialProps = {
  rating?: number | null;
  content?: string;
  author?: string;
  $?: {
    rating?: CSLPFieldMapping;
    content?: CSLPFieldMapping;
    author?: CSLPFieldMapping;
  };
};

export const Testimonial = ({ rating, content, author, $ }: TestimonialProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 items-start',
        'px-0 tablet:px-10 pb-5 tablet:pb-0 mb-5 tablet:mb-0',
        'border-b tablet:border-b-0 tablet:border-l border-[#626262]'
      )}
      {...getCSLPAttributes($?.rating)}
    >
      <div className="">
        {typeof rating === 'number' && (
          <div className="flex items-center gap-1">
            {Array.from({ length: rating }, (_, i) => (
              <FAIcons key={i} iconCode="fa-solid fa-star" className="text-[#FFF730]" />
            ))}
          </div>
        )}
      </div>
      <div className="text-base" {...getCSLPAttributes($?.content)}>
        {content}
      </div>
      <div className="w-full text-right" {...getCSLPAttributes($?.author)}>
        {author}
      </div>
    </div>
  );
};
