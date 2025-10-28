'use client';
import React, { useEffect, useState } from 'react';
import { DotLottie, DotLottieReact, Mode } from '@lottiefiles/dotlottie-react';

export type LottieAnimationProps = {
  autoplay?: boolean;
  backgroundColor?: string;
  data?: string | ArrayBuffer;
  delay?: number;
  height?: number;
  loop?: boolean;
  mode?: string;
  playOnHover?: boolean;
  speed?: number;
  src?: string;
  width?: number;
  customStyle?: React.CSSProperties;
};

export const LottieAnimation = ({
  autoplay = true,
  backgroundColor,
  data,
  height,
  loop,
  mode,
  speed = 0.5,
  delay,
  src,
  width,
  customStyle,
}: LottieAnimationProps) => {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const handleDelay = (l: DotLottie, d: number) => {
    setTimeout(() => {
      l.play();
    }, d * 1000);
  };
  useEffect(() => {
    if (dotLottie && delay) {
      dotLottie?.addEventListener('complete', () => {
        handleDelay(dotLottie, delay);
      });
    }
    return () => {
      dotLottie?.removeEventListener('complete', () => {
        handleDelay(dotLottie, delay ?? 0);
      });
    };
  }, [dotLottie]);

  return (
    <DotLottieReact
      dotLottieRefCallback={(lottie) => {
        setDotLottie(lottie);
      }}
      renderConfig={{ autoResize: true }}
      autoplay={autoplay}
      backgroundColor={backgroundColor}
      data={data}
      loop={delay ? undefined : loop}
      mode={mode as Mode}
      speed={speed}
      src={src}
      style={{
        width: `${width ? width + 'px' : '100%'}`,
        height: `${height ? height + 'px' : '100%'}`,
        maxWidth: '100%',
        ...customStyle,
      }}
    />
  );
};
