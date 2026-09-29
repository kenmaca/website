import type { UseInView } from './useInView.types';

/**
 * Native fallback: there is no document viewport to observe, so content is
 * considered visible immediately. (Scroll-linked reveals on native would need
 * the parent ScrollView's offsets.)
 */
export const useInView: UseInView = () => true;
