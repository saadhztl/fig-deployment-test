import React from 'react';
import { Container } from '@/components/primitives/Container';
import { Button } from '@/components/primitives/Button';
import { IInlineBanner } from '@/lib/generated';
import { cn } from '@/utils/cn';
import { StylingOptions, TextStylingOptions } from '@/lib/types';
import { StyledText } from '@/components/primitives/StyledText';
import { FAIcons } from '@/helpers/FAIcons';
import { getCSLPAttributes } from '@/lib/type-guards';

export const InlineBanner = ({
  fullscreen_banner,
  banner_heading,
  banner_description,
  banner_cta,
  styling_options,
  $,
}: IInlineBanner) => {
  return (
    <Container
      componentName="InlineBanner"
      fullScreen
      edgeToEdge={fullscreen_banner}
      bottomPadded={!styling_options?.disable_bottom_spacing}
    >
      <div
        className={cn(
          !fullscreen_banner && 'max-w-large-desktop mx-auto',
          fullscreen_banner && 'px-5 xl:px-0',
          !(
            banner_cta?.link?.href ||
            banner_cta?.link?.title ||
            banner_cta?.font_awesome_icon_code
          ) && 'text-center justify-center',
          `${styling_options?.spacing?.inline_padding} ${styling_options?.spacing?.block_padding}`,
          styling_options?.rounded_border_banner && 'rounded-2xl'
        )}
        style={
          {
            backgroundColor: styling_options?.container_background_color?.dropdown,
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            'flex lg:flex-row flex-col items-center justify-center gap-5 max-w-large-desktop mx-auto',
            (banner_cta?.link?.href ||
              banner_cta?.link?.title ||
              banner_cta?.font_awesome_icon_code) &&
              'justify-between'
          )}
        >
          <div
            className={cn(
              'flex flex-col gap-2.5 items-center lg:items-start',
              !banner_cta?.link?.href && 'lg:items-center'
            )}
            style={
              { color: styling_options?.container_text_color?.dropdown } as React.CSSProperties
            }
          >
            <StyledText
              className="text-4xl tracking-[1px]"
              text={banner_heading?.text || ''}
              styling_options={banner_heading?.styling_options as TextStylingOptions}
              $={$?.banner_heading}
            />
            {banner_description && (
              <p className="text-xl md:text-2xl" {...getCSLPAttributes($?.banner_description)}>
                {banner_description}
              </p>
            )}
          </div>
          {banner_cta?.link?.href ||
          banner_cta?.link?.title ||
          banner_cta?.font_awesome_icon_code ? (
            <Button
              href={banner_cta?.link?.href}
              className="text-center flex gap-2.5 justify-center items-center px-8 py-2 font-semibold text-lg border-2 tracking-[2px]"
              styling_options={banner_cta?.styling_options as StylingOptions}
              $={$?.banner_cta}
            >
              {banner_cta?.link?.title}
              {banner_cta?.font_awesome_icon_code && (
                <FAIcons iconCode={banner_cta?.font_awesome_icon_code} />
              )}
            </Button>
          ) : null}
        </div>
      </div>
    </Container>
  );
};
