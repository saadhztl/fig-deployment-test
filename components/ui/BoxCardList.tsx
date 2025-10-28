import { IBoxCardList } from '@/lib/generated';
import { Container } from '../primitives/Container';
import { StyledText } from '../primitives/StyledText';
import { StylingOptions, TextStylingOptions } from '@/lib/types';
import { BoxCard } from './cards/BoxCard';
import { cn } from '@/utils/cn';
import { FadeInSSRWrapper } from '../primitives/FadeInSSRWrapper';
import Image from 'next/image';
import { getCSLPAttributes } from '@/lib/type-guards';
import { Button } from '../primitives/Button';
import { FAIcons } from '@/helpers/FAIcons';

export const BoxCardList = ({
  heading,
  description,
  box_cards,
  card_list_cta,
  five_box_layout,
  five_box_layout_image,
  $,
}: IBoxCardList) => {
  const handleColumns = () => {
    if (box_cards?.length) {
      if (box_cards?.length === 1) {
        return 'md:grid-cols-1';
      } else if (box_cards?.length === 2) {
        return 'md:grid-cols-2';
      } else if (box_cards?.length === 3) {
        return 'md:grid-cols-3';
      } else if (box_cards?.length >= 4) {
        return 'md:grid-cols-4';
      }
    }
  };
  const renderBoxType = () => {
    if (five_box_layout) {
      return (
        <Container componentName="BoxCardList" tag="section">
          <FadeInSSRWrapper>
            <div className="flex flex-col gap-10 items-center">
              {(heading?.text || description) && (
                <div className="flex flex-col gap-5 w-full">
                  {heading?.text && (
                    <StyledText
                      text={heading.text}
                      styling_options={heading.styling_options as TextStylingOptions}
                      className="pb-2.5"
                      $={$?.heading}
                    />
                  )}

                  {description && (
                    <p className="text-center w-full md:w-1/2 mx-auto text-lg md:text-[22px] leading-8 text-white">
                      {description}
                    </p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-5 w-full">
                {box_cards?.map((box_card, index) => {
                  return (
                    <FadeInSSRWrapper delay={index * 100} key={index}>
                      <BoxCard {...box_card} $={$?.box_cards} />
                    </FadeInSSRWrapper>
                  );
                })}
                <div
                  className={cn(
                    'aspect-video lg:aspect-auto col-span-1 md:col-span-2 lg:col-span-1 w-full lg:row-span-2 lg:col-start-3 lg:row-start-1 border border-white'
                  )}
                >
                  {five_box_layout_image?.image?.url && (
                    <div
                      className={cn(
                        'relative h-full flex flex-col justify-between overflow-hidden'
                      )}
                    >
                      <Image
                        src={five_box_layout_image?.image?.url}
                        alt={five_box_layout_image?.image?.title || ''}
                        fill
                        className="object-cover"
                        quality={100}
                        {...getCSLPAttributes($?.five_box_layout_image)}
                      />
                      {/* <div className="translate-y-3/4 lg:translate-y-[130%] translate-x-[130%] lg:translate-x-1/3 max-w-1/3 lg:max-w-full">
                        <LottieAnimation src="lottieData/angle.json" loop autoplay speed={0.5} />
                      </div>
                      <div className="-translate-y-1/4 translate-x-[200%] lg:translate-x-1/4 max-w-1/4 lg:max-w-full">
                        <LottieAnimation
                          src="lottieData/velocity.json"
                          delay={10}
                          autoplay
                          speed={0.5}
                        />
                      </div> */}
                    </div>
                  )}
                </div>
              </div>

              {card_list_cta?.length && card_list_cta?.length > 0 ? (
                <div
                  className={cn(
                    'flex gap-5 flex-col md:flex-row flex-wrap justify-center items-center w-full'
                  )}
                >
                  {card_list_cta.map((cta, index) => {
                    return (
                      cta.call_to_actions?.link?.href && (
                        <Button
                          key={index}
                          href={cta.call_to_actions?.link?.href}
                          styling_options={cta.call_to_actions?.styling_options as StylingOptions}
                          target={cta.call_to_actions?.open_in_new_window ? '_blank' : '_self'}
                          className="flex gap-1.5 items-center justify-center font-semibold tracking-[2px] text-lg px-8 py-3 w-full"
                        >
                          {cta.call_to_actions?.link?.title}
                          {cta.call_to_actions?.font_awesome_icon_code && (
                            <FAIcons iconCode={cta.call_to_actions?.font_awesome_icon_code} />
                          )}
                        </Button>
                      )
                    );
                  })}
                </div>
              ) : null}
            </div>
          </FadeInSSRWrapper>
        </Container>
      );
    } else {
      return (
        <Container componentName="BoxCardList" tag="section">
          <FadeInSSRWrapper>
            <div className="flex flex-col gap-10 items-center">
              {(heading?.text || description) && (
                <div className="flex flex-col gap-5 w-full">
                  {heading?.text && (
                    <StyledText
                      text={heading.text}
                      styling_options={heading.styling_options as TextStylingOptions}
                      className="pb-2.5"
                      $={$?.heading}
                    />
                  )}

                  {description && (
                    <p className="text-center w-full md:w-1/2 mx-auto text-lg md:text-[22px] leading-8 text-white">
                      {description}
                    </p>
                  )}
                </div>
              )}

              <div className={cn('grid gap-5 w-full', handleColumns())}>
                {box_cards?.map((box_card, index) => (
                  <FadeInSSRWrapper delay={index * 100} key={index}>
                    <BoxCard {...box_card} $={$?.box_cards} />
                  </FadeInSSRWrapper>
                ))}
              </div>

              {card_list_cta?.length && card_list_cta?.length > 0 ? (
                <div
                  className={cn(
                    'flex gap-5 flex-col md:flex-row flex-wrap justify-center items-center w-full'
                  )}
                >
                  {card_list_cta.map((cta, index) => {
                    return (
                      cta.call_to_actions?.link?.href && (
                        <Button
                          key={index}
                          href={cta.call_to_actions?.link?.href}
                          styling_options={cta.call_to_actions?.styling_options as StylingOptions}
                          target={cta.call_to_actions?.open_in_new_window ? '_blank' : '_self'}
                          className="flex gap-1.5 items-center justify-center font-semibold tracking-[2px] text-lg px-8 py-3 w-full"
                        >
                          {cta.call_to_actions?.link?.title}
                          {cta.call_to_actions?.font_awesome_icon_code && (
                            <FAIcons iconCode={cta.call_to_actions?.font_awesome_icon_code} />
                          )}
                        </Button>
                      )
                    );
                  })}
                </div>
              ) : null}
            </div>
          </FadeInSSRWrapper>
        </Container>
      );
    }
  };
  return renderBoxType();
};
