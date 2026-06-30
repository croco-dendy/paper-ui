import { useEffect, useRef } from 'react';

/**
 * Calls `onEscape` when the Escape key is pressed while `active` is true.
 * The handler is read from a ref, so passing an inline callback does not
 * re-subscribe the listener on every render.
 */
export function useEscapeKey(active: boolean, onEscape: () => void) {
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!active) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onEscapeRef.current();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [active]);
}
