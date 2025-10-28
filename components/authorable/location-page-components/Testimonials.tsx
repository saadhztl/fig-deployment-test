import React from 'react';
import { Container } from '../../primitives/Container';
import { Button } from '../../primitives/Button';
import { Testimonial } from '../../ui/Testimonial';
import { ILocationComponents } from '@/lib/generated';
import { StylingOptions, TextStylingOptions } from '@/lib/types';
import { cn } from '@/utils/cn';
import { StyledText } from '@/components/primitives/StyledText';

export const Testimonials = ({
  heading,
  testimonial_item,
  call_to_actions,
  $,
}: ILocationComponents['testimonials']) => {
  return (
    <Container componentName="Testimonials" className={'text-white'}>
      <div className={cn('w-full', 'flex flex-col items-start tablet:items-center')}>
        {heading?.text && (
          <StyledText
            className="max-w-max mb-[38px] px-0 md:px-5 tracking-[2px]"
            text={heading.text}
            styling_options={heading.styling_options as TextStylingOptions}
            tag="h2"
            $={$?.heading}
          />
        )}
        <div className="w-full grid tablet:grid-cols-3">
          {testimonial_item?.map((t) => {
            return <Testimonial key={t.author} {...t} $={t.$} />;
          })}
        </div>
        {call_to_actions?.length && call_to_actions.length > 0 ? (
          <div className="flex flex-col flex-wrap md:flex-row justify-center items-center w-full gap-x-5">
            {call_to_actions.map((cta, index) => (
              <Button
                key={index}
                href={cta?.cta?.link?.href}
                styling_options={cta.cta?.styling_options as StylingOptions}
                className="w-full text-center tablet:w-fit mt-[30px] text-lg font-semibold tracking-[2px] px-6 py-3"
                $={cta.$?.cta}
              >
                {cta.cta?.link?.title}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
    </Container>
  );
};
