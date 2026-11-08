import { useEffect, useMemo } from "react";
import type { Avatar } from "@/game/avatars";
import { LEVELS, type ChoiceKey } from "@/game/levels";
import { MAX_STARS, getRank } from "@/game/state";
import { playSound } from "@/game/audio";
import { PixelWindow } from "../PixelWindow";
import { PixelButton } from "../PixelButton";
import { PixelHeart, PixelStar } from "../PixelIcons";

const CONFETTI_COLORS = ["var(--neon-pink)", "var(--neon-cyan)", "var(--neon-gold)", "var(--pastel-pink)"];

interface VictoryScreenProps {
  avatar: Avatar;
  stars: number;
  explored: ChoiceKey[][];
  onReplay: () => void;
}

export function VictoryScreen({ avatar, stars, explored, onReplay }: VictoryScreenProps) {
  useEffect(() => {
    const t = window.setTimeout(() => playSound("victory"), 200);
    return () => window.clearTimeout(t);
  }, []);

  const confetti = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        delay: `${(i % 10) * 0.35}s`,
        duration: `${3 + (i % 5)}s`,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      })),
    [],
  );

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {confetti.map((c, i) => (
          <span
            key={i}
            className="absolute top-0 h-3 w-3"
            style={{
              left: c.left,
              background: c.color,
              animation: `confetti-fall ${c.duration} linear ${c.delay} infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 lg:flex-row lg:items-end">
        <img
          src={avatar.src}
          alt={`${avatar.name} celebrating victory`}
          className="animate-idle-bob h-64 w-auto drop-shadow-[0_0_24px_var(--neon-gold)] lg:h-96"
        />

        <PixelWindow title="RUN_COMPLETE.EXE" className="w-full">
          <h1 className="font-pixel text-center text-2xl text-glow-pink sm:text-4xl">VICTORY!</h1>
          <p className="font-terminal mt-3 text-center text-2xl sm:text-3xl">
            {avatar.name} walked a mile through 130 years of history — proving the fight for
            equality evolves alongside human technology.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            <div className="flex gap-1">
              {LEVELS.map((l) => (
                <PixelHeart key={l.number} filled className="h-8 w-8" />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <PixelStar className="animate-star-spin h-8 w-8" />
              <span className="font-pixel text-sm text-lavender-deep">
                {stars} / {MAX_STARS}
              </span>
            </div>
          </div>
          <p className="font-pixel mt-4 text-center text-[10px] text-lavender-deep">RANK</p>
          <p className="font-pixel bg-lavender-night mt-2 py-3 text-center text-sm text-glow-gold sm:text-base">
            {getRank(stars)}
          </p>

          <ol className="mt-6 grid gap-2 sm:grid-cols-2">
            {LEVELS.map((l, i) => (
              <li key={l.number} className="border-l-8 border-neon-pink bg-pastel-pink/50 px-3 py-2">
                <p className="font-pixel text-[9px] text-lavender-deep">
                  {l.wave.toUpperCase()} · {l.era}
                </p>
                <p className="font-terminal text-xl">
                  {l.theme} — {explored[i]?.length ?? 0}/3 paths
                </p>
              </li>
            ))}
          </ol>

          <p className="font-terminal mt-6 text-center text-2xl text-ink/80">
            The next wave is yours to write. What will you fight for?
          </p>
          <div className="mt-6 flex justify-center">
            <PixelButton size="lg" variant="gold" onClick={onReplay} autoFocus>
              ↻ PLAY AGAIN
            </PixelButton>
          </div>
        </PixelWindow>
      </div>
    </div>
  );
}
