import { cn } from "@/lib/utils";

/** 8x7 pixel heart drawn as SVG rects. */
export function PixelHeart({ filled, className }: { filled: boolean; className?: string | undefined }) {
  const rows = [
    ".XX.XX.",
    "XXXXXXX",
    "XXXXXXX",
    "XXXXXXX",
    ".XXXXX.",
    "..XXX..",
    "...X...",
  ];
  return (
    <svg
      viewBox="0 0 7 7"
      className={cn("h-6 w-6", className)}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {rows.flatMap((row, y) =>
        row.split("").map((c, x) =>
          c === "X" ? (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={filled ? "var(--heart)" : "var(--lavender-deep)"}
              stroke="var(--ink)"
              strokeWidth={0.08}
            />
          ) : null,
        ),
      )}
      {filled && <rect x={1} y={1} width={1} height={1} fill="var(--pastel-pink)" />}
    </svg>
  );
}

export function PixelStar({ className }: { className?: string }) {
  const rows = [
    "...X...",
    "...X...",
    "..XXX..",
    "XXXXXXX",
    ".XXXXX.",
    "..XXX..",
    ".XX.XX.",
    "XX...XX",
  ];
  return (
    <svg
      viewBox="0 0 7 8"
      className={cn("h-6 w-6", className)}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {rows.flatMap((row, y) =>
        row.split("").map((c, x) =>
          c === "X" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="var(--neon-gold)" />
          ) : null,
        ),
      )}
    </svg>
  );
}
