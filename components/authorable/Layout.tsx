import React from 'react';
import { ReferencePlaceholder } from '../primitives/ReferencePlaceholder';
import { ISystemFields } from '@/lib/generated';
import { Container } from '../primitives/Container';
import { IComponents } from '@/lib/generated';
import { cn } from '@/utils/cn';
import { FadeInSSRWrapper } from '../primitives/FadeInSSRWrapper';

// Object mappings for layout types to Tailwind classes
const layoutClasses = {
  '50/50': {
    left: 'md:basis-1/2 md:max-w-[50%]',
    right: 'md:basis-1/2 md:max-w-[50%]',
  },
  '25/75': {
    left: 'md:basis-1/4 md:max-w-[25%]',
    right: 'md:basis-3/4 md:max-w-[75%]',
  },
  '75/25': {
    left: 'md:basis-3/4 md:max-w-[75%]',
    right: 'md:basis-1/4 md:max-w-[25%]',
  },
  '40/60': {
    left: 'md:basis-[40%] md:max-w-[40%]',
    right: 'md:basis-[60%] md:max-w-[60%]',
  },
  '60/40': {
    left: 'md:basis-[60%] md:max-w-[60%]',
    right: 'md:basis-[40%] md:max-w-[40%]',
  },
} as const;

const getLayoutClasses = (
  type: IComponents['layout']['layout_type'] | undefined,
  position: 'left' | 'right'
) => {
  const layoutType = type || '50/50';
  return (
    layoutClasses[layoutType as keyof typeof layoutClasses]?.[position] ||
    layoutClasses['50/50'][position]
  );
};

export const Layout = ({
  layout_type,
  left_column_items,
  right_column_items,
  inline_navigation_id,
  enable_reverse_layout_for_small_screens,
}: IComponents['layout']) => {
  return (
    <Container className="layoutcomponent">
      <FadeInSSRWrapper>
        <div
          className={cn(
            'w-full flex flex-col md:flex-row gap-x-10 justify-center items-stretch',
            enable_reverse_layout_for_small_screens && 'flex-col-reverse'
          )}
          id={inline_navigation_id}
        >
          <div
            className={cn(
              'flex flex-col justify-center',
              getLayoutClasses(layout_type, 'left'),
              !enable_reverse_layout_for_small_screens && 'pb-[40px] md:pb-0'
            )}
          >
            {left_column_items?.map((section, index) => {
              const references = [
                { _content_type_uid: section._content_type_uid, uid: section.uid },
              ] as Array<ISystemFields>;
              return <ReferencePlaceholder key={index} references={references} />;
            })}
          </div>

          <div
            className={cn(
              'flex flex-col justify-center',
              getLayoutClasses(layout_type, 'right'),
              enable_reverse_layout_for_small_screens && 'pb-[40px] md:pb-0'
            )}
          >
            {right_column_items?.map((section, index) => {
              const references = [
                { _content_type_uid: section._content_type_uid, uid: section.uid },
              ] as Array<ISystemFields>;
              return <ReferencePlaceholder key={index} references={references} />;
            })}
          </div>
        </div>
      </FadeInSSRWrapper>
    </Container>
  );
};
