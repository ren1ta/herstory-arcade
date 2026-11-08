import { useEffect } from "react";
import type { Level, ChoiceKey } from "@/game/levels";
import type { Avatar } from "@/game/avatars";
import { useTypewriter } from "@/game/useTypewriter";
import { playSound } from "@/game/audio";
import { cn } from "@/lib/utils";
import { PixelWindow } from "../PixelWindow";
import { PixelStar } from "../PixelIcons";

interface LevelScreenProps {
  level: Level;
  avatar: Avatar;
  explored: ChoiceKey[];
  onChoose: (key: ChoiceKey) => void;
}

const KEY_MAP: Record<string, ChoiceKey> = { a: "A", b: "B", c: "C", "1": "A", "2": "B", "3": "C" };

export function LevelScreen({ level, avatar, explored, onChoose }: LevelScreenProps) {
  const typed = useTypewriter(`${level.system}\n> ${level.prompt}`, 26);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!typed.done) {
        if (e.key === "Enter" || e.key === " ") typed.skip();
        return;
      }
      const key = KEY_MAP[e.key.toLowerCase()];
      if (key) {
        playSound("click");
        onChoose(key);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [typed, onChoose]);

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,220px)_1fr]">
      <div className="hidden justify-center lg:sticky lg:top-6 lg:mt-24 lg:flex">
        <img
          src={avatar.src}
          alt={`${avatar.name} ready for action`}
          className="animate-idle-bob h-80 w-auto drop-shadow-[6px_6px_0_var(--ink)]"
        />
      </div>

      <PixelWindow
        title={`LEVEL ${level.number} — ${level.wave.toUpperCase()}`}
        className="w-full"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="font-pixel text-sm text-lavender-deep sm:text-base">{level.theme}</h1>
          <span className="font-pixel bg-lavender-deep px-2 py-1 text-[9px] text-neon-gold">
            {level.era}
          </span>
        </div>

        <button
          type="button"
          onClick={typed.skip}
          className="pixel-frame mt-4 block min-h-24 w-full bg-ink px-4 py-3 text-left"
          aria-label="Skip typing"
        >
          <pre className="font-terminal whitespace-pre-wrap text-2xl leading-snug text-neon-cyan sm:text-[1.7rem]">
            {typed.shown}
            <span className="animate-blink text-neon-pink">█</span>
          </pre>
        </button>

        {typed.done && (
          <div className="animate-pop-in">
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="border-l-8 border-neon-pink bg-pastel-pink/60 px-3 py-2">
                <p className="font-pixel text-[9px] text-lavender-deep">CORE GOAL</p>
                <p className="font-terminal text-xl leading-tight sm:text-2xl">{level.goal}</p>
              </div>
              <div className="border-l-8 border-lavender-deep bg-lavender/30 px-3 py-2">
                <p className="font-pixel text-[9px] text-lavender-deep">HISTORICAL CONTEXT</p>
                <p className="font-terminal text-xl leading-tight sm:text-2xl">{level.context}</p>
              </div>
            </div>

            <p className="font-pixel mt-6 text-[10px] text-lavender-deep">
              ▼ WHAT WILL YOU DO? <span className="text-ink/60">(press A, B or C)</span>
            </p>
            <ul className="mt-3 space-y-3">
              {level.choices.map((c) => {
                const done = explored.includes(c.key);
                return (
                  <li key={c.key}>
                    <button
                      type="button"
                      onClick={() => {
                        playSound("click");
                        onChoose(c.key);
                      }}
                      className={cn(
                        "pixel-frame group flex w-full items-center gap-4 px-3 py-3 text-left transition-transform hover:translate-x-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neon-cyan",
                        done ? "bg-lavender/40" : "bg-cream hover:bg-pastel-pink",
                      )}
                    >
                      <span className="font-pixel flex h-10 w-10 shrink-0 items-center justify-center bg-neon-pink text-sm text-cream pixel-text-shadow group-hover:bg-lavender-deep">
                        {c.key}
                      </span>
                      <span className="font-terminal flex-1 text-xl leading-tight sm:text-2xl">
                        {c.label}
                      </span>
                      {done && (
                        <span className="flex items-center gap-1" title="Path explored">
                          <PixelStar className="h-5 w-5" />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </PixelWindow>
    </div>
  );
}
