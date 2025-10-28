import { IComponents, ISystemFields } from '@/lib/generated';
import { ReferencePlaceholder } from '@/components/primitives/ReferencePlaceholder';

export const HeroBannerComponent = (props: IComponents['hero_banner_component']) => {
  return (
    <>
      <ReferencePlaceholder references={props.hero_banner_reference as Array<ISystemFields>} />
    </>
  );
};
