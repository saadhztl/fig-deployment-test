import React from 'react';
import { IForm } from '@/lib/generated';
import { componentMapper } from '@/config/registered-components';

export const Form = (props: IForm) => {
  const Component = componentMapper.getComponent(props.form_name);

  return <Component {...props} />;
};
