import { Button } from '@/components/primitives/Button';
import { FAIcons } from '@/helpers/FAIcons';
import { IBlogDetailPage } from '@/lib/generated';
import { StylingOptions } from '@/lib/types';
import { cn } from '@/utils/cn';

export const BlogDetailContentBanner = ({
  blog_data,
}: {
  blog_data: IBlogDetailPage['blog_data'];
}) => {
  return (
    <div
      style={
        {
          backgroundColor:
            blog_data?.content_banner?.banner_styling_options?.background_color?.dropdown,
          color: blog_data?.content_banner?.banner_styling_options?.text_color?.dropdown,
        } as React.CSSProperties
      }
      className={cn('p-5 md:p-13 flex flex-col items-center justify-center text-center gap-5')}
    >
      <h3 className={cn('uppercase font-extrabold leading-10 text-4xl')}>
        {blog_data?.content_banner?.banner_title}
      </h3>
      <p className={cn('uppercase font-light leading-10 text-xl mb-0')}>
        {blog_data?.content_banner?.banner_description}
      </p>
      <Button
        target={blog_data?.content_banner?.banner_button?.open_in_new_window ? '_blank' : '_self'}
        styling_options={
          blog_data?.content_banner?.banner_button?.styling_options as StylingOptions
        }
        href={blog_data?.content_banner?.banner_button?.link?.href}
        className="flex gap-2.5 justify-center items-center"
      >
        {blog_data?.content_banner?.banner_button?.link?.title}
        {blog_data?.content_banner?.banner_button?.font_awesome_icon_code && (
          <FAIcons iconCode={blog_data?.content_banner?.banner_button?.font_awesome_icon_code} />
        )}
      </Button>
    </div>
  );
};
