'use client';
import { IHeroBanner } from '@/lib/generated';
import { Container } from '../primitives/Container';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { Button } from '../primitives/Button';
import { useScrollFadeIn } from '@/lib/hooks/useScrollFadeIn';
import { HeroBannerVideoModal } from './modals/HeroBannerVideoModal';
import { StylingOptions, TextStylingOptions } from '@/lib/types';
import { StyledText } from '../primitives/StyledText';
import { FAIcons } from '@/helpers/FAIcons';
import { getCSLPAttributes } from '@/lib/type-guards';
import { RichText } from '../primitives/RichText';

const alignmentMapping = {
  left50: 'flex-row justify-center md:justify-between items-center text-left ',
  right50: 'flex-row-reverse justify-center md:justify-between items-center text-right',
  center: 'flex-col justify-center items-center text-center',
};

const contentAlignmentMapping = {
  left50: 'items-center md:items-start',
  right50: 'items-center md:items-end',
  center: 'items-center',
};

export const HeroBanner = ({
  background_image,
  top_logo,
  bottom_logo,
  top_text,
  top_rich_text,
  heading,
  bottom_text,
  bottom_rich_text,
  stroke_image,
  banner_call_to_actions,
  call_to_action_with_background_image,
  video_call_to_action,
  styling_options,
  $,
}: IHeroBanner) => {
  const fadeRef = useScrollFadeIn<HTMLDivElement>({ duration: 800 });

  return (
    <Container
      className={cn(
        'relative w-full min-h-44 md:min-h-72 flex flex-col justify-center',
        'before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-10',
        background_image?.image?.url && 'before:bg-dark/50'
      )}
      componentName="HeroBanner"
      styling_options={styling_options as StylingOptions}
      bottomPadded={!styling_options?.disable_bottom_spacing}
    >
      {background_image?.image?.url && (
        <Image
          src={background_image.image?.url}
          alt={background_image.image_alt_text || 'Hero Banner Background Image'}
          className="object-cover"
          quality={100}
          fill
          priority
          fetchPriority="high"
          {...getCSLPAttributes($?.background_image)}
        />
      )}
      <div className={cn('relative z-10 md:py-10', background_image?.image?.url && 'py-5')}>
        <div
          className={cn(
            'flex gap-5 text-white justify-between flex-wrap',
            alignmentMapping[styling_options?.content_alignment as keyof typeof alignmentMapping]
          )}
          ref={fadeRef.ref}
          style={fadeRef.style}
        >
          <div
            className={cn(
              'flex flex-col gap-5 justify-center w-fit',
              contentAlignmentMapping[
                styling_options?.content_alignment as keyof typeof contentAlignmentMapping
              ]
            )}
          >
            {top_logo?.image && (
              <Image
                src={top_logo.image?.url}
                alt={top_logo.image_alt_text || 'Hero Banner Top Logo'}
                width={300}
                height={20}
                quality={100}
                {...getCSLPAttributes($?.top_logo)}
              />
            )}

            {top_text && (
              <p
                className="text-2xl md:text-5xl font-bold uppercase"
                {...getCSLPAttributes($?.top_text)}
              >
                {top_text}
              </p>
            )}

            {top_rich_text && (
              <RichText
                content={top_rich_text}
                parentClassName="herobanner-richtext text-center"
                $={$?.top_rich_text}
              />
            )}

            {heading?.text && (
              <StyledText
                className={cn('text-4xl md:text-7xl', heading.styling_options?.font_size)}
                text={heading.text}
                styling_options={heading.styling_options as TextStylingOptions}
                $={$?.heading}
              />
            )}

            {bottom_rich_text && (
              <RichText
                content={bottom_rich_text}
                parentClassName="herobanner-richtext text-center"
                $={$?.bottom_rich_text}
              />
            )}

            {stroke_image?.image && (
              <div className="w-[180px] h-[10px] md:w-[480px] md:h-[25px] relative">
                <Image
                  src={stroke_image.image?.url}
                  alt={stroke_image.image_alt_text || 'Hero Banner Stroke Image'}
                  fill
                  quality={100}
                  className="object-contain w-full h-full"
                  {...getCSLPAttributes($?.stroke_image)}
                />
              </div>
            )}

            {bottom_text && (
              <p className="text-2xl" {...getCSLPAttributes($?.bottom_text)}>
                {bottom_text}
              </p>
            )}

            {banner_call_to_actions?.call_to_actions?.length &&
            banner_call_to_actions?.call_to_actions?.length > 0 ? (
              <div className="flex gap-5 w-fit">
                {banner_call_to_actions?.call_to_actions?.map((call_to_action, index) => (
                  <Button
                    key={index}
                    href={call_to_action.link?.href}
                    className="elementHover-transition hover:!bg-transparent flex gap-2.5 justify-center items-center text-lg font-semibold tracking-[2px] px-6 py-3"
                    styling_options={call_to_action.styling_options as StylingOptions}
                    $={$?.banner_call_to_actions}
                  >
                    {call_to_action.link?.title}
                    {call_to_action.font_awesome_icon_code && (
                      <FAIcons iconCode={call_to_action.font_awesome_icon_code} />
                    )}
                  </Button>
                ))}
              </div>
            ) : null}

            {call_to_action_with_background_image?.length &&
            call_to_action_with_background_image?.length > 0 ? (
              <div className="flex gap-5 w-fit flex-wrap justify-center items-center md:justify-start">
                {call_to_action_with_background_image?.map((call_to_action, index) => (
                  <Button
                    key={index}
                    href={call_to_action.link?.href}
                    className=" elementHover-transition relative min-w-40 min-h-11 w-fit"
                    $={$?.call_to_action_with_background_image}
                  >
                    <Image
                      src={call_to_action.background_image?.image?.url || ''}
                      alt={
                        call_to_action.background_image?.image_alt_text ||
                        'Hero Banner Call to Action Image'
                      }
                      className="object-cover"
                      fill
                      quality={100}
                      {...getCSLPAttributes($?.call_to_action_with_background_image)}
                    />
                  </Button>
                ))}
              </div>
            ) : null}

            {video_call_to_action?.length && video_call_to_action?.length > 0 ? (
              <HeroBannerVideoModal video_call_to_action={video_call_to_action} />
            ) : null}
          </div>
          <div>
            {bottom_logo?.image && (
              <Image
                src={bottom_logo.image?.url}
                alt={bottom_logo.image_alt_text || 'Hero Banner Bottom Logo'}
                width={200}
                height={200}
                className="w-[200px] h-[220px] md:w-full md:h-full"
                quality={100}
                {...getCSLPAttributes($?.bottom_logo)}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};
