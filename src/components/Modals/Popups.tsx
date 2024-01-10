'use client';

import { usePopupContext } from '@/context/PopupProvider';
import { createPortal } from 'react-dom';

export default function Popups() {
  const { popup } = usePopupContext();

  let portal;
  if (typeof window !== 'undefined') {
    portal = createPortal(popup, document! && document.body);
  }
  return portal;
}
