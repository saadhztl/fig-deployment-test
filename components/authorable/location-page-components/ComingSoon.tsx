import { Container } from '@/components/primitives/Container';
import { RichText } from '@/components/primitives/RichText';
import { ILocationComponents } from '@/lib/generated';
import { IExtendedProps } from '@/lib/types';
import { cn } from '@/utils/cn';

export const ComingSoon = ({
  coming_soon_text,
  extendedProps,
}: ILocationComponents['coming_soon'] & IExtendedProps) => {
  return (
    extendedProps?.enable_coming_soon && (
      <Container componentName="Coming Soon" className={cn('bg-light pt-2.5')}>
        <div className="flex justify-center items-center">
          <RichText
            content={coming_soon_text}
            className="text-dark uppercase tracking-widest text-2xl leading-9"
            parentClassName="comingsoon-richtext"
          />
        </div>
      </Container>
    )
  );
};
