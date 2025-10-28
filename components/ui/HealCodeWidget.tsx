'use client';

import { useRef, useEffect } from 'react';
import { Container } from '../primitives/Container';
import { cn } from '@/utils/cn';

export interface IHealCodeWidget {
  widgetType?: string;
  widgetPartner?: string;
  widgetId?: string;
  widgetVersion?: number;
}

export const HealCodeWidget = ({
  widgetType = 'enrollments',
  widgetPartner = 'object',
  widgetId,
  widgetVersion = 0,
}: IHealCodeWidget) => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const hasInjected = useRef(false);

  useEffect(() => {
    if (widgetRef.current && !hasInjected.current) {
      const widgetHTML = `<healcode-widget data-type="${widgetType}" data-widget-partner="${widgetPartner}" data-widget-id="${widgetId}" data-widget-version="${widgetVersion}"></healcode-widget>`;
      widgetRef.current.innerHTML = widgetHTML;
      hasInjected.current = true;
    }
  }, [widgetType, widgetPartner, widgetId, widgetVersion]);

  return (
    <Container componentName="HealCodeWidget" bottomPadded={false} edgeToEdge>
      <div
        ref={widgetRef}
        className={cn('healcode-widget-container')}
        style={{
          minHeight: '200px',
        }}
      />
    </Container>
  );
};
