import { useEffect, useRef } from "react";

/**
 * Window-level keyboard shortcuts. Ignores key repeats and keys pressed while a
 * button/input has focus (so Enter on a focused button doesn't fire twice).
 */
export function useHotkeys(handler: (key: string, e: KeyboardEvent) => void, enabled = true) {
  const ref = useRef(handler);
  ref.current = handler;

  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("button, input, select, textarea, a")) return;
      ref.current(e.key.toLowerCase(), e);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled]);
}
