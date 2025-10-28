import React from 'react';
import { Container } from '@/components/primitives/Container';
import { ILocationComponents } from '@/lib/generated';
import Image from 'next/image';
import { RichText } from '@/components/primitives/RichText';
import { StyledText } from '@/components/primitives/StyledText';
import { cn } from '@/utils/cn';

export const FreeParking = ({
  activate_free_parking,
  title_parking,
  parking_description,
  parking_image,
  parking_logo,
}: ILocationComponents['free_parking']) => {
  if (!activate_free_parking) return <></>;

  return (
    <Container componentName="FreeParking" className="overflow-hidden">
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-4',
          'tablet:flex-row tablet:gap-10',
          'text-white'
        )}
        id="free-parking"
      >
        {parking_image?.image?.url && (
          <div
            className={cn(
              'w-full hover:scale-110 transition-all duration-2000',
              'tablet:max-w-[560px]'
            )}
          >
            <Image
              src={parking_image.image.url}
              alt={parking_image.image_alt_text || ''}
              width={100}
              height={100}
              sizes="100vw"
              className="w-full h-auto object-cover"
              priority
              quality={100}
            />
          </div>
        )}
        <div className="flex flex-col items-start justify-center gap-7">
          {parking_logo?.image?.url && (
            <div className="w-full">
              <Image
                src={parking_logo.image.url}
                alt={parking_logo.image_alt_text || ''}
                width={60}
                height={60}
                quality={100}
              />
            </div>
          )}
          {title_parking && (
            <StyledText
              className={cn(
                'glowingText green',
                'font-semibold text-[40px] leading-[40px] tracking-[6px] uppercase',
                'tablet:text-[56px] tablet:leading-[56px]'
              )}
              text={title_parking}
              styling_options={{
                glowing_text: true,
                blinking_text: true,
                text_color: { dropdown: '#bff300' },
              }}
            />
          )}

          <RichText
            className="text-lg [&_p]:leading-[26px] font-normal"
            content={parking_description}
          />
        </div>
      </div>
    </Container>
  );
};
