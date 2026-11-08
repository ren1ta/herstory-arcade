import { useEffect, useMemo, useState } from "react";

const COLS = 16;
const ROWS = 9;

/** Full-screen pixel-block dissolve that reveals the new scene underneath. */
export function PixelDissolve({ duration = 1100 }: { duration?: number }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(false), duration + 400);
    return () => window.clearTimeout(t);
  }, [duration]);

  const blocks = useMemo(
    () =>
      Array.from({ length: COLS * ROWS }, (_, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        // Pseudo-random but stable ordering, biased to clear from the centre out.
        const noise = ((i * 7919) % 97) / 97;
        const dist = Math.hypot(col - COLS / 2, (row - ROWS / 2) * 1.6) / (COLS / 2);
        return (noise * 0.55 + dist * 0.45) * duration;
      }),
    [duration],
  );

  if (!visible) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[95] grid"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
    >
      {blocks.map((delay, i) => (
        <span
          key={i}
          className="bg-lavender-night"
          style={{ animation: `pixel-out 0.3s steps(3) ${Math.round(delay)}ms forwards` }}
        />
      ))}
    </div>
  );
}
