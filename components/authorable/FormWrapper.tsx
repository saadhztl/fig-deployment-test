import React from 'react';
import { IComponents, ISystemFields } from '@/lib/generated';
import { ReferencePlaceholder } from '../primitives/ReferencePlaceholder';

export const FormWrapper = ({ reference }: IComponents['form_wrapper']) => {
  return <ReferencePlaceholder references={reference as Array<ISystemFields>} />;
};
