'use client';
import React, { useState } from 'react';
import { AccordionItem } from '@/components/ui/AccordionItem';
import { cn } from '@/utils/cn';
import { StyledText } from '@/components/primitives/StyledText';
import { IFaq } from '@/lib/generated';
import { TextStylingOptions, StylingOptions } from '@/lib/types';
import { Container } from '@/components/primitives/Container';
import { Button } from '@/components/primitives/Button';
import { FAIcons } from '@/helpers/FAIcons';
import { getCSLPAttributes } from '@/lib/type-guards';

export const Faq = ({
  heading,
  faq_list,
  allow_multiple_open_faqs,
  call_to_actions,
  styling_options,
  $,
}: IFaq) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (allow_multiple_open_faqs) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndex(openIndex === index ? null : index);
    }
  };
  return (
    <Container componentName="Faq" styling_options={styling_options as StylingOptions}>
      <div
        className={cn(
          'flex flex-col gap-10 w-full',
          styling_options?.container_spacing_options?.block_padding &&
            `${styling_options?.container_spacing_options?.block_padding}`,
          styling_options?.container_spacing_options?.inline_padding &&
            `${styling_options?.container_spacing_options?.inline_padding}`
        )}
      >
        {heading?.text && (
          <StyledText
            className={cn(heading.styling_options?.font_size)}
            text={heading.text}
            styling_options={heading.styling_options as TextStylingOptions}
            $={$?.heading}
          ></StyledText>
        )}

        <ul role="presentation" className="w-full flex flex-col gap-5 text-start">
          {faq_list?.faq_item?.map((i, index) => {
            const isOpen = allow_multiple_open_faqs
              ? openIndexes.includes(index)
              : openIndex === index;
            return (
              <li key={index} className="w-full" {...getCSLPAttributes($?.faq_list)}>
                <AccordionItem
                  question={i.question}
                  answer={i.answer}
                  styling_options={styling_options as StylingOptions}
                  isAccordionOpen={isOpen}
                  onToggle={() => handleToggle(index)}
                  $={$?.faq_list}
                />
              </li>
            );
          })}
        </ul>

        {call_to_actions?.cta?.length && call_to_actions?.cta?.length > 0 ? (
          <div className="flex gap-5 flex-col md:flex-row justify-center items-center">
            {call_to_actions?.cta?.map((cta, index) => (
              <Button
                key={index}
                href={cta.link?.href}
                styling_options={cta.styling_options as StylingOptions}
                className={cn(
                  'py-2.5 px-9 text-lg',
                  'flex gap-2.5 justify-center items-center',
                  'w-auto md:w-fit'
                )}
                $={cta.$?.link}
              >
                {cta.link?.title}

                {cta.font_awesome_icon_code && <FAIcons iconCode={cta.font_awesome_icon_code} />}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
    </Container>
  );
};
