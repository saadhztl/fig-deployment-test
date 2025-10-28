'use client';
import { useEffect, useRef, useCallback } from 'react';
import { RichText } from '../../primitives/RichText';
import { cn } from '@/utils/cn';
import { IComponents } from '@/lib/generated';
import { Container } from '@/components/primitives/Container';

const SCROLL_SPEED = 8;
const SCROLL_DELAY = 10;
const INITIAL_TRANSLATE = 150;

export const StripSlider = ({
  slider_text_content,
  styling_options,
}: IComponents['strip_slider']) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const elementScrollRef = useRef(INITIAL_TRANSLATE);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const scrollDirection = currentScroll > lastScrollRef.current ? -1 : 1;

      if (scrollRef.current) {
        elementScrollRef.current += scrollDirection * SCROLL_SPEED;
        scrollRef.current.style.left = `${elementScrollRef.current}px`;
      }

      lastScrollRef.current = currentScroll;
      timeoutIdRef.current = null;
    }, SCROLL_DELAY);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll, { passive: false });
        } else {
          window.removeEventListener('scroll', handleScroll);
          if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (visibleRef.current) {
      observer.observe(visibleRef.current);
    }

    return () => {
      if (visibleRef.current) {
        observer.unobserve(visibleRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <Container componentName="StripSlider" className={cn('overflow-hidden')} fullScreen edgeToEdge>
      <div
        ref={visibleRef}
        className={cn('w-full max-w-full overflow-hidden py-5')}
        style={
          {
            backgroundColor: styling_options?.background_color?.dropdown,
            color: styling_options?.text_color?.dropdown,
          } as React.CSSProperties
        }
      >
        <div
          ref={scrollRef}
          className={cn('w-full relative stripRichText', `left-[150px]`, 'uppercase')}
        >
          <RichText content={slider_text_content} className="text-2xl!" parentClassName="" />
        </div>
      </div>
    </Container>
  );
};
