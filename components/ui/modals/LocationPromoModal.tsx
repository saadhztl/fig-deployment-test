'use client';
import { Button } from '@/components/primitives/Button';
import ModalWrapper from '@/helpers/ModalWrapper';
import { cn } from '@/utils/cn';
import React, { useState } from 'react';

export type LocationPromoModalProps = {
  content?: React.ReactNode;
  modalTriggerText?: string;
  modalTriggerTextSize?: string;
  nopadding?: boolean;
  themeColor?: string;
};

export const LocationPromoModal = ({
  modalTriggerText,
  themeColor,
  content,
}: LocationPromoModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={cn(
          `text-white hover:text-${themeColor}`,
          `border-0 border-b border-${themeColor}`,
          'p-0 py-1 rounded-none tracking-widest w-fit font-semibold text-base'
        )}
      >
        {modalTriggerText}
      </Button>
      <ModalWrapper
        position="center"
        outSideClick
        onClose={() => setOpen(false)}
        containerClasses="p-6 md:p-10 bg-dark text-white border border-white rounded-none"
        closeButtonColor="text-white"
        state={open}
      >
        <div className="w-full h-full flex flex-col items-center justify-center">{content}</div>
      </ModalWrapper>
    </>
  );
};
