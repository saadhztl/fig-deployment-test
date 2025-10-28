import { ILocationBookingBanner, ISystemFields } from '@/lib/generated';
import { Container } from '../primitives/Container';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { StyledText } from '../primitives/StyledText';
import { TextStylingOptions } from '@/lib/types';
import { Button } from '../primitives/Button';
import { ReferencePlaceholder } from '../primitives/ReferencePlaceholder';
import { LottieAnimation } from '@/helpers/LottieAnimation/LottieAnimation';
import { FadeInSSRWrapper } from '../primitives/FadeInSSRWrapper';
import { getCSLPAttributes } from '@/lib/type-guards';

export const LocationBookingBanner = ({
  logo,
  animated_svg_file,
  heading,
  description,
  location_dropdown,
  call_to_action,
  $,
}: ILocationBookingBanner) => {
  return (
    <Container componentName="LocationBookingBanner" className="pt-5 small-mobile:pt-0">
      <FadeInSSRWrapper>
        <div
          className={cn(
            'flex flex-col flex-wrap lg:flex-row justify-between items-start lg:items-center gap-4'
          )}
        >
          <div
            className={cn(
              'flex gap-5 flex-col md:flex-row justify-center items-start md:items-center',
              'relative'
            )}
          >
            {animated_svg_file?.url && (
              <div className="hidden xl:block">
                <LottieAnimation
                  src={animated_svg_file.url}
                  loop
                  customStyle={{
                    position: 'absolute',
                    width: '420px',
                    top: '-50%',
                    left: '100%',
                  }}
                />
              </div>
            )}

            {logo?.image?.url && (
              <div className={cn('flex-shrink-0 w-20 h-20 md:w-32 md:h-32')}>
                <Image
                  src={logo.image?.url}
                  alt={logo.image_alt_text || 'Location Booking Banner Logo'}
                  width={128}
                  height={128}
                  quality={100}
                  className="object-contain"
                  {...getCSLPAttributes($?.logo)}
                />
              </div>
            )}
            <div className={cn('flex flex-col')}>
              {heading?.text && (
                <StyledText
                  text={heading.text}
                  styling_options={heading.styling_options as TextStylingOptions}
                  tag="h2"
                  className="mb-4 text-start tracking-[1px]"
                  $={$?.heading}
                />
              )}
              {description && (
                <p className="text-lg text-white" {...getCSLPAttributes($?.description)}>
                  {description}
                </p>
              )}
            </div>
          </div>

          <div
            className={cn(
              'flex flex-col-reverse md:flex-col gap-4 items-end md:items-start lg:items-end w-full md:w-fit'
            )}
          >
            {call_to_action?.link?.href && (
              <Button
                href={call_to_action.link.href}
                target={call_to_action.opens_in_new_window ? '_blank' : '_self'}
                style={
                  {
                    '--hover-text-color':
                      call_to_action.styling_options?.hover_text_color?.dropdown,
                    borderColor: call_to_action.styling_options?.border_color?.dropdown,
                    color: call_to_action.styling_options?.text_color?.dropdown,
                  } as React.CSSProperties
                }
                className="p-1.5 hover:text-[var(--hover-text-color)]! border-0 border-b-2 rounded-none font-semibold tracking-[2px] w-fit md:w-fit"
                {...getCSLPAttributes($?.call_to_action)}
              >
                {call_to_action.link.title}
              </Button>
            )}

            <div className="LocationDropdownComponent w-full">
              <ReferencePlaceholder references={location_dropdown as Array<ISystemFields>} />
            </div>
          </div>
        </div>
      </FadeInSSRWrapper>
    </Container>
  );
};
