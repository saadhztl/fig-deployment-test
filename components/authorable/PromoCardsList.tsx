import React from 'react';
import { cn } from '@/utils/cn';
import { Container } from '../primitives/Container';
import { IComponents, ISystemFields } from '@/lib/generated';
import { ReferencePlaceholder } from '../primitives/ReferencePlaceholder';

export const PromoCardsList = ({ reference }: IComponents['promo_cards_list']) => {
  const handleColumns = () => {
    if (reference?.length === 1) {
      return 'md:grid-cols-1';
    } else if (reference?.length === 2) {
      return 'md:grid-cols-2';
    } else if (reference?.length === 3) {
      return 'md:grid-cols-3';
    } else if (reference?.length === 4) {
      return 'md:grid-cols-4';
    }
  };
  return (
    <Container componentName="PromoCardsList">
      <div className={cn('grid', handleColumns())}>
        <ReferencePlaceholder references={reference as Array<ISystemFields>} />
      </div>
    </Container>
  );
};
