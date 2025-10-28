import { Button } from '@/components/primitives/Button';
import { IUpcomingSessionCard } from '@/lib/generated';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { getCSLPAttributes } from '@/lib/type-guards';

export const UpcomingSessionCard = ({
  card_image,
  heading,
  session_details,
  call_to_action,
  $,
}: IUpcomingSessionCard) => {
  return (
    <div className={cn('p-4 content:p-6 border border-orange text-white', 'flex flex-col')}>
      {card_image?.image?.url && (
        <div className={cn('w-full h-[320px] relative mb-[15px]')}>
          <Image
            src={card_image.image.url}
            alt={card_image.image_alt_text || 'Upcoming Session Card Image'}
            fill
            quality={100}
            className="object-cover w-full h-full"
            {...getCSLPAttributes($?.card_image)}
          />
        </div>
      )}

      {heading && (
        <div
          className={cn(
            'w-full text-center text-lg content:text-2xl tracking-[2px] uppercase font-semibold mb-5'
          )}
          {...getCSLPAttributes($?.heading)}
        >
          <h3>{heading}</h3>
        </div>
      )}

      {session_details?.length && session_details.length > 0 ? (
        <div className={cn('flex flex-col gap-5 w- mb-4')}>
          {session_details.map((session, ind) => {
            return (
              <div
                key={ind}
                className={cn(
                  'flex flex-wrap justify-between items-center px-1 pb-4 border-b border-light',
                  'text-xl uppercase leading-4'
                )}
                {...getCSLPAttributes($?.session_details)}
              >
                <span>{session.age_range}</span>
                <span>{session.date_range}</span>
              </div>
            );
          })}
        </div>
      ) : null}

      {call_to_action?.href ? (
        <Button
          href={call_to_action.href}
          className="w-full px-6 py-3 bg-white text-light-black hover:bg-transparent hover:text-white font-semibold text-[15px]"
          $={$?.call_to_action}
        >
          {call_to_action.title}
        </Button>
      ) : (
        <div
          className={cn(
            'w-full px-6 py-3 text-center bg-white text-light-black',
            'font-semibold text-[15px] uppercase rounded-[6px]'
          )}
          {...getCSLPAttributes($?.call_to_action)}
        >
          {call_to_action?.title}
        </div>
      )}
    </div>
  );
};
