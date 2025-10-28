'use client';

import { IComponents } from '@/lib/generated';
import { Container } from '../primitives/Container';
import { cn } from '@/utils/cn';
import { useCurrentScreenType, getBreakpoint } from '@/lib/hooks/useScreenType';

export const HorizontalDivider = ({
  divider_height,
  divider_color,
  divider_block_top_spacing,
  divider_block_bottom_spacing,
  inline_navigation_id,
}: IComponents['horizontal_divider']) => {
  const { screenType } = useCurrentScreenType();
  const isDesktop = getBreakpoint(screenType || 'desktop') >= getBreakpoint('desktop');
  return (
    <Container edgeToEdge fullScreen bottomPadded={false} id={inline_navigation_id}>
      <div
        className={cn('w-full')}
        style={
          {
            height: `${divider_height}px`,
            backgroundColor: divider_color?.dropdown,
            marginBlockStart: `${divider_block_top_spacing}px`,
            marginBlockEnd: isDesktop ? `${divider_block_bottom_spacing}px ` : '40px',
          } as React.CSSProperties
        }
      ></div>
    </Container>
  );
};
