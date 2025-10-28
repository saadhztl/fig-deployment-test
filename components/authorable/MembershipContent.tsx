import { IMembershipContent } from '@/lib/generated';
import { Container } from '../primitives/Container';
import { StyledText } from '../primitives/StyledText';
import { cn } from '@/utils/cn';
import { StylingOptions, TextStylingOptions } from '@/lib/types';
import { RichText } from '../primitives/RichText';
import { Button } from '../primitives/Button';
import { FAIcons } from '@/helpers/FAIcons';
import Image from 'next/image';
import { getCSLPAttributes } from '@/lib/type-guards';

export const MembershipContent = ({
  heading,
  sub_heading,
  background_image,
  content,
  membership_perks,
  call_to_actions,
  $,
}: IMembershipContent) => {
  return (
    <Container
      componentName="MembershipContent"
      className={cn(
        'py-[60px] relative',
        'before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-dark/70 before:z-10'
      )}
      fullScreen
    >
      {background_image?.image?.url && (
        <Image
          src={background_image.image.url}
          alt={background_image.image_alt_text || 'Background Image'}
          fill
          quality={100}
          className="object-cover w-full h-full"
          {...getCSLPAttributes($?.background_image)}
        />
      )}
      <div
        className={cn('flex flex-col gap-5', 'relative z-10 max-w-screen-large-desktop mx-auto')}
      >
        {(heading?.text || sub_heading?.text) && (
          <div className={cn('flex flex-col gap-5 p-2.5')}>
            {heading?.text && (
              <StyledText
                text={heading.text}
                styling_options={heading.styling_options as TextStylingOptions}
                tag="h2"
                className="text-start"
                $={$?.heading}
              />
            )}
            {sub_heading?.text && (
              <StyledText
                text={sub_heading.text}
                styling_options={sub_heading.styling_options as TextStylingOptions}
                className="text-start"
                tag="h3"
                $={$?.sub_heading}
              />
            )}
          </div>
        )}

        <div className={cn('flex flex-col md:flex-row gap-[30px] md:gap-[50px] p-2.5')}>
          <div className={cn('flex flex-col gap-10')}>
            {content && (
              <RichText content={content} $={$?.content} className="text-white text-lg w-5/6!" />
            )}

            {call_to_actions?.length && call_to_actions.length > 0 ? (
              <div className={cn('flex flex-col flex-wrap md:flex-row gap-5')}>
                {call_to_actions.map((cta, index) => {
                  return (
                    <Button
                      key={index}
                      href={cta?.cta?.link?.href}
                      styling_options={cta.cta?.styling_options as StylingOptions}
                      target={cta.cta?.open_in_new_window ? '_blank' : '_self'}
                      className={cn(
                        'px-6 py-3 flex gap-2.5 justify-center items-center text-lg font-semibold tracking-[2px]'
                      )}
                      $={cta.cta?.$?.link}
                    >
                      {cta.cta?.link?.title}
                      {cta.cta?.font_awesome_icon_code && (
                        <FAIcons iconCode={cta.cta?.font_awesome_icon_code} />
                      )}
                    </Button>
                  );
                })}
              </div>
            ) : null}
          </div>

          {membership_perks?.length && membership_perks.length > 0 ? (
            <ul className="w-full flex flex-col text-white">
              {membership_perks?.map((perk, index) => {
                return (
                  <li key={index} className="flex items-center gap-5 pb-5">
                    <div className="w-10 flex-shrink-0">
                      <Image
                        src={perk.member_item_image?.image?.url || ''}
                        alt={perk.member_item_image?.image_alt_text || ''}
                        width={40}
                        height={40}
                        quality={100}
                        className="w-full h-full"
                        {...getCSLPAttributes(perk.$?.member_item_image)}
                      />
                    </div>
                    <span>
                      <h4
                        className="text-2xl leading-8 font-semibold"
                        {...getCSLPAttributes(perk.$?.member_item_title)}
                      >
                        {perk.member_item_title}
                      </h4>
                      <p
                        className="text-xl leading-8"
                        {...getCSLPAttributes(perk.$?.member_item_text)}
                      >
                        {perk.member_item_text}
                      </p>
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </Container>
  );
};
