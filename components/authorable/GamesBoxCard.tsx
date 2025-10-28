'use client';
import { IGamesBoxCard } from '@/lib/generated';
import Image from 'next/image';
import { StyledText } from '../primitives/StyledText';
import { TextStylingOptions } from '@/lib/types';
import { RichText } from '../primitives/RichText';
import { useGlobalLabels } from '@/providers/GlobalLabelsProvider';
import { cn } from '@/utils/cn';
import { getCSLPAttributes } from '@/lib/type-guards';

export const GamesBoxCard = ({
  card_heading,
  card_sub_heading,
  card_description,
  card_image,
  card_difficulty_level,
  card_characteristics,
  $,
}: IGamesBoxCard) => {
  const handleColumns = () => {
    if (card_characteristics?.length === 1) {
      return 'md:grid-cols-1';
    } else if (card_characteristics?.length === 2) {
      return 'md:grid-cols-2';
    } else {
      return 'md:grid-cols-3';
    }
  };
  const { globalLabels } = useGlobalLabels();
  return (
    <div className="p-6 flex flex-col justify-between gap-6 h-full border border-white">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          {card_image?.image?.url && (
            <div className="w-full h-auto">
              <Image
                src={card_image.image.url}
                alt={card_image.image_alt_text || ''}
                width={1920}
                height={1080}
                quality={100}
                className="object-cover w-full h-[200px]"
                {...getCSLPAttributes($?.card_image)}
              ></Image>
            </div>
          )}

          <div className="flex flex-col">
            {card_heading?.text && (
              <StyledText
                text={card_heading.text}
                styling_options={card_heading.styling_options as TextStylingOptions}
                className="text-start leading-normal tracking-widest uppercase"
                $={$?.card_heading}
              />
            )}

            {card_sub_heading && (
              <p
                className="text-white text-start text-lg leading-6 font-semibold"
                {...getCSLPAttributes($?.card_sub_heading)}
              >
                {card_sub_heading}
              </p>
            )}
          </div>

          {card_description && (
            <RichText
              content={card_description}
              className="text-white text-start leading-6"
              parentClassName="boxcards-richtext"
              $={$?.card_description}
            />
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center px-4 py-2 bg-light text-light-black font-semibold uppercase">
            <p>{globalLabels.difficulty_label}</p>
            <span className="flex gap-2.5 justify-end items-center">
              {
                <span className="flex gap-2.5 justify-end items-center">
                  {Array.from({ length: Number(card_difficulty_level) }).map((_, ind) => {
                    return (
                      <span
                        key={ind}
                        className="w-4 h-4 bg-light-black rounded-full"
                        {...getCSLPAttributes($?.card_difficulty_level)}
                      ></span>
                    );
                  })}
                </span>
              }
              {3 - (card_difficulty_level ?? 0) > 0 ? (
                <span className="flex gap-2.5 justify-end items-center">
                  {Array.from({ length: Number(3 - (card_difficulty_level ?? 0)) }).map(
                    (_, ind) => {
                      return (
                        <span
                          key={ind}
                          className="w-4 h-4 bg-transparent border-2 border-light-black rounded-full"
                          {...getCSLPAttributes($?.card_difficulty_level)}
                        ></span>
                      );
                    }
                  )}
                </span>
              ) : null}
            </span>
          </div>
          {card_characteristics && card_characteristics.length > 0 ? (
            <div
              className={cn(
                'grid gap-y-2.5 w-full border-0 md:border border-light text-light text-center font-medium uppercase',
                handleColumns()
              )}
            >
              {card_characteristics?.map((characteristic, ind) => {
                return (
                  <span
                    key={ind}
                    className="p-1 border md:border-0 md:border-r border-light md:last:border-r-0"
                    {...getCSLPAttributes($?.card_characteristics)}
                  >
                    {characteristic.text}
                  </span>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
