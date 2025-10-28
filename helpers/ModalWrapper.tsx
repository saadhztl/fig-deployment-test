'use client';
import { Button } from '@/components/primitives/Button';
import { IColorDropdown } from '@/lib/generated';
import { cn } from '@/utils/cn';
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const ModalWrapper: React.FC<{
  state: boolean;
  onClose: () => void;
  closeButtonColor?: string;
  children: ReactNode;
  containerClasses?: string;
  maxWidthOverride?: string;
  position?: 'top' | 'center';
  outSideClick?: boolean;
  enableCloseButton?: boolean;

  popupStylingOptions?: {
    text_color?: IColorDropdown;
    background_color?: IColorDropdown;
    border_color?: IColorDropdown;
  };
}> = ({
  state,
  onClose,
  closeButtonColor,
  children,
  containerClasses,
  position = 'center',
  maxWidthOverride,
  outSideClick = true,
  popupStylingOptions,
  enableCloseButton = false,
}) => {
  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Handle open/close animation
  useEffect(() => {
    if (state) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [state]);

  // Unified handler for closing modal
  const handleCloseClick = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onClose(), 800);
    document.body.style.overflow = 'unset';
    document.documentElement.style.overflow = 'visible';
  }, [onClose]);

  // Handle Escape key and outside click
  useEffect(() => {
    if (!state) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && outSideClick) {
        handleCloseClick();
      }
    };

    const handleModalEvent = (e: MouseEvent) => {
      if (
        outSideClick &&
        modalContainerRef.current &&
        !modalContainerRef.current.contains(e.target as Node)
      ) {
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

  // Handle body/document overflow
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

  if (!state) return null;

  // Ensure we're in the browser before accessing document.body
  if (typeof document === 'undefined') return null;

  const modalContent = (
    <div
      className={cn(
        'fixed inset-0 w-full h-full flex bg-[#0000008c] z-[999] overflow-y-auto p-4 md:p-8 transition-all duration-500'
      )}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cn(
          'w-full h-full flex flex-col items-center',
          position === 'top' ? 'justify-start  pt-10 md:pt-24' : 'justify-center'
        )}
      >
        <div
          className={cn(
            'bg-white rounded-lg shadow-lg overflow-hidden p-4 max-w-max-content relative w-fit border max-h-3/4 md:max-h-fit',
            'transition-all duration-1000',
            isVisible
              ? 'opacity-100 pointer-events-auto translate-y-0'
              : 'opacity-0 pointer-events-none scale-95 -translate-y-full',
            containerClasses,
            maxWidthOverride,
            !enableCloseButton && 'relative'
          )}
          ref={modalContainerRef}
          style={
            {
              backgroundColor: popupStylingOptions?.background_color?.dropdown,
              color: popupStylingOptions?.text_color?.dropdown,
              borderColor: popupStylingOptions?.border_color?.dropdown,
            } as React.CSSProperties
          }
        >
          {!enableCloseButton && (
            <button
              className={cn(
                'absolute top-2 right-2 bg-background-default-2 inline-block ms-auto mb-3 text-black cursor-pointer z-10',
                closeButtonColor
              )}
              onClick={handleCloseClick}
              aria-label="Close"
              style={
                {
                  color: popupStylingOptions?.text_color?.dropdown,
                } as React.CSSProperties
              }
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
          )}
          <div className={cn('h-full')}>
            <div
              className={`h-full bg-colors-surface-brand-white transition-all duration-500 rounded-2xl ${
                state ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="modal-body h-full w-full flex flex-col justify-between items-center gap-5">
                {children}
                {enableCloseButton && (
                  <Button
                    onClick={handleCloseClick}
                    className={cn(
                      'text-center bg-green-dark text-white px-5 py-2.5 rounded-[30px] w-fit min-w-[150px] uppercase font-semibold'
                    )}
                  >
                    Close
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render modal using portal directly under document.body
  return createPortal(modalContent, document.body);
};

export default ModalWrapper;
