'use client';
import { IDictionaryItems } from '@/lib/generated';
import { createContext, useContext } from 'react';

const GlobalLabelsContext = createContext({ globalLabels: {} as Partial<IDictionaryItems> });

export const GlobalLabelsProvider = GlobalLabelsContext.Provider;
export const useGlobalLabels = () => useContext(GlobalLabelsContext);
