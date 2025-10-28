import { IComponents, ISystemFields } from '@/lib/generated';
import { ReferencePlaceholder } from '../primitives/ReferencePlaceholder';

export const InlineBannerComponent = ({ reference }: IComponents['inline_banner_component']) => {
  return <ReferencePlaceholder references={reference as Array<ISystemFields>} />;
};
