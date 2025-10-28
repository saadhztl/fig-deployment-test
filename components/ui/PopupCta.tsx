'use client';
import { useState } from 'react';
import { Button } from '../primitives/Button';
import { Container } from '../primitives/Container';
import { IPopupCta } from '@/lib/generated';
import ModalWrapper from '@/helpers/ModalWrapper';
import { StyledText } from '../primitives/StyledText';
import { RichText } from '../primitives/RichText';
import { TextStylingOptions } from '@/lib/types';
import { cn } from '@/utils/cn';

export const PopupCta = ({
  cta_label,
  popup_heading,
  popup_content,
  cta_styling_options,
  popup_styling_options,
  $,
}: IPopupCta) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Container componentName="PopupCta">
      <div className={cn('flex items-center', cta_styling_options?.cta_horizontal_alignment)}>
        <Button
          onClick={() => setOpen(true)}
          className="p-0 text-white bg-transparent font-semibold border-0 border-b-3 w-fit md:w-fit rounded-none tracking-widest text-lg hover:text-[var(--hover-text-color)]! hover:border-[var(--hover-border-color)]!"
          style={{
            color: cta_styling_options?.text_color?.dropdown,
            borderColor: cta_styling_options?.border_color?.dropdown,
            '--hover-text-color': cta_styling_options?.hover_text_color?.dropdown,
            '--hover-border-color': cta_styling_options?.hover_border_color?.dropdown,
          }}
          $={$?.title}
        >
          {cta_label}
        </Button>
        <ModalWrapper
          state={open}
          onClose={() => setOpen(false)}
          containerClasses="p-5 md:px-14 md:py-8 rounded-none"
          maxWidthOverride="!max-w-[950px]"
          popupStylingOptions={popup_styling_options}
        >
          <div className="flex flex-col gap-5 h-full">
            {popup_heading?.text && (
              <StyledText
                text={popup_heading.text}
                styling_options={popup_heading.styling_options as TextStylingOptions}
                className="text-start uppercase tracking-[1px]"
                $={$?.popup_heading}
              />
            )}
            <div className="overflow-y-auto h-full">
              {popup_content && <RichText content={popup_content} $={$?.popup_content} />}
            </div>
          </div>
        </ModalWrapper>
      </div>
    </Container>
  );
};
