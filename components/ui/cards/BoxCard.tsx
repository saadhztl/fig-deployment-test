import { Button } from '@/components/primitives/Button';
import { RichText } from '@/components/primitives/RichText';
import { StyledText } from '@/components/primitives/StyledText';
import { FAIcons } from '@/helpers/FAIcons';
import { CSLPFieldMapping, IImageField, ILink, IStyledSingleLineText } from '@/lib/generated';
import { TextStylingOptions } from '@/lib/types';
import Image from 'next/image';
import { getCSLPAttributes } from '@/lib/type-guards';

export interface BoxCardProps {
  card_heading?: IStyledSingleLineText;
  card_sub_heading?: string;
  card_description?: string;
  card_image?: IImageField;
  card_cta?: {
    link?: ILink;
    opens_in_new_window: boolean;
    font_awesome_icon_code?: string;
  };
  $?: CSLPFieldMapping;
}

export const BoxCard = ({
  card_heading,
  card_sub_heading,
  card_description,
  card_image,
  card_cta,
  $,
}: BoxCardProps) => {
  return (
    <div className="p-4 md:p-6 lg:p-10 flex flex-col justify-between gap-6 h-full border border-white">
      <div className="flex flex-col gap-4">
        {card_image?.image?.url && (
          <div
            className="w-full h-auto"
            style={
              {
                width: card_image.width ? `${card_image.width}px` : '100%',
                height: card_image.height ? `${card_image.height}px` : '300px',
              } as React.CSSProperties
            }
          >
            <Image
              src={card_image.image.url}
              alt={card_image.image_alt_text || ''}
              quality={100}
              width={1920}
              height={1080}
              className="object-cover w-full h-full"
              {...getCSLPAttributes($)}
            ></Image>
          </div>
        )}

        <div className="flex flex-col">
          {card_heading?.text && (
            <StyledText
              text={card_heading.text}
              styling_options={card_heading.styling_options as TextStylingOptions}
              className="text-start leading-normal tracking-widest"
              $={$}
            />
          )}

          {card_sub_heading && (
            <p className="text-white text-start text-lg leading-6 font-semibold">
              {card_sub_heading}
            </p>
          )}
        </div>

        {card_description && (
          <RichText
            content={card_description}
            className="text-white text-start leading-6"
            parentClassName="boxcards-richtext"
            $={$}
          />
        )}
      </div>
      {card_cta?.link?.href && (
        <div className="w-full">
          <Button
            href={card_cta.link.href}
            target={card_cta.opens_in_new_window ? '_blank' : '_self'}
            className="w-full flex justify-between items-center border-none text-white p-0 text-xl leading-7 font-semibold tracking-widest hover:text-[var(--hover-color)]"
            style={
              {
                '--hover-color': (card_heading?.styling_options as TextStylingOptions)?.text_color
                  ?.dropdown,
              } as React.CSSProperties
            }
            $={$}
          >
            {card_cta.link.title}
            <span>
              <FAIcons iconCode={card_cta.font_awesome_icon_code} />
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};
