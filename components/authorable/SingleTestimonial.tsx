import { IEventsDetailComponents } from '@/lib/generated';
import { Container } from '../primitives/Container';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { FAIcons } from '@/helpers/FAIcons';
import { getCSLPAttributes } from '@/lib/type-guards';

export const SingleTestimonial = ({
  background_image,
  testimonial_item,
  styling_options,
  $,
}: IEventsDetailComponents['single_testimonial']) => {
  return (
    <Container
      className="relative flex justify-center items-center py-20 -z-10"
      bottomPadded={!styling_options?.disable_bottom_spacing}
    >
      {background_image?.image?.url && (
        <Image
          src={background_image?.image?.url}
          alt={background_image?.image_alt_text || 'Single Testimonial Background Image'}
          fill
          quality={100}
          className="object-cover w-full h-full"
          {...getCSLPAttributes($?.background_image)}
        />
      )}
      <div
        className={cn(
          'flex flex-col p-10 border-2 border-white bg-light-black/80 text-white',
          'max-w-[600px] mx-auto'
        )}
        style={{ backdropFilter: 'blur(4px)' }}
      >
        <div className="mb-2.5">
          {typeof testimonial_item?.rating === 'number' && (
            <div
              className="flex items-center gap-2"
              style={{ color: styling_options?.theme_color?.dropdown } as React.CSSProperties}
              {...getCSLPAttributes($?.testimonial_item)}
            >
              {Array.from({ length: testimonial_item.rating }, (_, i) => (
                <FAIcons key={i} iconCode="fa-solid fa-star" />
              ))}
            </div>
          )}
        </div>

        {testimonial_item?.content && (
          <div className="text-lg mb-4" {...getCSLPAttributes($?.testimonial_item)}>
            {testimonial_item.content}
          </div>
        )}

        {testimonial_item?.footer_note && (
          <h3
            className={cn('text-[40px] leading-[60px] uppercase tracking-[2px] font-semibold')}
            style={
              {
                textShadow: `0 0 4px ${styling_options?.theme_color?.dropdown}`,
                color: styling_options?.theme_color?.dropdown,
              } as React.CSSProperties
            }
            {...getCSLPAttributes($?.testimonial_item)}
          >
            {testimonial_item.footer_note}
          </h3>
        )}

        {testimonial_item?.author && (
          <div
            className="w-full text-right uppercase text-lg"
            {...getCSLPAttributes($?.testimonial_item)}
          >
            - {testimonial_item.author}
          </div>
        )}
      </div>
    </Container>
  );
};
