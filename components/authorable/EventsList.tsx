import { IEventsLandingComponents, ISystemFields } from '@/lib/generated';
import { Container } from '../primitives/Container';
import { StyledText } from '../primitives/StyledText';
import { TextStylingOptions } from '@/lib/types';
import { ReferencePlaceholder } from '../primitives/ReferencePlaceholder';
import { cn } from '@/utils/cn';

export const EventsList = ({
  heading,
  reference,
  cards_per_column,
  $,
}: IEventsLandingComponents['events_list']) => {
  return (
    <Container componentName="EventsList">
      <div className="flex flex-col gap-5">
        {heading?.text && (
          <StyledText
            text={heading.text}
            styling_options={heading.styling_options as TextStylingOptions}
            tag="h2"
            $={$?.heading}
          />
        )}

        <div className={cn('grid', cards_per_column)}>
          <ReferencePlaceholder references={reference as Array<ISystemFields>} />
        </div>
      </div>
    </Container>
  );
};
