import React, { PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';
import { StylingOptions } from '@/lib/types';

interface ContainerProps {
  componentName?: string;
  className?: string;
  fullScreen?: boolean;
  edgeToEdge?: boolean;
  content?: boolean;
  topPadded?: boolean;
  bottomPadded?: boolean;
  maxWidthOverride?: string;
  tag?: 'section' | 'div' | 'header' | 'footer';
  styling_options?: StylingOptions;
  id?: string;
}

export const Container = ({
  componentName,
  className,
  fullScreen,
  styling_options,
  edgeToEdge,
  maxWidthOverride,
  topPadded = true,
  bottomPadded = true,
  children,
  tag = 'section',
  id,
}: ContainerProps & PropsWithChildren) => {
  const Tag = tag;

  return (
    <Tag
      className={cn(
        componentName,
        'mb-10 md:mb-20',
        className,
        !topPadded && 'pt-0',
        !bottomPadded && 'mb-0 md:mb-0',
        styling_options?.bottom_strip && 'hero-overlay before:!border-[var(--strip-color)]'
      )}
      style={
        {
          backgroundColor: styling_options?.container_background_color?.dropdown,
          '--strip-color': styling_options?.strip_color?.dropdown,
        } as React.CSSProperties
      }
      id={id}
    >
      <div
        className={cn(
          'w-full px-5 large-desktop:px-0 mx-auto',
          !fullScreen && 'max-w-large-desktop',
          maxWidthOverride,
          edgeToEdge && 'px-0'
        )}
      >
        {children}
      </div>
    </Tag>
  );
};
