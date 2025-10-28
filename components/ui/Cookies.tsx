'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { useGetEntriesByUids } from '@/lib/hooks/useEntryData';
import { ICookiePolicy, ISystemFields } from '@/lib/generated';
import { RichText } from '@/components/primitives/RichText';

interface CookiesPopupProps {
  className?: string;
  cookiePolicyUid?: string;
}

interface ElementorData {
  __expiration: Record<string, never>;
  pageViews: number;
  sessions: number;
  popup_16781_times: number;
  popup_16781_disable: boolean;
}

export const Cookies = ({
  className,
  cookiePolicyUid = 'blt9bd063e0eee693ba',
}: CookiesPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Fetch cookie policy data from CMS
  const { data: cookieData, loading: cookieLoading } = useGetEntriesByUids({
    references: [
      {
        uid: cookiePolicyUid,
        _content_type_uid: 'cookie_policy',
      } as ISystemFields,
    ],
  });

  const cookiePolicy = cookieData?.[0]?.data as ICookiePolicy | undefined;

  // Initialize or update elementor data
  const getElementorData = (): ElementorData => {
    const stored = localStorage.getItem('elementor');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return {
          __expiration: {},
          pageViews: 1,
          sessions: 1,
          popup_16781_times: 0,
          popup_16781_disable: false,
        };
      }
    }
    return {
      __expiration: {},
      pageViews: 1,
      sessions: 1,
      popup_16781_times: 0,
      popup_16781_disable: false,
    };
  };

  const updateElementorData = (disable: boolean) => {
    const data = getElementorData();
    data.popup_16781_times += 1;
    data.popup_16781_disable = disable;
    data.pageViews += 1;
    localStorage.setItem('elementor', JSON.stringify(data));
  };

  useEffect(() => {
    // Don't show popup if CMS data is loading or disabled
    if (cookieLoading || cookiePolicy?.disable_cookie_policy) {
      return;
    }

    // Initialize elementor data on page load
    const elementorData = getElementorData();

    // Check if popup is disabled
    if (elementorData.popup_16781_disable) {
      return; // Don't show if user already made a choice
    }

    // Update page views
    elementorData.pageViews += 1;
    localStorage.setItem('elementor', JSON.stringify(elementorData));

    // Handle scroll event with smooth trigger
    const handleScroll = () => {
      if (window.scrollY > 10 && !shouldRender) {
        setShouldRender(true);
        // Increment popup times counter
        const data = getElementorData();
        data.popup_16781_times += 1;
        localStorage.setItem('elementor', JSON.stringify(data));

        // Small delay for smooth appearance
        setTimeout(() => {
          setIsVisible(true);
        }, 100);
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [shouldRender, cookieLoading, cookiePolicy]);

  const handleClose = () => {
    updateElementorData(true);
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setShouldRender(false);
    }, 300);
  };

  const handleAccept = () => {
    handleClose();
  };

  const handleDisagree = () => {
    handleClose();
  };

  // Don't render if loading, if it should not be rendered, or if cookie policy is disabled in CMS
  if (cookieLoading || !shouldRender || cookiePolicy?.disable_cookie_policy) {
    return null;
  }

  // Get button text from CMS
  const agreeButtonText = cookiePolicy?.agree_button_text;
  const disagreeButtonText = cookiePolicy?.disagree_button_text;

  return (
    <>
      {/* Backdrop overlay for mobile */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 md:hidden',
          'transition-opacity duration-300',
          isVisible && !isClosing ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Cookie Popup */}
      <div
        className={cn(
          // Base styles
          'fixed z-50 bg-black border-2 border-[#BFF300] p-6',
          'transition-all duration-500 ease-out',
          'md:bottom-5 md:left-30 md:max-w-[540px]',
          'bottom-0 left-0 right-0 mx-auto max-w-[90%] mb-4',
          'md:mx-0 md:mb-0',
          // Animation states
          isVisible && !isClosing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          className
        )}
      >
        <div className="flex flex-col gap-6 md:gap-[50px]">
          {/* Text Content */}
          <div className="text-white text-center md:text-left">
            {cookiePolicy?.cookie_policy_content && (
              <RichText
                content={cookiePolicy.cookie_policy_content}
                className="text-base leading-relaxed [&_a]:text-yellow [&_a]:font-bold [&_a]:hover:underline [&_a]:transition-all"
                parseType="html"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:justify-end">
            <button
              onClick={handleDisagree}
              className={cn(
                'px-8 py-3 w-full md:w-auto md:min-w-[130px]',
                'bg-white text-black font-bold uppercase',
                'border-2 border-white rounded-md',
                'hover:bg-transparent hover:text-white',
                'transition-all duration-300',
                'text-sm tracking-wide'
              )}
            >
              {disagreeButtonText}
            </button>
            <button
              onClick={handleAccept}
              className={cn(
                'px-8 py-3 w-full md:w-auto md:min-w-[130px]',
                'bg-light text-black font-bold uppercase',
                'border-2 border-light rounded-md',
                'hover:bg-transparent hover:text-light hover:border-light',
                'transition-all duration-300',
                'text-sm tracking-wide'
              )}
            >
              {agreeButtonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cookies;
