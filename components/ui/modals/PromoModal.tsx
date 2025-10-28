'use client';
import { Button } from '@/components/primitives/Button';
import { FAIcons } from '@/helpers/FAIcons';
import ModalWrapper from '@/helpers/ModalWrapper';
import { IImageField, ILink } from '@/lib/generated';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import React, { useState } from 'react';

export type PromoModalProps = {
  modalCtaObject?: { cta?: ILink; open_in_new_window: boolean; font_awesome_icon_code?: string };
  textHoverColor?: string;
  menuImages?: IImageField[];
};

export const PromoModal = ({ modalCtaObject, textHoverColor, menuImages }: PromoModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={cn(
          'flex items-center gap-2 justify-between w-full text-2xl leading-9 font-semibold hover:text-[var(--hover-color)] uppercase p-0 border-0 md:w-full'
        )}
        style={
          {
            '--hover-color': textHoverColor,
          } as React.CSSProperties
        }
      >
        {modalCtaObject?.cta?.title}
        <span>
          <FAIcons
            iconCode={modalCtaObject?.font_awesome_icon_code}
            className="text-[var(--hover-color)]"
          />
        </span>
      </Button>
      <ModalWrapper
        position="center"
        outSideClick
        onClose={() => setOpen(false)}
        containerClasses="p-2 md:p-10 bg-dark text-white border border-white rounded-none"
        state={open}
        closeButtonColor="text-white"
      >
        <div className=" w-full h-full flex flex-col items-center justify-start gap-5 overflow-auto p-5">
          {menuImages?.map(
            (image, index) =>
              image.image?.url && (
                <div key={index} className="w-full h-auto">
                  <Image
                    src={image.image?.url}
                    alt={image.image_alt_text || 'Menu Image'}
                    width={580}
                    height={388}
                    className="object-cover w-full h-auto"
                    quality={100}
                  />
                </div>
              )
          )}
        </div>
      </ModalWrapper>
    </>
  );
};
