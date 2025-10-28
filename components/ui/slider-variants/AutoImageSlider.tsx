import Image from 'next/image';
import { cn } from '@/utils/cn';
import { ISlider } from '@/lib/generated';
import { Container } from '@/components/primitives/Container';

export const AutoImageSlider = ({
  slider_images,
  keep_gap_between_images,
  autoplay_sliding_duration,
  slider_styling_options,
}: ISlider) => {
  const calculatedParentWidth = slider_images?.image?.reduce(
    (acc, image) => acc + (image.width || 300),
    0
  );
  const duplicatedImages = Array.from({ length: 2 }, (_, index) => (
    <div
      key={`duplicate-${index}`}
      className={cn(
        'flex w-full h-full text-white',
        'animate-scroll basis-full shrink-0 grow-0',
        'will-change-transform overflow-hidden'
      )}
      style={{
        animationDuration: `${autoplay_sliding_duration || 50}s`,
      }}
    >
      {slider_images?.image?.map((image, imageIndex) => (
        <div
          key={`${index}-${imageIndex}`}
          className={cn('relative w-full h-full')}
          style={{
            width: image.width ? `${image.width}px` : '300px',
            height: image.height ? `${image.height}px` : '100%',
          }}
        >
          <Image
            src={image.image?.url || ''}
            alt={image.image_alt_text || 'Slider Image'}
            className={cn('object-cover', keep_gap_between_images && 'pe-5')}
            fill={true}
            priority={true}
            quality={100}
          />
        </div>
      ))}
    </div>
  ));

  return (
    <Container
      tag="div"
      className={cn('overflow-hidden')}
      fullScreen
      edgeToEdge
      bottomPadded={false}
    >
      <div
        className={cn(`flex`)}
        style={{
          width: `${calculatedParentWidth}px`,
          height: `${slider_styling_options?.slider_height || 300}px`,
        }}
      >
        {duplicatedImages}
      </div>
    </Container>
  );
};
