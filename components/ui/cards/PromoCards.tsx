import React from 'react';
import { cn } from '@/utils/cn';
import { IPromoCards } from '@/lib/generated';
import { StyledText } from '@/components/primitives/StyledText';
import { TextStylingOptions } from '@/lib/types';
import { FadeInSSRWrapper } from '@/components/primitives/FadeInSSRWrapper';
import { NavigationLinks } from '@/components/primitives/NavigationLinks';
import { FAIcons } from '@/helpers/FAIcons';
import { PromoModal } from '../modals/PromoModal';
import { getCSLPAttributes } from '@/lib/type-guards';

export const PromoCards = ({ card_title, content, link_options, menu_image, $ }: IPromoCards) => {
  return (
    <FadeInSSRWrapper>
      <div className="p-4 md:p-6 content:p-10! border border-white flex flex-col h-full gap-5 text-white items-start">
        {card_title?.text && (
          <StyledText
            text={card_title?.text}
            styling_options={card_title?.styling_options as TextStylingOptions}
            className="text-start break-normal md:break-all lg:break-normal"
            $={$?.card_title}
          />
        )}
        {content && (
          <p className="text-white mb-4 text-lg leading-7" {...getCSLPAttributes($?.content)}>
            {content}
          </p>
        )}

        {menu_image?.enable_menu_image ? (
          <div
            className={cn(
              'cursor-pointer mt-auto text-2xl leading-7 uppercase w-full flex justify-between items-center'
            )}
          >
            <PromoModal
              modalCtaObject={link_options}
              textHoverColor={
                (card_title?.styling_options as TextStylingOptions)?.text_color?.dropdown ||
                undefined
              }
              menuImages={menu_image.menu_images}
              {...getCSLPAttributes($?.menu_image)}
            />
          </div>
        ) : (
          link_options?.cta?.href && (
            <div
              className={cn(
                'cursor-pointer mt-auto text-2xl leading-7 uppercase w-full flex justify-between items-center'
              )}
              {...getCSLPAttributes($?.link_options)}
            >
              <NavigationLinks
                href={link_options.cta?.href}
                target={link_options.open_in_new_window ? '_blank' : '_self'}
                className={cn(
                  'flex items-center gap-2 justify-between w-full text-2xl leading-9 font-semibold hover:text-[var(--hover-color)] uppercase'
                )}
                style={
                  {
                    '--hover-color': (card_title?.styling_options as TextStylingOptions)?.text_color
                      ?.dropdown,
                  } as React.CSSProperties
                }
                {...getCSLPAttributes($?.link_options)}
              >
                {link_options.cta?.title}
                <span>
                  <FAIcons
                    iconCode={link_options.font_awesome_icon_code}
                    className="text-[var(--hover-color)]"
                    {...getCSLPAttributes($?.link_options)}
                  />
                </span>
              </NavigationLinks>
            </div>
          )
        )}
      </div>
    </FadeInSSRWrapper>
  );
};
