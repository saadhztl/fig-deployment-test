import { IEventsDetailComponents, ISystemFields } from '@/lib/generated';
import { ReferencePlaceholder } from '../primitives/ReferencePlaceholder';

export const RteStripComponent = ({
  reference,
}: IEventsDetailComponents['rte_strip_component']) => {
  return (
    <ReferencePlaceholder references={reference as Array<ISystemFields>}></ReferencePlaceholder>
  );
};
