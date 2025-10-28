import { IComponents, ISystemFields } from '@/lib/generated';
import { Container } from '../primitives/Container';
import { ReferencePlaceholder } from '../primitives/ReferencePlaceholder';

export const VideoComponent = ({ reference }: IComponents['video_component']) => {
  return (
    <Container componentName="VideoComponent">
      <ReferencePlaceholder references={reference as Array<ISystemFields>} />
    </Container>
  );
};
