import { ILocationComponents } from '@/lib/generated';
import { Container } from '../primitives/Container';
import { StylingOptions } from '@/lib/types';
import { RichText } from '../primitives/RichText';
import { cn } from '@/utils/cn';

export const SingleRteStrip = ({
  rte_content,
  styling_options,
}: ILocationComponents['single_rte_strip']) => {
  return (
    <Container styling_options={styling_options as StylingOptions}>
      <div
        className={cn(
          'flex justify-center items-center text-center',
          `${styling_options?.spacing_options?.inline_padding} ${styling_options?.spacing_options?.block_padding}`
        )}
        style={
          {
            color: styling_options?.text_color?.dropdown,
          } as React.CSSProperties
        }
      >
        <RichText
          content={rte_content}
          className="text-xl lg:text-2xl uppercase"
          parentClassName=""
        />
      </div>
    </Container>
  );
};
