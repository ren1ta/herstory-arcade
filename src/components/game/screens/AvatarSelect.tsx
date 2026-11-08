import { useState } from "react";
import { cn } from "@/lib/utils";
import { AVATARS, type AvatarId } from "@/game/avatars";
import { playSound } from "@/game/audio";
import { PixelButton } from "../PixelButton";
import { PixelWindow } from "../PixelWindow";

export function AvatarSelect({ onConfirm }: { onConfirm: (id: AvatarId) => void }) {
  const [selected, setSelected] = useState<AvatarId | null>(null);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <PixelWindow title="SELECT_PLAYER.EXE" className="w-full max-w-4xl">
        <h1 className="font-pixel text-center text-sm text-lavender-deep sm:text-lg">
          CHOOSE YOUR HERO
        </h1>
        <p className="font-terminal mt-2 text-center text-2xl text-ink/80">
          Whose shoes will you walk in through history?
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-3" role="radiogroup" aria-label="Avatars">
          {AVATARS.map((a) => {
            const active = selected === a.id;
            return (
              <button
                key={a.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => {
                  playSound("select");
                  setSelected(a.id);
                }}
                onDoubleClick={() => onConfirm(a.id)}
                className={cn(
                  "group flex flex-col items-center p-4 transition-transform focus-visible:outline-none",
                  active
                    ? "pixel-frame-glow -translate-y-1 bg-lavender-night text-cream"
                    : "pixel-frame bg-pastel-pink text-ink hover:-translate-y-1",
                )}
              >
                <div className="flex h-44 items-end justify-center sm:h-52">
                  <img
                    src={a.src}
                    alt={`${a.name}, ${a.title}`}
                    width={a.width}
                    height={a.height}
                    className={cn(
                      "h-full w-auto drop-shadow-[4px_4px_0_var(--ink)]",
                      active && "animate-idle-bob",
                    )}
                  />
                </div>
                <p
                  className={cn(
                    "font-pixel mt-4 text-xs",
                    active ? "glow-pink" : "text-lavender-deep",
                  )}
                >
                  {active ? "▶ " : ""}
                  {a.name}
                </p>
                <p className={cn("font-pixel mt-2 text-[8px]", active ? "text-neon-cyan" : "")}>
                  {a.title}
                </p>
                <p className="font-terminal mt-2 text-xl leading-tight">{a.tagline}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <PixelButton
            size="lg"
            variant="gold"
            disabled={!selected}
            onClick={() => selected && onConfirm(selected)}
          >
            {selected ? "BEGIN JOURNEY ▶" : "PICK A HERO"}
          </PixelButton>
        </div>
      </PixelWindow>
    </div>
  );
}
