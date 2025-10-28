import { IBlogDetailPage } from '@/lib/generated';
import { cn } from '@/utils/cn';

export const BlogDetailBanner = ({
  title,
  blog_data,
}: {
  title: string;
  blog_data: IBlogDetailPage['blog_data'];
}) => {
  return (
    <div
      className={cn(
        'relative',
        'w-full',
        'h-full',
        'min-h-100',
        'border-b-4',
        'border-light',
        'bg-cover',
        'bg-no-repeapt',
        'bg-center'
      )}
      style={{
        backgroundImage: `url("${blog_data?.blog_detail_hero_banner_image?.image?.url}")`,
      }}
    >
      <div className="w-full bg-black/30 ">
        <div
          className={cn(
            'mx-auto',
            'relative',
            'h-full',
            'w-full',
            'min-h-100',
            'max-w-screen-large-desktop',
            'px-4',
            'tablet:px-6'
          )}
        >
          <div
            className={cn(
              'absolute',
              'top-1/2',
              'left-0',
              'z-10',
              'text-white',
              'text-5xl',
              'text-shadow-2xs'
            )}
          >
            <h1
              className={cn(
                'text-white',
                'text-6xl',
                'font-extrabold',
                'uppercase',
                'mx-auto',
                'max-w-max',
                '-translate-y-1/2',
                '[&_span]:lowercase'
              )}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
