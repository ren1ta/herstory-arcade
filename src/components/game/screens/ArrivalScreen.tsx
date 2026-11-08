import { useEffect, useState } from "react";
import type { Avatar } from "@/game/avatars";
import { playSound } from "@/game/audio";
import { useTypewriter } from "@/game/useTypewriter";
import { useHotkeys } from "@/game/useHotkeys";
import { AvatarSprite } from "../AvatarSprite";
import { PixelButton } from "../PixelButton";
import { PixelWindow } from "../PixelWindow";

const LINE = "Wh-where am I?! One second I was on the couch... now I'm INSIDE the TV?!";
const DIALOGUE_MS = 5000;

/** Post-entry: 5s confused dialogue, then the OBJECTIVE system pop-up. */
export function ArrivalScreen({ avatar, onDone }: { avatar: Avatar; onDone: () => void }) {
  const [step, setStep] = useState<"dialogue" | "objective">("dialogue");
  const typed = useTypewriter(LINE, 45);

  useEffect(() => {
    const t = window.setTimeout(() => setStep("objective"), DIALOGUE_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (step === "dialogue" && typed.shown.length % 4 === 1) playSound("blip");
  }, [typed.shown.length, step]);

  useEffect(() => {
    if (step === "objective") playSound("levelup");
  }, [step]);

  useHotkeys((key) => {
    if (key !== "enter" && key !== " ") return;
    if (step === "dialogue") setStep("objective");
    else onDone();
  });

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16">
      <div className="starfield absolute inset-0" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-[40vh] overflow-hidden" aria-hidden>
        <div className="synth-grid absolute -inset-x-1/2 top-0 h-[200%]" />
      </div>
      {["1913", "1952", "1974", "1993", "2017", "2026"].map((y, i) => (
        <span
          key={y}
          aria-hidden
          className="font-pixel absolute text-[10px] text-neon-cyan/60"
          style={{ left: `${8 + i * 15}%`, top: `${12 + ((i * 23) % 40)}%` }}
        >
          {y}
        </span>
      ))}

      <div className="animate-drop-in relative h-48 sm:h-64">
        <div className="animate-idle-bob h-full">
          <AvatarSprite avatar={avatar} alt={`${avatar.name}, confused`} className="h-full drop-shadow-[0_0_18px_var(--neon-cyan)]" />
        </div>
      </div>

      {step === "dialogue" ? (
        <button
          type="button"
          onClick={() => setStep("objective")}
          className="pixel-frame animate-pop-in relative mt-8 w-full max-w-2xl bg-lavender-night/95 px-5 py-4 text-left"
        >
          <p className="font-pixel text-[10px] text-neon-gold">{avatar.name}</p>
          <p className="font-terminal mt-2 min-h-16 text-2xl text-cream sm:text-3xl">
            {typed.shown}
            <span className="animate-blink text-neon-pink">█</span>
          </p>
        </button>
      ) : (
        <PixelWindow title="⚠ SYSTEM ALERT · NEW QUEST" className="animate-pop-in relative mt-8 w-full max-w-2xl">
          <p className="font-pixel text-xs text-neon-pink sm:text-sm">OBJECTIVE:</p>
          <p className="font-terminal mt-2 text-2xl leading-snug sm:text-3xl">
            Complete all life-stage levels across the timelines to break the simulation and return home!
          </p>
          <p className="font-pixel mt-4 text-[8px] leading-loose text-lavender-deep">
            3 STORIES × 4 LIFE STAGES · CHOOSE THE BOLD PATH · WRONG MOVE = GAME OVER
          </p>
          <div className="mt-5 flex justify-center">
            <PixelButton size="lg" variant="gold" onClick={onDone} autoFocus>
              ACCEPT MISSION ▶
            </PixelButton>
          </div>
        </PixelWindow>
      )}
      <div className="animate-flash-out pointer-events-none fixed inset-0 bg-cream" aria-hidden />
    </div>
  );
}
