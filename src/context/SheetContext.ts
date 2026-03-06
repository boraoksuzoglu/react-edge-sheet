import { createContext, useContext } from 'react';

export interface SheetContextValue {
  isExiting: boolean;
  isEntered: boolean;
  close: () => void;
}

export const SheetContext = createContext<SheetContextValue | null>(null);

export function useSheetContext(): SheetContextValue {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error('useSheetContext must be used within a Sheet');
  return ctx;
}
