import { useEffect, useRef, useState } from 'react';
import { Text } from 'react-native';

const TICK_MS = 32;

/**
 * Reveals `text` character by character over `duration` ms. The not-yet-typed
 * remainder is rendered transparent so the bubble keeps its final size and
 * the layout never shifts.
 */
export function TypewriterText({ text, duration }: { text: string; duration: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    // Continue from wherever we are, so a new (e.g. faster) duration never un-types text.
    const from = countRef.current;
    const started = Date.now();
    const timer = setInterval(() => {
      const progress = Math.min(1, (Date.now() - started) / duration);
      countRef.current = from + Math.ceil(progress * (text.length - from));
      setCount(countRef.current);
      if (progress >= 1) clearInterval(timer);
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [text, duration]);

  return (
    <>
      {text.slice(0, count)}
      <Text style={{ color: 'transparent' }}>{text.slice(count)}</Text>
    </>
  );
}
