'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

interface CursorContextType {
  cursorVariant: string;
  setCursorVariant: (variant: string) => void;
  cursorEnter: () => void;
  cursorLeave: () => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [cursorVariant, setCursorVariant] = useState('default');

  const cursorEnter = () => setCursorVariant('text');
  const cursorLeave = () => setCursorVariant('default');

  return (
    <CursorContext.Provider value={{ cursorVariant, setCursorVariant, cursorEnter, cursorLeave }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = (): CursorContextType => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};