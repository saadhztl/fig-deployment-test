import { IEventsLandingComponents, ISystemFields } from '@/lib/generated';
import { ReferencePlaceholder } from '../primitives/ReferencePlaceholder';

export const ContentRteComponent = ({
  content_rte_reference,
}: IEventsLandingComponents['content_rte_component']) => {
  return <ReferencePlaceholder references={content_rte_reference as Array<ISystemFields>} />;
};
