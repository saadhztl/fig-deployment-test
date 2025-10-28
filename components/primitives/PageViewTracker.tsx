'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { dataLayerInstance } from '@/utils/gtm-utils';

/**
 * PageViewTracker component that automatically tracks page views
 * whenever the route changes in the Next.js app.
 *
 * This component should be included once in the app layout to ensure
 * all page navigations are tracked.
 */
export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Call pageView on initial load and whenever pathname changes
    dataLayerInstance.trackPageView();
  }, [pathname]);

  // This component doesn't render anything visible
  return null;
}
