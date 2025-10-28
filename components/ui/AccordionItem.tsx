import { cn } from '@/utils/cn';
import React from 'react';
import { RichText } from '../primitives/RichText';
import { StylingOptions } from '@/lib/types';
import { FAIcons } from '@/helpers/FAIcons';
import { Button } from '../primitives/Button';
import { CSLPFieldMapping } from '@/lib/generated';
import { getCSLPAttributes } from '@/lib/type-guards';
export type AccordionItemProps = {
  question?: string;
  answer?: string;
  styling_options?: StylingOptions;
  isAccordionOpen?: boolean;
  onToggle?: () => void;
  $?: CSLPFieldMapping;
};
export const AccordionItem = ({
  question,
  answer,
  styling_options,
  isAccordionOpen,
  onToggle,
  $,
}: AccordionItemProps) => {
  return (
    <div>
      <Button
        id={question}
        className={cn(
          'group py-4 px-5 md:py-3 md:px-6 w-full md:w-full flex justify-between items-center uppercase text-lg font-rawson font-bold leading-6 tracking-wider rounded-none gap-2.5',
          'hover:bg-[var(--hover-background-color)]! hover:text-[var(--hover-color)]!'
        )}
        aria-expanded={isAccordionOpen}
        aria-selected={isAccordionOpen}
        aria-controls={answer}
        onClick={onToggle}
        style={
          {
            '--hover-color': styling_options?.hover_text_color?.dropdown,
            '--hover-background-color': styling_options?.hover_background_color?.dropdown,
            backgroundColor: styling_options?.background_color?.dropdown,
            borderColor: styling_options?.border_color?.dropdown,
            color: styling_options?.text_color?.dropdown,
          } as React.CSSProperties
        }
        $={$}
      >
        <span className="text-left tracking-[1.26px]">{question}</span>
        <span
          className="group-hover:!text-[var(--hover-color)] w-6 h-6"
          style={
            {
              color: styling_options?.faq_accordion_icon_color?.dropdown,
              '--hover-color': styling_options?.hover_text_color?.dropdown,
            } as React.CSSProperties
          }
        >
          <FAIcons iconCode={!isAccordionOpen ? 'fas fa-circle-plus' : 'fas fa-circle-minus'} />
        </span>
      </Button>
      <div
        id={answer}
        className={cn(
          'transition-all duration-500 text-black h-full px-5 md:px-6 overflow-auto',
          isAccordionOpen ? 'max-h-screen py-4 border border-t-0' : 'max-h-0 py-0 border-0'
        )}
        style={
          {
            borderColor: styling_options?.border_color?.dropdown,
            backgroundColor: styling_options?.answer_background_color?.dropdown,
            color: styling_options?.answer_text_color?.dropdown,
          } as React.CSSProperties
        }
        role="region"
        tabIndex={isAccordionOpen ? 0 : -1}
        aria-labelledby={question}
        {...getCSLPAttributes($)}
      >
        <RichText content={answer} className="text-lg" />
      </div>
    </div>
  );
};
