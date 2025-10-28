import { IEventsCard } from '@/lib/generated';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { Button } from '../primitives/Button';
import { getCSLPAttributes } from '@/lib/type-guards';

export const EventsCard = ({
  card_heading,
  card_image,
  call_to_action,
  styling_options,
  $,
}: IEventsCard) => {
  function getTextColor(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'text-black' : 'text-white';
  }

  return (
    <div
      className={cn(
        'flex flex-col border-2 border-white bg-black hover:bg-dark group gap-5',
        'p-5 content:px-4 content:py-8'
      )}
    >
      {card_heading && (
        <h3
          className={cn(
            'text-[32px] text-center',
            'font-softcore-black font-semibold tracking-[1px]'
          )}
          style={{ color: styling_options?.theme_color?.dropdown || '#fff' }}
          {...getCSLPAttributes($?.card_heading)}
          dangerouslySetInnerHTML={{ __html: card_heading }}
        />
      )}

      {card_image?.image?.url && (
        <div
          className={cn(
            'w-full h-[208px] relative transition-transform ease-out duration-300 group-hover:translate-y-[-8px]'
          )}
        >
          <Image
            src={card_image.image.url}
            alt={card_image.image_alt_text || ''}
            width={1920}
            height={1080}
            quality={100}
            className="object-cover w-full h-full"
            {...getCSLPAttributes($?.card_image)}
          />
        </div>
      )}

      {call_to_action?.href && (
        <Button
          href={call_to_action.href}
          className={cn(
            'text-[14px] font-semibold tracking-[2px] px-6 py-3',
            'hover:bg-transparent! hover:text-[var(--hover-color)]!',
            getTextColor(styling_options?.theme_color?.dropdown || '#fff')
          )}
          style={{
            '--hover-color': styling_options?.theme_color?.dropdown,
            backgroundColor: styling_options?.theme_color?.dropdown,
            borderColor: styling_options?.theme_color?.dropdown,
          }}
          $={$?.call_to_action}
        >
          {call_to_action.title}
        </Button>
      )}
    </div>
  );
};
