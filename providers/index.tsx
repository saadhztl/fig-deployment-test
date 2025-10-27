'use client';
import { IDictionaryItems } from '@/lib/generated';
import { GlobalLabelsProvider } from './GlobalLabelsProvider';

export function Providers({
  children,
  data,
}: {
  children: React.ReactNode;
  data: { globalLabels: IDictionaryItems | object };
}) {
  return <GlobalLabelsProvider value={data}>{children}</GlobalLabelsProvider>;
}
