import { IComponents, ISystemFields } from '@/lib/generated';
import { Container } from '../primitives/Container';
import { ReferencePlaceholder } from '../primitives/ReferencePlaceholder';
import { StylingOptions } from '@/lib/types';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { getCSLPAttributes } from '@/lib/type-guards';

export const Section = ({
  section_items,
  styling_options,
  inline_navigation_id,
  container_background_image,
  $,
}: IComponents['section']) => {
  return (
    <Container
      styling_options={styling_options as StylingOptions}
      className={cn(
        'sectioncomponent py-[60px]',
        styling_options?.disable_section_block_padding && 'py-0',
        container_background_image?.image?.url &&
          'relative before:bg-dark/50 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-10'
      )}
      edgeToEdge
      fullScreen
      bottomPadded={!styling_options?.disable_section_bottom_spacing}
      id={inline_navigation_id}
      componentName="Section"
    >
      {container_background_image?.image?.url && (
        <Image
          src={container_background_image.image?.url}
          alt={container_background_image.image_alt_text || 'Section Background Image'}
          className="object-cover"
          quality={100}
          fill
          priority
          {...getCSLPAttributes($?.container_background_image)}
        />
      )}
      <div className={cn('relative z-10')}>
        <ReferencePlaceholder
          references={section_items as Array<ISystemFields>}
        ></ReferencePlaceholder>
      </div>
    </Container>
  );
};
