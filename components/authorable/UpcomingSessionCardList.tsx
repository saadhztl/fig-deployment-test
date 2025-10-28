import { IComponents, ISystemFields } from '@/lib/generated';
import { Container } from '../primitives/Container';
import { FadeInSSRWrapper } from '../primitives/FadeInSSRWrapper';
import { ReferencePlaceholder } from '../primitives/ReferencePlaceholder';
import { cn } from '@/utils/cn';

export const UpcomingSessionCardList = ({
  references,
}: IComponents['upcoming_session_card_list']) => {
  return (
    <Container componentName="UpcomingSessionCardList">
      <FadeInSSRWrapper>
        <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-3')}>
          <ReferencePlaceholder references={references as Array<ISystemFields>} />
        </div>
      </FadeInSSRWrapper>
    </Container>
  );
};
