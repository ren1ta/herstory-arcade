import type { CSSProperties } from "react";
import type { Avatar } from "@/game/avatars";
import { cn } from "@/lib/utils";

interface AvatarSpriteProps {
  avatar: Avatar;
  /** Cycle through sprite-sheet frames (walk cycle). Ignored for single sprites. */
  animate?: boolean;
  className?: string | undefined;
  style?: CSSProperties | undefined;
  alt?: string;
}

/**
 * Renders a player sprite. Single images render as <img>; horizontal sprite
 * sheets render one frame at a time and can loop their walk cycle.
 * Size it by height (e.g. `h-full`); width follows the frame's aspect ratio.
 */
export function AvatarSprite({ avatar, animate = false, className, style, alt = "" }: AvatarSpriteProps) {
  const frames = Math.max(1, avatar.frames || 1);

  if (frames === 1) {
    return (
      <img
        src={avatar.src}
        alt={alt}
        width={avatar.width}
        height={avatar.height}
        draggable={false}
        className={cn("w-auto max-w-none", className)}
        style={style}
      />
    );
  }

  const frameWidth = avatar.width / frames;
  return (
    <div
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio: `${frameWidth} / ${avatar.height}`, ...style }}
    >
      <img
        src={avatar.src}
        alt=""
        draggable={false}
        className="absolute top-0 left-0 h-full max-w-none"
        style={{
          width: `${frames * 100}%`,
          animation: animate ? `sprite-cycle ${frames * 0.12}s steps(${frames}) infinite` : undefined,
        }}
      />
    </div>
  );
}
