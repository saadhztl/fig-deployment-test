'use client';
import ModalWrapper from '@/helpers/ModalWrapper';
import { IImageField } from '@/lib/generated';
import React, { useState } from 'react';
import { ZoomWrapper } from '../ZoomWrapper';
import Image from 'next/image';

export type LocationHeroModalProps = {
  floorPlanImage?: IImageField;
  modalTriggerText?: string;
};

export const LocationHeroModal = ({ floorPlanImage, modalTriggerText }: LocationHeroModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer p-0 text-xl leading-7 uppercase hover:text-light"
      >
        {modalTriggerText}
      </button>
      {floorPlanImage?.image?.url && (
        <ModalWrapper
          position="center"
          outSideClick
          onClose={() => setOpen(false)}
          containerClasses="p-4 bg-gray-light text-dark"
          state={open}
        >
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="md:block hidden">
              <ZoomWrapper image={{ image: floorPlanImage?.image }} trigger={open} />
            </span>
            <span className="block md:hidden">
              <Image
                alt={floorPlanImage?.image_alt_text || ''}
                src={floorPlanImage?.image.url || ''}
                width={600}
                height={600}
                quality={100}
              />
            </span>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};
