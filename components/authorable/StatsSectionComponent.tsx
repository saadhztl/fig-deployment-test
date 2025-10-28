import { IComponents, ISystemFields } from '@/lib/generated';
import { ReferencePlaceholder } from '../primitives/ReferencePlaceholder';

export const StatsSectionComponent = ({ reference }: IComponents['stats_section_component']) => {
  return (
    <ReferencePlaceholder references={reference as Array<ISystemFields>}></ReferencePlaceholder>
  );
};
