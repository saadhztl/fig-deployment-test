'use client';
import React from 'react';
import { JobType } from '@/lib/types';
import { JobDetailBanner } from '../custom-banners/JobDetailBanner';
import { JobDetailBody } from './JobDetailBody';
import { cn } from '@/utils/cn';
import { Button } from '@/components/primitives/Button';
import { useGlobalLabels } from '@/providers/GlobalLabelsProvider';

export const JobDetail = ({ currentJob }: { currentJob: JobType }) => {
  const { globalLabels } = useGlobalLabels();

  if (!currentJob) {
    return (
      <div
        className={cn(
          'flex flex-col justify-center items-center w-full',
          'text-white font-bold text-2xl',
          'my-5 gap-4'
        )}
      >
        <div>{globalLabels.no_jobs_found_label}</div>
        <Button
          href="/careers"
          className={cn(
            'bg-transparent hover:bg-white',
            'text-white hover:text-light-black',
            'text-lg'
          )}
        >
          {globalLabels.go_back_to_careers_text}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <JobDetailBanner currentJob={currentJob} labels={globalLabels} />
      <JobDetailBody currentJob={currentJob} labels={globalLabels} />
    </div>
  );
};
