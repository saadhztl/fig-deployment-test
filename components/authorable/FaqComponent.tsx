import { IComponents, ISystemFields } from '@/lib/generated';
import { ReferencePlaceholder } from '../primitives/ReferencePlaceholder';

export const FaqComponent = ({ reference }: IComponents['faq_component']) => {
  return <ReferencePlaceholder references={reference as Array<ISystemFields>} />;
};
