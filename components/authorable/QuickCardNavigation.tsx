'use client';
import { useEffect, useRef } from 'react';
import { IComponents } from '@/lib/generated';
import { StyledText } from '@/components/primitives/StyledText';
import { TextStylingOptions } from '@/lib/types';
import Link from 'next/link';
import { Container } from '../primitives/Container';
import { getCSLPAttributes } from '@/lib/type-guards';

export const QuickCardNavigation = ({
  navigation_cards,
  $,
}: IComponents['quick_card_navigation']) => {
  const cardRefs = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent, card: HTMLDivElement) => {
      const bounds = card.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const rotateX = (deltaY / bounds.height) * 35;
      const rotateY = (deltaX / bounds.width) * -35;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
    };

    const resetRotation = (card: HTMLDivElement) => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    cardRefs.current.forEach((card) => {
      if (!card) return;
      const moveHandler = (e: MouseEvent) => handleMouseMove(e, card);
      const leaveHandler = () => resetRotation(card);

      card.addEventListener('mousemove', moveHandler);
      card.addEventListener('mouseleave', leaveHandler);

      // Clean up
      return () => {
        card.removeEventListener('mousemove', moveHandler);
        card.removeEventListener('mouseleave', leaveHandler);
      };
    });
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardRefs.current[index] = el;
  };

  return (
    <Container componentName="QuickCardNavigation" fullScreen className="relative">
      <div className="absolute inset-0 -z-10 bg-light-black"></div>
      <div className="relative z-0 px-0 large-desktop:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] justify-center">
        {navigation_cards?.map((card, index) => (
          <div
            key={index}
            ref={(el) => setCardRef(el, index)}
            className="transition-transform duration-300 ease-out transform-style-preserve-3d flex flex-col justify-center items-center py-14 rounded shadow-md border-[#333333] border text-center relative"
          >
            <StyledText
              text={card.card_title?.text || ''}
              styling_options={card.card_title?.styling_options as TextStylingOptions}
              className="tracking-[1px]"
              style={{ fontSize: 'clamp(30px, 3vw, 60px' }}
              $={$?.navigation_cards}
            />

            {card.navigation_link?.href && (
              <Link
                href={card.navigation_link?.href}
                className="absolute inset-0"
                {...getCSLPAttributes($?.navigation_cards)}
              />
            )}
          </div>
        ))}
      </div>
    </Container>
  );
};
