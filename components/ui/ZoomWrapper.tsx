'use client';
import React, { useEffect, useRef } from 'react';
import 'zoomist/css';
import Zoomist from 'zoomist';
import Image from 'next/image';
import { IImageField } from '@/lib/generated';

export type ZoomWrapperProps = {
  image: IImageField;
  trigger?: boolean;
};

export const ZoomWrapper = ({ image, trigger }: ZoomWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomBoom = (c: HTMLDivElement) => {
    setTimeout(() => {
      return new Zoomist(c, {
        slider: true,
        zoomer: true,
        smooth: true,
        initScale: 0.8,
        minScale: 0.8,
        bounds: false,
      });
    }, 500);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    zoomBoom(container);
  }, [containerRef, trigger]);

  return (
    <div ref={containerRef} className="zoomist-container zoomer mx-auto max-w-[75vw]">
      <div className="zoomist-wrapper">
        <div className="zoomist-image mx-auto relative max-w-content">
          <Image
            alt={image.image_alt_text || ''}
            src={image.image?.url || ''}
            width={600}
            height={600}
            quality={100}
          />
        </div>
      </div>
    </div>
  );
};
