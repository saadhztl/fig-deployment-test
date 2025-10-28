import { IComponents, ISystemFields } from '@/lib/generated';
import { ReferencePlaceholder } from '@/components/primitives/ReferencePlaceholder';

export const SliderComponent = (props: IComponents['slider_component']) => {
  return (
    <>
      <ReferencePlaceholder references={props.slider_type as Array<ISystemFields>} />
    </>
  );
};
