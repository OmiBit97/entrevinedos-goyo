import React, { createContext, useContext, useEffect, useMemo } from 'react';

export type EditionMode = 'awwwards';

interface EditionContextValue {
  edition: EditionMode;
  isAwwwards: true;
}

const EditionContext = createContext<EditionContextValue>({
  edition: 'awwwards',
  isAwwwards: true,
});

export const EditionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-edition', 'awwwards');
    }
  }, []);

  const value = useMemo<EditionContextValue>(
    () => ({
      edition: 'awwwards',
      isAwwwards: true,
    }),
    [],
  );

  return <EditionContext.Provider value={value}>{children}</EditionContext.Provider>;
};

export function useEdition(): EditionContextValue {
  return useContext(EditionContext);
}
