'use client';
import { Button } from '@/components/primitives/Button';
import { Container } from '@/components/primitives/Container';
import { RichText } from '@/components/primitives/RichText';
import { StyledText } from '@/components/primitives/StyledText';
import { PaginatedImageSlider } from '@/components/ui/slider-variants/PaginatedImageSlider';
import { MindBodyAppointments } from '@/components/ui/MindBodyAppointments';
import { ILocationComponents } from '@/lib/generated';
import { StylingOptions } from '@/lib/types';
import { cn } from '@/utils/cn';
import React, { Fragment, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const Multisport = ({
  activate_multisport_section,
  title_banner_games,
  selection_multisport,
  games,
}: ILocationComponents['multisport']) => {
  const [mindbodyOpen, setMindbodyOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!activate_multisport_section) return <></>;

  const {
    slider_images,
    title_section_multisport,
    subtitle_multisport,
    description_multisport_bold,
    description_multisport_regular,
    multisport_cta,
    enable_mindbody_sliding_cta,
    mindbody_widget_url,
  } = selection_multisport!;

  return (
    <>
      <Container componentName="Multisport">
        <div
          className={cn(
            'py-[10px] mx-[calc(50%-50vw)] mb-5',
            'text-[16px] text-center bg-white text-[#cb1947] uppercase',
            'leading-[16px] tracking-[4px] font-semibold',
            'content:text-[32px] content:leading-[32px]'
          )}
        >
          {title_banner_games?.title_header}
        </div>
        <div
          className={cn(
            'flex flex-col items-center justify-center gap-4 content:mb-[30px]',
            'content:flex-row content:gap-[20px]',
            'text-white'
          )}
        >
          {slider_images?.images && slider_images.images.length > 0 && (
            <div className="w-full max-w-full mx-auto content:max-w-[580px]">
              <PaginatedImageSlider
                images={slider_images.images.map((image) => ({
                  alt: image.image_alt_text || '',
                  url: image.image?.url || '',
                }))}
                isPaginationEnabled={true}
                className={cn(
                  'px-0 mb-10',
                  '[&_.swiper-button-prev]:after:!text-[20px] [&_.swiper-button-next]:after:!text-[20px]',
                  '[&_.swiper-button-prev]:after:text-[#ededede5] [&_.swiper-button-next]:after:text-[#ededede5]'
                )}
              />
            </div>
          )}
          <div className="flex flex-col items-start px-[10px]">
            {title_section_multisport && (
              <StyledText
                text={title_section_multisport}
                styling_options={{
                  font_style: 'font-dead-stock',
                  text_color: { dropdown: '#CB1947' },
                }}
                className={cn(
                  'text-4xl uppercase tracking-[6px] leading-9',
                  'md:text-[60px] md:leading-[60px]',
                  'content:text-[72px]! content:leading-[72px]!',
                  'stroked-text'
                )}
              />
            )}
            {subtitle_multisport && (
              <StyledText
                text={subtitle_multisport}
                className={cn(
                  'text-2xl leading-[30px] text-white font-semibold',
                  'uppercase tracking-[2px] text-left',
                  'mt-[5px] mb-8',
                  'md:text-[40px] md:leading-[40px]'
                )}
                style={{
                  textShadow: '0 0 4px #FF7DA7',
                }}
              />
            )}
            {description_multisport_bold && (
              <div className={cn('multisport-rte1')}>
                <RichText content={description_multisport_bold} />
              </div>
            )}
            {description_multisport_regular && (
              <div className={cn('multisport-rte2')}>
                <RichText content={description_multisport_regular} className="mt-5 mb-[30px]" />
              </div>
            )}
            {(enable_mindbody_sliding_cta || multisport_cta) && (
              <div className={cn('flex flex-col flex-wrap md:flex-row gap-4 w-full')}>
                {enable_mindbody_sliding_cta && (
                  <Button
                    onClick={() => setMindbodyOpen(true)}
                    className={cn(
                      'text-lg font-semibold tracking-[2px] bg-transparent text-white border-white hover:text-crimson-red hover:bg-white'
                    )}
                  >
                    Book Now
                  </Button>
                )}

                {multisport_cta && (
                  <Button
                    href={multisport_cta.link?.href}
                    styling_options={multisport_cta.styling_options as StylingOptions}
                    className="text-lg [&_p]:leading-[27px] content:[&_p]:leading-[32px] font-semibold tracking-[2px] px-6"
                  >
                    {multisport_cta.link?.title}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
        {games && (
          <div className="hidden content:flex items-center justify-between text-white">
            <span className="inline-block w-[1px] h-10 bg-crimson-red" />
            {Object.entries(games).map(
              ([key, value]) =>
                key !== '$' && (
                  <Fragment key={key}>
                    <span key={key} className="px-6 py-2 text-[16px] leading-[24px] font-semibold">
                      {value as string}
                    </span>
                    <span className="inline-block w-[1px] h-10 bg-crimson-red" />
                  </Fragment>
                )
            )}
          </div>
        )}
      </Container>

      {mounted &&
        createPortal(
          <MindBodyAppointments
            state={mindbodyOpen}
            onClose={() => setMindbodyOpen(false)}
            mindbody_widget_url={mindbody_widget_url}
          />,
          document.body
        )}
    </>
  );
};
