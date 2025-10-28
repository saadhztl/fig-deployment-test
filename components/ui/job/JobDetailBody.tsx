import { cn } from '@/utils/cn';
import { JobType } from '@/lib/types';
import { Container } from '@/components/primitives/Container';
import { RichText } from '@/components/primitives/RichText';
import { Button } from '@/components/primitives/Button';
import { IDictionaryItems } from '@/lib/generated';

interface JobDetailBodyProps {
  currentJob: JobType;
}

export const JobDetailBody = ({
  currentJob,
  labels,
}: JobDetailBodyProps & { labels: Partial<IDictionaryItems> }) => {
  return (
    <Container
      componentName="JobDetailBody"
      className="max-w-large-desktop mx-auto"
      tag="div"
      topPadded={true}
      bottomPadded={true}
    >
      <div className={cn('flex flex-col gap-14', 'text-white')}>
        <div>
          <h2 className={cn('text-[32px] leading-12', 'font-bold tracking-widest uppercase')}>
            {labels.description_text}
          </h2>
          <RichText content={currentJob?.description} parentClassName="richtext" />
        </div>
        <div>
          <h2 className={cn('text-[32px] leading-12', 'font-bold tracking-widest uppercase')}>
            {labels.location_text}
          </h2>
          <div className={cn('text-white text-lg', 'font-normal')}>
            {currentJob?.jobLocation.address}, {currentJob?.jobLocation.city}
            <br></br>
            {currentJob?.jobLocation.state}, {currentJob?.jobLocation.zip}
          </div>
        </div>
        {currentJob.salaryDescription && (
          <div>
            <h2 className={cn('text-[32px] leading-12', 'font-bold tracking-widest uppercase')}>
              {labels.salary_description_text}
            </h2>
            <p className="text-lg">{currentJob?.salaryDescription}</p>
          </div>
        )}
        {currentJob.jobTypes && (
          <div>
            <h2 className={cn('text-[32px] leading-12', 'font-bold tracking-widest uppercase')}>
              {labels.job_types_text}
            </h2>
            <p className="text-lg">{currentJob?.jobTypes}</p>
          </div>
        )}
        <div
          className={cn(
            'flex flex-col mobile:flex-row gap-5',
            'my-5 text-lg tracking-widest font-bold'
          )}
        >
          <Button
            className={cn(
              'bg-white hover:bg-transparent',
              'text-light-black hover:text-white',
              'py-3 px-8'
            )}
            href={currentJob?.applyUrl}
          >
            {labels.apply_now_text}
          </Button>
          <Button
            href="/careers"
            className={cn(
              'bg-transparent hover:bg-white',
              'text-white hover:text-light-black',
              'py-3 px-8'
            )}
          >
            {labels.go_back_to_careers_text}
          </Button>
        </div>
      </div>
    </Container>
  );
};
