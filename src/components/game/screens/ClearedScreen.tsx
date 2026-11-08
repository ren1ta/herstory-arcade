import { useEffect } from "react";
import { getAct, type Level } from "@/game/story";
import { playSound } from "@/game/audio";
import { useHotkeys } from "@/game/useHotkeys";
import { PixelWindow } from "../PixelWindow";
import { PixelButton } from "../PixelButton";
import { PixelStar } from "../PixelIcons";

interface ClearedScreenProps {
  level: Level;
  actFinale: boolean;
  isFinal: boolean;
  onNext: () => void;
}

export function ClearedScreen({ level, actFinale, isFinal, onNext }: ClearedScreenProps) {
  const act = getAct(level.act);
  useEffect(() => {
    const t = window.setTimeout(() => playSound("levelup"), 150);
    return () => window.clearTimeout(t);
  }, []);
  useHotkeys((key) => key === "enter" && onNext());

  const label = isFinal
    ? "BREAK THE SIMULATION ▶"
    : actFinale
      ? "RETURN TO THE LIVING ROOM ▶"
      : "NEXT LEVEL ▶";

  return (
    <PixelWindow title={`LEVEL ${level.id} · CLEAR`} className="animate-pop-in mx-auto w-full max-w-4xl">
      <div className="relative">
        <div className="animate-float-up font-pixel pointer-events-none absolute -top-2 right-0 flex items-center gap-2 text-xs glow-gold">
          +1 <PixelStar className="h-6 w-6" />
        </div>
        <p className="font-pixel text-sm text-neon-pink sm:text-lg">★ LEVEL CLEAR! ★</p>
        <h1 className="font-pixel mt-4 text-base text-lavender-deep sm:text-xl">{level.clearTitle}</h1>
        <p className="font-terminal mt-3 text-2xl leading-snug sm:text-[1.7rem]">{level.clearText}</p>
      </div>

      <div className="mt-5 border-l-8 border-neon-cyan bg-neon-cyan/20 px-4 py-3">
        <p className="font-pixel text-[9px] text-lavender-deep">REAL HISTORY</p>
        <p className="font-terminal mt-1 text-xl leading-snug sm:text-2xl">{level.history}</p>
      </div>

      {actFinale && (
        <div className="pixel-frame mt-6 bg-lavender-night px-4 py-3 text-center text-cream">
          <p className="font-pixel text-xs glow-gold">
            🔓 ACT {act.numeral} CLEAR{isFinal ? " · ALL TIMELINES COMPLETE" : " · PORTAL UNLOCKED"}
          </p>
        </div>
      )}

      <div className="mt-7 flex justify-end">
        <PixelButton variant={actFinale ? "gold" : "pink"} size="lg" onClick={onNext} autoFocus>
          {label}
        </PixelButton>
      </div>
    </PixelWindow>
  );
}
