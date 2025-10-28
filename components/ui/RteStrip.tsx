import { IRteStrip } from '@/lib/generated';
import { Container } from '../primitives/Container';
import { StylingOptions } from '@/lib/types';
import { cn } from '@/utils/cn';
import { RichText } from '../primitives/RichText';

export const RteStrip = ({
  left_text_content,
  right_text_content,
  styling_options,
  $,
}: IRteStrip) => {
  return (
    <Container
      componentName="RteStrip"
      styling_options={styling_options as StylingOptions}
      bottomPadded={!styling_options?.disable_bottom_spacing}
    >
      <div
        className={cn(
          'flex flex-col lg:flex-row justify-center items-center lg:justify-between lg:items-center',
          styling_options?.spacing_options?.block_padding &&
            `${styling_options?.spacing_options?.block_padding}`,
          styling_options?.spacing_options?.inline_padding &&
            `${styling_options?.spacing_options?.inline_padding}`
        )}
        style={
          {
            color: styling_options?.text_color?.dropdown,
          } as React.CSSProperties
        }
      >
        {left_text_content && (
          <RichText
            content={left_text_content}
            parentClassName="strip-banner-rte"
            className={cn(
              'uppercase text-2xl md:text-[22px] tracking-[2px] w-fit!',
              'text-center lg:text-start',
              !right_text_content && 'lg:text-center!'
            )}
            $={$?.left_text_content}
          />
        )}
        {right_text_content && (
          <RichText
            content={right_text_content}
            parentClassName="strip-banner-rte"
            className={cn(
              'uppercase text-lg md:text-[22px] tracking-[2px] w-fit!',
              'text-center lg:text-end',
              !left_text_content && 'lg:text-center!'
            )}
            $={$?.right_text_content}
          />
        )}
      </div>
    </Container>
  );
};
