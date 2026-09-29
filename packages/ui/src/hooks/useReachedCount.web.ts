import { useEffect, useState } from 'react';

import type { ReachedCounts, UseReachedCount } from './useReachedCount.types';

/**
 * How many of an ordered list of elements have scrolled up past a trigger
 * line (default: 85% down the viewport), and past a higher "urgent" line
 * (default: 40%). Scroll-position based rather than IntersectionObserver, so
 * jumping past elements (anchor links, fast flicks) still counts them.
 */
export const useReachedCount: UseReachedCount = (
  slots,
  count,
  { enabled = true, line = 0.85, urgentLine = 0.4 } = {},
) => {
  const [counts, setCounts] = useState<ReachedCounts>({ reached: 0, urgent: 0 });

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const reachedLimit = window.innerHeight * line;
      const urgentLimit = window.innerHeight * urgentLine;
      let reached = 0;
      let urgent = 0;
      while (reached < count) {
        const node = slots.current[reached] as unknown as Element | null | undefined;
        if (!node) break;
        const top = node.getBoundingClientRect().top;
        if (top > reachedLimit) break;
        if (top <= urgentLimit && urgent === reached) urgent += 1;
        reached += 1;
      }
      setCounts((previous) =>
        reached <= previous.reached && urgent <= previous.urgent
          ? previous
          : { reached: Math.max(previous.reached, reached), urgent: Math.max(previous.urgent, urgent) },
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [slots, count, enabled, line, urgentLine]);

  return counts;
};
