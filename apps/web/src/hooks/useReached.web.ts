import { useEffect, useState } from 'react';

/**
 * Becomes true — and stays true — once the element with the given id has
 * scrolled up into view (its top passes `fraction` of the viewport height).
 */
export function useReached(id: string, fraction = 0.85): boolean {
  const [reached, setReached] = useState(false);

  useEffect(() => {
    if (reached) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      const node = document.getElementById(id);
      if (node && node.getBoundingClientRect().top < window.innerHeight * fraction) setReached(true);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [id, fraction, reached]);

  return reached;
}
