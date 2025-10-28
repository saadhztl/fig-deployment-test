'use client';
import { cn } from '@/utils/cn';
import { useCallback, useEffect, useRef, useState } from 'react';

interface MindBodyAppointmentsProps {
  state: boolean;
  outSideClick?: boolean;
  onClose: () => void;
  mindbody_widget_url?: string;
}

export const MindBodyAppointments = ({
  state = false,
  outSideClick = true,
  onClose,
  mindbody_widget_url,
}: MindBodyAppointmentsProps) => {
  const [isVisible, setIsVisible] = useState(state);
  const mindbodyRef = useRef<HTMLDivElement>(null);
  const mainContentNode: HTMLElement | null = document.querySelector('.main-content-node');

  const handleCloseClick = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onClose(), 200);
    document.body.style.overflow = 'unset';
    document.documentElement.style.overflow = 'visible';
  }, [onClose]);

  useEffect(() => {
    if (state) {
      setTimeout(() => setIsVisible(true), 10);

      if (mainContentNode) {
        mainContentNode.style.transform = 'translateX(-40%)';
        mainContentNode.style.cursor = '';
      }
    } else {
      setIsVisible(false);

      if (mainContentNode) {
        mainContentNode.style.transform = 'translateX(0)';
      }
    }
  }, [state]);

  useEffect(() => {
    if (state) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'visible';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'visible';
    };
  }, [state]);

  useEffect(() => {
    if (!state) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && outSideClick) {
        handleCloseClick();
      }
    };

    const handleModalEvent = (e: MouseEvent) => {
      if (outSideClick && mindbodyRef.current && !mindbodyRef.current.contains(e.target as Node)) {
        handleCloseClick();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    if (outSideClick) {
      document.addEventListener('click', handleModalEvent, true);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (outSideClick) {
        document.removeEventListener('click', handleModalEvent, true);
      }
    };
  }, [state, outSideClick, handleCloseClick]);

  if (!state) return null;

  return (
    <div className="fixed inset-0 z-[59] bg-black/50">
      <div
        ref={mindbodyRef}
        className={cn(
          'items-start h-[100vh] text-center top-0 right-0 fixed w-full md:w-2/5 translate-x-full transition-transform ease-out duration-500 bg-white z-[60]',
          'p-5',
          isVisible ? 'translate-x-0 flex' : 'translate-x-full',
          'mindbody-div'
        )}
      >
        <button
          className={cn(
            'absolute top-2 right-2 bg-background-default-2 inline-block ms-auto mb-3 text-black cursor-pointer z-10'
          )}
          onClick={handleCloseClick}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.2929 11.7071L5 17L6.41421 18.4142L11.7071 13.1213L17 18.4142L18.4142 17L13.1213 11.7071L18.4142 6.41421L17 5L11.7071 10.2929L6.41421 5L5 6.41421L10.2929 11.7071Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <div className={cn('w-full h-full max-h-[95vh]')}>
          <div className="h-full">
            <iframe
              src={mindbody_widget_url}
              allow="payment"
              scrolling="yes"
              className="w-full h-full overflow-auto"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
