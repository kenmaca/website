import { useEffect, useState } from 'react';

import { useHydrated } from './useHydrated';
import type { UseInView } from './useInView.types';

const supportsObserver = () => typeof IntersectionObserver !== 'undefined';

/**
 * Reports whether an element has scrolled into the viewport using
 * IntersectionObserver. react-native-web refs resolve to DOM nodes.
 */
export const useInView: UseInView = (ref, { threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true } = {}) => {
  const [inView, setInView] = useState(false);
  const hydrated = useHydrated();

  useEffect(() => {
    const node = ref.current as unknown as Element | null;
    if (!node || !supportsObserver()) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, once]);

  // Without IntersectionObserver, treat everything as visible once hydrated.
  return inView || (hydrated && !supportsObserver());
};
