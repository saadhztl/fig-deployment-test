import React, { useEffect, useRef, useState } from 'react';

type UseScrollFadeInOptions = {
  duration?: number;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
};

export const useScrollFadeIn = <T extends HTMLElement>({
  duration = 600,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
}: UseScrollFadeInOptions = {}) => {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (triggerOnce && node) {
            observer.unobserve(node);
          }
        } else if (!triggerOnce) {
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [threshold, triggerOnce]);

  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity ${duration}ms ${delay}ms, transform ${duration}ms ${delay}ms`,
    transitionTimingFunction: 'ease-in-out',
  };

  return { ref, style };
};
