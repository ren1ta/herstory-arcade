import { useEffect } from "react";
import type { Level, ChoiceKey } from "@/game/levels";
import { playSound } from "@/game/audio";
import { PixelWindow } from "../PixelWindow";
import { PixelButton } from "../PixelButton";
import { PixelStar } from "../PixelIcons";

interface OutcomeScreenProps {
  level: Level;
  choiceKey: ChoiceKey;
  earnedStar: boolean;
  remaining: number;
  isFinal: boolean;
  onTryAnother: () => void;
  onNext: () => void;
}

export function OutcomeScreen({
  level,
  choiceKey,
  earnedStar,
  remaining,
  isFinal,
  onTryAnother,
  onNext,
}: OutcomeScreenProps) {
  const choice = level.choices.find((c) => c.key === choiceKey) ?? level.choices[0]!;

  useEffect(() => {
    if (!earnedStar) return;
    const t = window.setTimeout(() => playSound("levelup"), 150);
    return () => window.clearTimeout(t);
  }, [earnedStar, choiceKey]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        playSound("click");
        onNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext]);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <PixelWindow title={`LEVEL ${level.number} · PATH ${choice.key}`} className="animate-pop-in">
        <div className="relative">
          {earnedStar && (
            <div className="animate-float-up font-pixel pointer-events-none absolute -top-2 right-0 flex items-center gap-2 text-xs text-glow-gold">
              +1 <PixelStar className="h-6 w-6" />
            </div>
          )}
          <p className="font-pixel text-[9px] text-lavender-deep">YOU CHOSE:</p>
          <p className="font-terminal mt-1 text-xl italic text-ink/70 sm:text-2xl">
            “{choice.label}”
          </p>
          <h1 className="font-pixel mt-5 text-base text-neon-pink sm:text-xl">
            {choice.outcomeTitle}
          </h1>
          <p className="font-terminal mt-3 text-2xl leading-snug sm:text-[1.7rem]">
            {choice.outcome}
          </p>
        </div>

        <div className="pixel-frame mt-6 bg-lavender-night px-4 py-3 text-cream">
          <p className="font-pixel text-[10px] text-glow-gold">🔓 {level.unlockTitle}</p>
          <p className="font-terminal mt-2 text-xl leading-snug sm:text-2xl">{level.unlock}</p>
        </div>

        <div className="mt-5 border-l-8 border-neon-cyan bg-neon-cyan/20 px-4 py-3">
          <p className="font-pixel text-[9px] text-lavender-deep">DID YOU KNOW? · INDIA</p>
          <p className="font-terminal mt-1 text-xl leading-snug sm:text-2xl">{level.indiaFact}</p>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          {remaining > 0 ? (
            <PixelButton variant="cream" onClick={onTryAnother}>
              ◀ TRY ANOTHER PATH ({remaining} ★ LEFT)
            </PixelButton>
          ) : (
            <span className="font-pixel text-[9px] text-lavender-deep">
              ★ ALL PATHS EXPLORED! ★
            </span>
          )}
          <PixelButton variant={isFinal ? "gold" : "pink"} size="lg" onClick={onNext} autoFocus>
            {isFinal ? "FINISH RUN ▶" : "NEXT WAVE ▶"}
          </PixelButton>
        </div>
      </PixelWindow>
    </div>
  );
}
