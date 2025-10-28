'use client';
import React from 'react';
import { cn } from '@/utils/cn';
import { useEffect, useState } from 'react';
import { HeadingTags, TextStylingOptions } from '@/lib/types';

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
  tag?: HeadingTags;
  styling_options?: TextStylingOptions;
  style?: React.CSSProperties;
}

export const GlitchText = ({
  children,
  className,
  tag = 'h2',
  styling_options,
  style,
}: GlitchTextProps) => {
  const [visible, setVisible] = useState(true);

  const baseStyles = {
    base: 'transition-opacity duration-200 ease-in-out',
    hover: '',
  };

  const combinedClassName = cn(
    Object.values({
      ...baseStyles,
    }).join(' '),
    'text-center',
    className,
    styling_options?.glowing_text && `glowingText ${styling_options.glow_color}`,
    styling_options?.font_style && `${styling_options.font_style}`,
    styling_options?.font_weight && `${styling_options.font_weight}`,
    styling_options?.font_size && `${styling_options.font_size}`
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    // Import NodeJS namespace for Timeout type
    // This is only needed for type annotation, but you can add:
    // import type { Timeout } from 'node:timers';
    // Or just import the NodeJS namespace:
    // import type * as NodeJS from 'node:timers';
    // However, in most React/Next.js projects, NodeJS.Timeout is available globally.
    // If you want to be explicit, add thimport type { Timeout } from 'node:timers';is at the top of your file:
    //
    const blinkThrice = async () => {
      for (let i = 0; i < 3; i++) {
        setVisible(false);
        await new Promise((res) => setTimeout(res, 80));
        setVisible(true);
        await new Promise((res) => setTimeout(res, 80));
      }
    };

    //Blink variants currently blink once and blink twice are implemented.
    const blinkOnce = async () => {
      setVisible(false);
      await new Promise((res) => setTimeout(res, 80));
      setVisible(true);
    };

    const blinkTwice = async () => {
      for (let i = 0; i < 2; i++) {
        setVisible(false);
        await new Promise((res) => setTimeout(res, 80));
        setVisible(true);
        await new Promise((res) => setTimeout(res, 80));
      }
    };

    const runBlink = async () => {
      const variation = Math.random();
      if (variation >= 0 && variation < 0.3) {
        await blinkOnce();
      } else if (variation >= 0.3 && variation < 0.6) {
        await blinkTwice();
      } else {
        await blinkThrice();
      }
      const nextDelay = Math.random() * 3000 + 3000;
      timeout = setTimeout(runBlink, nextDelay);
    };

    const initialDelay = Math.random() * 5000;
    timeout = setTimeout(runBlink, initialDelay);

    return () => clearTimeout(timeout);
  }, []);

  const Tag = tag;

  return (
    <Tag
      className={`${combinedClassName} ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={
        {
          color: styling_options?.text_color?.dropdown,
          textShadow: styling_options?.light_glow_css_property,
          ...style,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
};
