import { useEffect } from "react";
import type { ChoiceKey, Level } from "@/game/story";
import { playSound } from "@/game/audio";
import { useHotkeys } from "@/game/useHotkeys";
import { PixelWindow } from "../PixelWindow";
import { PixelButton } from "../PixelButton";

interface GameOverScreenProps {
  level: Level;
  choiceKey: ChoiceKey;
  retries: number;
  onRetry: () => void;
}

export function GameOverScreen({ level, choiceKey, retries, onRetry }: GameOverScreenProps) {
  const choice = level.choices.find((c) => c.key === choiceKey);
  useEffect(() => {
    const t = window.setTimeout(() => playSound("gameover"), 100);
    return () => window.clearTimeout(t);
  }, []);
  useHotkeys((key) => key === "enter" && onRetry());

  return (
    <PixelWindow tone="night" title={`LEVEL ${level.id} · FAILED`} className="animate-pop-in mx-auto w-full max-w-3xl">
      <h1 className="font-pixel animate-glitch text-center text-3xl text-heart pixel-text-shadow sm:text-5xl">
        GAME OVER
      </h1>
      <p className="font-pixel mt-4 text-center text-[10px] glow-gold">{level.gameOverTitle}</p>
      {choice && (
        <p className="font-terminal mt-5 text-xl italic text-pastel-pink sm:text-2xl">You chose: “{choice.label}”</p>
      )}
      <p className="font-terminal mt-3 text-2xl leading-snug sm:text-[1.7rem]">{level.gameOverText}</p>
      <p className="font-pixel mt-5 text-[8px] leading-loose text-neon-cyan">
        HINT: THE BOLD, PROGRESSIVE PATH BREAKS THE LOOP.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <span className="font-pixel text-[8px] text-muted-foreground">CONTINUES USED: {retries}</span>
        <PixelButton size="lg" variant="pink" onClick={onRetry} autoFocus>
          ↻ RETRY LEVEL
        </PixelButton>
      </div>
    </PixelWindow>
  );
}
