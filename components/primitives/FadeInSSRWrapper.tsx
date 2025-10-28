'use client';
import { useScrollFadeIn } from '@/lib/hooks/useScrollFadeIn';
import React, { ReactNode } from 'react';
import { getCSLPAttributes } from '@/lib/type-guards';
import { CSLPFieldMapping } from '@/lib/generated';

export type FadeInSSRWraperProps = {
  children?: ReactNode;
  duration?: number;
  delay?: number;
  $?: CSLPFieldMapping;
};
export const FadeInSSRWrapper = ({ children, duration, delay, $ }: FadeInSSRWraperProps) => {
  const fade = useScrollFadeIn<HTMLDivElement>({ duration, delay });
  return (
    <div ref={fade.ref} style={fade.style} {...getCSLPAttributes($)}>
      {children}
    </div>
  );
};
