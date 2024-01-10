'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

const PopupContext = createContext({
  popup: null,
  setPopup: (value?: any) => {},
});

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    if (popup !== null) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }
  }, [popup]);

  return (
    <PopupContext.Provider value={{ popup, setPopup }}>
      {children}
    </PopupContext.Provider>
  );
}

export function usePopupContext() {
  const context = useContext(PopupContext);

  if (context === undefined) {
    throw new Error('usePopupContext must be used within PopupProvider');
  }

  return context;
}
