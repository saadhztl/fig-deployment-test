import { ReferencePlaceholder } from '@/components/primitives/ReferencePlaceholder';
import { IComponents, ISystemFields } from '@/lib/generated';

export const BoxCards = ({ reference }: IComponents['box_cards']) => {
  return (
    <>
      <ReferencePlaceholder references={reference as Array<ISystemFields>} />
    </>
  );
};
