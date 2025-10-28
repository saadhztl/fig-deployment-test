import { cn } from '@/utils/cn';
import { Container } from '../../primitives/Container';
import Image from 'next/image';
import { Button } from '../../primitives/Button';
import { JobType } from '@/lib/types';
import { IDictionaryItems } from '@/lib/generated';

export type JobDetailBannerProps = {
  currentJob: JobType;
};
export const JobDetailBanner = ({
  currentJob,
  labels,
}: JobDetailBannerProps & { labels: Partial<IDictionaryItems> }) => {
  return (
    <Container
      componentName="JobDetailBanner"
      className={cn('relative, w-full py-10 hero-overlay before:!border-light before:bg-dark/50')}
    >
      {labels.careers_detail_page_banner_image?.image?.url && (
        <Image
          src={labels.careers_detail_page_banner_image?.image?.url}
          alt={currentJob?.title}
          fill
          quality={100}
          className="object-cover"
          priority
        />
      )}
      <div className="relative z-10">
        <div
          className={cn('relative text-white px-5 md:px-10', 'flex justify-center items-center')}
        >
          <div className={cn('flex flex-col gap-5 justify-start items-start', 'z-20 w-full')}>
            <h3
              className={cn(
                'text-xl md:text-3xl',
                'font-extrabold tracking-widest uppercase',
                'text-light'
              )}
            >
              {currentJob?.jobLocation.name}
            </h3>

            <div
              className={cn(
                'flex flex-col md:flex-row justify-between w-full',
                'items-start md:items-center gap-5',
                'md:flex-wrap'
              )}
            >
              <h1
                className={cn(
                  'text-3xl md:text-7xl',
                  'tracking-wide font-black uppercase',
                  'break-all sm:break-keep'
                )}
              >
                {currentJob?.title}
              </h1>

              <Button
                href={currentJob?.applyUrl}
                className={cn(
                  'px-8 py-3',
                  'text-light-black font-extrabold tracking-widest text-lg bg-white hover:text-white hover:bg-transparent',
                  'w-full md:w-fit'
                )}
              >
                {labels.apply_now_text}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
