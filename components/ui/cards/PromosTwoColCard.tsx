import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { IPromosTwoColCard } from '@/lib/generated';
import { StylingOptions } from '@/lib/types';
import { Container } from '@/components/primitives/Container';
import { StyledText } from '@/components/primitives/StyledText';
import { RichText } from '@/components/primitives/RichText';
import { Button } from '@/components/primitives/Button';
import { FadeInSSRWrapper } from '@/components/primitives/FadeInSSRWrapper';
import { getCSLPAttributes } from '@/lib/type-guards';

export const PromosTwoColCard = ({
  promo_image,
  promo_title,
  promo_subtitle,
  promo_content,
  promo_cta,
  foot_note,
  highlight_this_promo_item,
  $,
}: // date,
IPromosTwoColCard) => {
  return (
    <Container
      componentName="PromosTwocolCard"
      className="text-white mb-[40px] md:mb-[60px] last:md:mb-[80px]"
      maxWidthOverride={!highlight_this_promo_item ? 'max-w-max-content' : ''}
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-10">
        {promo_image?.image?.url && (
          <FadeInSSRWrapper>
            <div className={cn('relative w-full aspect-square md:aspect-auto h-full lg:min-h-140')}>
              <Image
                fill
                className={cn('object-cover object-center')}
                src={promo_image?.image?.url}
                alt={promo_image?.image_alt_text || 'Promo Image'}
                quality={100}
                {...getCSLPAttributes($?.promo_image)}
              />
            </div>
          </FadeInSSRWrapper>
        )}

        <div className={cn('h-full w-full flex flex-col items-start justify-center order-1')}>
          {promo_title?.text && (
            <FadeInSSRWrapper delay={500}>
              <StyledText
                tag="h2"
                className={cn('text-left text-2xl tracking-[1px] md:text-4xl mb-[20px]')}
                text={promo_title?.text}
                styling_options={promo_title?.styling_options}
                $={$?.promo_title}
              />
            </FadeInSSRWrapper>
          )}
          {promo_subtitle && (
            <FadeInSSRWrapper delay={600}>
              <h3
                className={cn('text-left text-[22px] font-semibold tracking-[1px] mb-[16px]')}
                {...getCSLPAttributes($?.promo_subtitle)}
              >
                {promo_subtitle}
              </h3>
            </FadeInSSRWrapper>
          )}
          {promo_content && (
            <FadeInSSRWrapper delay={700}>
              <RichText
                className={cn('text-lg text-white mb-[46px]')}
                content={promo_content}
                $={$?.promo_content}
              />
            </FadeInSSRWrapper>
          )}
          {promo_cta?.link?.href && (
            <FadeInSSRWrapper delay={800}>
              <div className={cn('mb-[30px]')}>
                <Button
                  href={promo_cta.link?.href}
                  styling_options={promo_cta?.styling_options as StylingOptions}
                  target={promo_cta?.open_in_new_window ? '_blank' : '_self'}
                  className="tracking-widest px-6 py-3 text-lg"
                  $={$?.promo_cta}
                >
                  {promo_cta.link?.title}
                </Button>
              </div>
            </FadeInSSRWrapper>
          )}
          {foot_note && (
            <FadeInSSRWrapper delay={900}>
              <RichText
                content={foot_note}
                className={cn('text-sm italic font-rawson text-[#b6b6b6]')}
                $={$?.foot_note}
              />
            </FadeInSSRWrapper>
          )}
        </div>
      </div>
    </Container>
  );
};
