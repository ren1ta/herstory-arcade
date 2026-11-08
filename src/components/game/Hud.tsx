import { PixelHeart, PixelStar } from "./PixelIcons";
import { AvatarSprite } from "./AvatarSprite";
import type { Avatar } from "@/game/avatars";

interface HudProps {
  avatar: Avatar;
  hearts: number;
  totalHearts: number;
  stars: number;
  maxStars: number;
  levelLabel: string;
}

/** Heads-up display: avatar portrait, story hearts, star counter and progress bar. */
export function Hud({ avatar, hearts, totalHearts, stars, maxStars, levelLabel }: HudProps) {
  const pct = Math.round((stars / maxStars) * 100);

  return (
    <div className="pixel-frame flex flex-wrap items-center gap-x-5 gap-y-3 bg-lavender-night/90 px-3 py-2 text-cream">
      <div className="flex items-center gap-2">
        <div className="pixel-frame relative h-12 w-12 overflow-hidden bg-pastel-pink">
          <AvatarSprite
            avatar={avatar}
            className="absolute top-0.5 left-1/2 h-24 -translate-x-1/2"
          />
        </div>
        <div className="leading-tight">
          <p className="font-pixel text-[9px] glow-pink">{avatar.name}</p>
          <p className="font-terminal text-lg text-neon-cyan">{levelLabel}</p>
        </div>
      </div>

      <div
        className="flex items-center gap-1"
        aria-label={`${hearts} of ${totalHearts} stories cleared`}
        title="Stories cleared"
      >
        {Array.from({ length: totalHearts }, (_, i) => (
          <PixelHeart
            key={i}
            filled={i < hearts}
            className={i === hearts - 1 ? "animate-heart-beat" : undefined}
          />
        ))}
      </div>

      <div className="flex items-center gap-2" aria-label={`${stars} of ${maxStars} levels cleared`}>
        <PixelStar className="animate-star-spin" />
        <span className="font-pixel text-[10px] glow-gold">
          {String(stars).padStart(2, "0")}/{maxStars}
        </span>
      </div>

      <div className="flex min-w-40 flex-1 items-center gap-2">
        <span className="font-pixel text-[8px] text-muted-foreground">EQUALITY</span>
        <div
          className="flex h-5 flex-1 gap-[3px] bg-ink p-[3px] shadow-[0_0_0_3px_var(--cream)]"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {Array.from({ length: maxStars }, (_, i) => (
            <span
              key={i}
              className={
                i < stars
                  ? "flex-1 bg-neon-pink shadow-[inset_0_-4px_0_0_color-mix(in_oklab,var(--ink)_30%,transparent)]"
                  : "flex-1 bg-lavender-deep/50"
              }
            />
          ))}
        </div>
        <span className="font-pixel text-[8px] text-neon-cyan">{pct}%</span>
      </div>
    </div>
  );
}
