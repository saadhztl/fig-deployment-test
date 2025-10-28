'use client';
import ModalWrapper from '@/helpers/ModalWrapper';
import { ICoach, ITaxonomyEntry } from '@/lib/generated';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import { RichText } from '../primitives/RichText';

const DEFAULT_IMAGE = 'https://fiveirongolf.com/wp-content/uploads/2024/06/5i-isotype-1white-1.svg';

export const Coach = ({
  display_name,
  featured_image,
  certification_badgets,
  content,
  taxonomies,
}: ICoach) => {
  const [modalState, setModalState] = useState(false);
  const getCoachPosition = () => {
    const position = (taxonomies as ITaxonomyEntry[]).find(
      (taxonomy) => taxonomy.taxonomy_uid === 'coach_levels'
    );
    return position?.term_uid
      ?.replace(/_/g, ' ')
      ?.split(' ')
      ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      ?.join(' ');
  };

  return (
    <>
      <div
        className={cn(
          'flex flex-col p-10',
          'border border-orange-400 text-white',
          'h-full cursor-pointer'
        )}
        onClick={() => setModalState(true)}
      >
        <div className={cn('relative w-full h-[300px]')}>
          <Image
            src={featured_image?.image?.url || DEFAULT_IMAGE}
            alt={featured_image?.image_alt_text || 'Default Image'}
            fill
            className="object-cover w-full h-full"
            quality={100}
          />
        </div>

        <div className={cn('flex flex-col gap-2 p-4', 'grow-1 shrink-1 basis-auto')}>
          <h2 className="text-[27px] font-semibold tracking-[6px] uppercase">{display_name}</h2>
          <p className="text-[22px] tracking-[1px]">{getCoachPosition()}</p>
          <div className="flex gap-2">
            {certification_badgets?.map((badge, index) => {
              return (
                badge.image?.url && (
                  <div key={index}>
                    <Image
                      src={badge.image?.url}
                      alt={badge.image_alt_text || 'Default Image'}
                      width={50}
                      height={50}
                      className="object-cover"
                      quality={100}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalWrapper
        state={modalState}
        onClose={() => setModalState(false)}
        position="center"
        outSideClick={false}
        containerClasses="p-5 md:p-10 lg:p-20 border bg-dark rounded-none"
        maxWidthOverride="max-w-[728px] mx-auto"
        closeButtonColor="text-white"
      >
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-2.5">
            <h2 className="text-4xl font-semibold tracking-[4px] uppercase text-orange-bright">
              {display_name}
            </h2>
            <div className="text-lg text-white">
              <RichText content={content} />
            </div>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};
