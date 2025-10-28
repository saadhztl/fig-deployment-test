import { Container } from '@/components/primitives/Container';
import { ILocationComponents, ISystemFields } from '@/lib/generated';
import { cn } from '@/utils/cn';
import { ReferencePlaceholder } from '@/components/primitives/ReferencePlaceholder';
import Image from 'next/image';
import { StyledText } from '@/components/primitives/StyledText';
import { TextStylingOptions } from '@/lib/types';

export const DuckpinBowlingSection = ({
  layout,
  heading,
  duckpin_icon_images,
  background_image,
}: ILocationComponents['duckpin_bowling_section']) => {
  return (
    <Container
      componentName="DuckpinBowlingSection"
      className={cn(
        'w-full relative',
        background_image?.image?.url &&
          'before:absolute before:top-0 before:left-0 before:w-full before:h-full  before:z-10 before:bg-light-black/60'
      )}
    >
      {/* Background Image */}
      {background_image?.image?.url && (
        <Image
          src={background_image.image.url}
          alt={background_image.image_alt_text || 'Duckpin Bowling Background'}
          fill
          className="object-cover"
          quality={100}
        />
      )}

      {/* Content with proper z-index */}
      <div className="relative z-20 pt-[80px]">
        {/* Icons Section */}
        {duckpin_icon_images && duckpin_icon_images.length > 0 && (
          <div className="flex justify-center items-center gap-[48px] mb-[20px] p-2.5">
            {duckpin_icon_images.map(
              (iconItem, index) =>
                iconItem.icon_image?.image?.url && (
                  <div key={index}>
                    <Image
                      src={iconItem.icon_image.image.url}
                      alt={iconItem.icon_image.image_alt_text || `Duckpin icon ${index + 1}`}
                      width={50}
                      height={50}
                      quality={100}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )
            )}
          </div>
        )}

        {/* Main Content Section */}
        <div className="flex flex-col md:gap-0 md:flex-row  w-full">
          <div className="flex flex-col w-full">
            {heading?.text && (
              <div className="md:mb-[90px] mb-[25px]">
                <StyledText
                  text={heading?.text || ''}
                  styling_options={heading?.styling_options as TextStylingOptions}
                  tag="h2"
                  className="text-left md:max-w-[60%] tracking-[2px]"
                />
              </div>
            )}

            {layout && layout.length > 0 && (
              <ReferencePlaceholder references={layout as Array<ISystemFields>} />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};
