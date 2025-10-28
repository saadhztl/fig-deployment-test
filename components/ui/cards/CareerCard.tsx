import SvgIcon from '@/helpers/SvgIcon';
import { Button } from '../../primitives/Button';
import { JobType } from '@/lib/types';
import { cn } from '@/utils/cn';
import { IDictionaryItems } from '@/lib/generated';

export const CareerCard = ({
  jobLocation,
  title,
  jobId,
  labels,
}: Pick<JobType, 'jobLocation' | 'title' | 'jobId'> & { labels: Partial<IDictionaryItems> }) => {
  return (
    <div className={cn('px-8 py-10', 'flex flex-col gap-6', 'border border-white bg-dark')}>
      {/* Header Section */}
      <div className={cn('flex flex-col gap-3')}>
        <h1 className={cn('text-2xl font-semibold', 'text-light uppercase')}>{jobLocation.name}</h1>
        <h3 className={cn('text-3xl font-bold', 'uppercase')}>{title}</h3>
      </div>

      {/* Location Section */}
      <div>
        <p className="text-lg">
          {jobLocation.address}, {jobLocation.city}
        </p>
      </div>

      {/* CTA Button Section */}
      <div>
        <Button
          href={`/careers?jobId=${jobId}`}
          className={cn('bg-light-black w-full', 'group-hover hover:text-light', 'border-0 px-0')}
        >
          <div className={cn('flex justify-between items-center')}>
            <p className="text-xl font-semibold">{labels.see_more_text}</p>
            <SvgIcon
              viewBox="0 0 512 512"
              icon="arrow-right"
              className={cn('w-6 h-6', 'hover:fill-light')}
            />
          </div>
        </Button>
      </div>
    </div>
  );
};
