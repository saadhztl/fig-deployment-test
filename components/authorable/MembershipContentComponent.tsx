import { IComponents, ISystemFields } from '@/lib/generated';
import { ReferencePlaceholder } from '../primitives/ReferencePlaceholder';

export const MembershipContentComponent = ({
  reference,
}: IComponents['membership_content_component']) => {
  return <ReferencePlaceholder references={reference as Array<ISystemFields>} />;
};
