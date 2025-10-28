'use client';
import ModalWrapper from '@/helpers/ModalWrapper';
import { useColorMapper } from '@/lib/hooks/useColorMapper';
import { cn } from '@/utils/cn';
import React, { useState } from 'react';

export type InfoModalProps = {
  content?: React.ReactNode;
  modalTriggerText?: string;
  modalTriggerTextSize?: string;
  nopadding?: boolean;
  underlineColor?: string;
};

export const InfoModal = ({
  content,
  modalTriggerText,
  modalTriggerTextSize,
  nopadding,
  underlineColor,
}: InfoModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { borderColor, textColorHover } = useColorMapper();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'cursor-pointer uppercase',
          borderColor(underlineColor),
          textColorHover(underlineColor || ''),
          !nopadding && 'pb-1',
          underlineColor && 'border-b',
          modalTriggerTextSize ? modalTriggerTextSize : 'text-base leading-7 '
        )}
      >
        {modalTriggerText}
      </button>
      <ModalWrapper
        position="center"
        outSideClick
        maxWidthOverride="!max-w-content"
        onClose={() => setOpen(false)}
        containerClasses="p-4 bg-dark text-white border border-white rounded-none"
        state={open}
      >
        <div className="w-full h-full flex flex-col items-center justify-center">{content}</div>
      </ModalWrapper>
    </>
  );
};
