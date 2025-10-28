import { IIconlist } from '@/lib/generated';
import { Container } from '../primitives/Container';
import { cn } from '@/utils/cn';
import { StyledText } from '../primitives/StyledText';
import { TextStylingOptions } from '@/lib/types';
import Image from 'next/image';
import { FadeInSSRWrapper } from '../primitives/FadeInSSRWrapper';
import { getCSLPAttributes } from '@/lib/type-guards';

export const Iconlist = ({ heading, icon_list, styling_options, $ }: IIconlist) => {
  const handleColumns = () => {
    if (icon_list?.length === 1) {
      return 'md:grid-cols-1';
    } else if (icon_list?.length === 2) {
      return 'md:grid-cols-2';
    } else if (icon_list?.length === 3) {
      return 'md:grid-cols-3';
    } else if (icon_list?.length === 4) {
      return 'md:grid-cols-4';
    } else if (icon_list?.length === 5) {
      return 'md:grid-cols-5';
    }
    return 'md:grid-cols-5';
  };
  return (
    <Container>
      <FadeInSSRWrapper>
        <div className={cn('flex flex-col gap-5')}>
          {heading?.text && (
            <div className={cn('tracking-[2px] p-5')}>
              <StyledText
                styling_options={heading.styling_options as TextStylingOptions}
                text={heading.text}
                $={$?.heading}
              />
            </div>
          )}

          {icon_list?.length && icon_list.length > 0 ? (
            <div className={cn('grid gap-5', handleColumns())}>
              {icon_list.map((icons, ind) => {
                return (
                  <FadeInSSRWrapper key={ind} delay={ind * 100}>
                    <div className={cn('flex flex-col text-center items-center')}>
                      {icons.icon_image?.image?.url && (
                        <div className={cn('w-20 h-20 mb-5')}>
                          <Image
                            src={icons.icon_image.image.url}
                            alt={icons.icon_image.image_alt_text || 'Icon Image'}
                            width={1920}
                            height={1080}
                            quality={100}
                            className="object-cover w-full h-full"
                            {...getCSLPAttributes(icons.$?.icon_image)}
                          ></Image>
                        </div>
                      )}

                      {icons.icon_title || icons.icon_description ? (
                        <div
                          style={
                            {
                              color: styling_options?.text_color?.dropdown,
                            } as React.CSSProperties
                          }
                          className={cn('flex flex-col')}
                        >
                          {icons.icon_title && (
                            <h3
                              className={cn(
                                'font-semibold text-xl md:text-2xl tracking-[4px] uppercase mb-3.5'
                              )}
                              dangerouslySetInnerHTML={{ __html: icons.icon_title }}
                              {...getCSLPAttributes(icons.$?.icon_title)}
                            />
                          )}

                          {icons.icon_description && (
                            <p
                              className={cn('md:text-lg')}
                              dangerouslySetInnerHTML={{ __html: icons.icon_description }}
                              {...getCSLPAttributes(icons.$?.icon_description)}
                            />
                          )}
                        </div>
                      ) : null}
                    </div>
                  </FadeInSSRWrapper>
                );
              })}
            </div>
          ) : null}
        </div>
      </FadeInSSRWrapper>
    </Container>
  );
};
