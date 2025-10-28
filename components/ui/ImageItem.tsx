'use client';
import Image from 'next/image';
import { IImageItem } from '@/lib/generated';
import { useCurrentScreenType, getBreakpoint } from '@/lib/hooks/useScreenType';
import { cn } from '@/utils/cn';
import { getCSLPAttributes } from '@/lib/type-guards';

// Object mappings for object_fit and object_position to Tailwind classes
const objectFitClasses = {
  fill: 'object-fill',
  contain: 'object-contain',
  cover: 'object-cover',
  none: 'object-none',
  'scale-down': 'object-scale-down',
} as const;

const objectPositionClasses = {
  top: 'object-top',
  bottom: 'object-bottom',
  left: 'object-left',
  right: 'object-right',
  center: 'object-center',
} as const;

const getObjectFitClass = (objectFit?: string | null): string => {
  return objectFitClasses[objectFit as keyof typeof objectFitClasses] || 'object-cover';
};

const getObjectPositionClass = (objectPosition?: string | null): string => {
  return (
    objectPositionClasses[objectPosition as keyof typeof objectPositionClasses] || 'object-center'
  );
};

export const ImageItem = ({ image, styling_options, $ }: IImageItem) => {
  if (!image || !image.image?.url) return null;

  const { currentScreenWidth } = useCurrentScreenType();

  const isDesktop = currentScreenWidth > getBreakpoint('desktop-lg');

  // Get Tailwind classes for object-fit and object-position
  const objectFitClass = getObjectFitClass(image.object_fit);
  const objectPositionClass = getObjectPositionClass(image.object_position);

  return (
    <div
      className={cn(
        'w-full h-full md:aspect-video',
        styling_options?.rounded_image && 'overflow-hidden rounded-[32px]',
        styling_options?.enable_image_border && 'border-[5px]'
      )}
      style={
        {
          width: isDesktop && image.width ? `${image.width}px` : '100%',
          height: isDesktop && image.height ? `${image.height}px` : '100%',
          borderColor: styling_options?.border_color?.dropdown,
        } as React.CSSProperties
      }
    >
      <Image
        src={image.image.url}
        alt={image.image_alt_text || ''}
        quality={100}
        className={cn(objectFitClass, objectPositionClass, 'w-full h-fit md:h-full')}
        {...getCSLPAttributes($?.image)}
        width={1920}
        height={1080}
      />
    </div>
  );
};
