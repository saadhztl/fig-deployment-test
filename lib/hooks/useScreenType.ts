import { useEffect, useState } from 'react';

export type ScreenTypes = 'mobile' | 'tablet' | 'desktop' | 'desktop-lg';

export type ScreenSizeProps = {
  screenType: ScreenTypes | undefined;
  currentScreenWidth: number;
  isScreenTypeDetected: boolean;
};

const breakpoints: Record<ScreenTypes, number> = {
  mobile: 220,
  tablet: 376,
  desktop: 768,
  'desktop-lg': 1024,
};

export function useCurrentScreenType() {
  const [screenType, setScreenType] = useState<ScreenSizeProps>({
    screenType: undefined,
    currentScreenWidth: 0,
    isScreenTypeDetected: false,
  });

  // Set screenType on first load
  useEffect(() => {
    setScreenType(getScreenType(window.innerWidth));
  }, []);

  // Update screenType on resize
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    function handleResize(): void {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        if (window.innerWidth !== screenType.currentScreenWidth) {
          setScreenType(getScreenType(window.innerWidth));
        }
      }, 100);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [screenType]);

  return screenType;
}

export const getScreenType = (currentScreenWidth: number): ScreenSizeProps => {
  const screenTypes: Array<{ type: ScreenTypes; minWidth: number }> = [
    { type: 'desktop-lg', minWidth: breakpoints['desktop-lg'] },
    { type: 'desktop', minWidth: breakpoints.desktop },
    { type: 'tablet', minWidth: breakpoints.tablet },
    { type: 'mobile', minWidth: breakpoints.mobile },
  ];

  const foundScreenType = screenTypes.find(({ minWidth }) => currentScreenWidth >= minWidth);
  const screenType = foundScreenType ? foundScreenType.type : undefined;

  return {
    screenType,
    currentScreenWidth,
    isScreenTypeDetected: true,
  };
};

export const getBreakpoint = (screenType: ScreenTypes) => {
  return breakpoints[screenType];
};
