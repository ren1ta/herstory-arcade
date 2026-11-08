import type { Level, ChoiceKey } from "@/game/story";
import type { Avatar } from "@/game/avatars";
import { useTypewriter } from "@/game/useTypewriter";
import { useHotkeys } from "@/game/useHotkeys";
import { playSound } from "@/game/audio";
import { PixelWindow } from "../PixelWindow";
import { AvatarSprite } from "../AvatarSprite";

const KEY_MAP: Record<string, ChoiceKey> = { a: "A", b: "B", "1": "A", "2": "B" };

interface LevelScreenProps {
  level: Level;
  avatar: Avatar;
  onChoose: (key: ChoiceKey) => void;
}

export function LevelScreen({ level, avatar, onChoose }: LevelScreenProps) {
  const typed = useTypewriter(`${level.system}\n> ${level.scene}`, 22);

  useHotkeys((key) => {
    if (!typed.done) {
      if (key === "enter" || key === " ") typed.skip();
      return;
    }
    const choice = KEY_MAP[key];
    if (choice) {
      playSound("click");
      onChoose(choice);
    }
  });

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,220px)_1fr]">
      <div className="hidden h-64 justify-center lg:sticky lg:top-6 lg:mt-24 lg:flex">
        <div className="animate-idle-bob h-full">
          <AvatarSprite avatar={avatar} alt={`${avatar.name} ready for action`} className="h-full drop-shadow-[6px_6px_0_var(--ink)]" />
        </div>
      </div>

      <PixelWindow title={`LEVEL ${level.id} — ${level.stage} · AGE ${level.age}`} className="w-full">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="font-pixel text-sm text-lavender-deep sm:text-base">{level.place}</h1>
          <span className="font-pixel bg-lavender-deep px-2 py-1 text-[9px] text-neon-gold">{level.year}</span>
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
            <p className="font-pixel mt-6 text-[10px] text-lavender-deep">
              ▼ WHAT WILL YOU DO? <span className="text-ink/60">(press A or B)</span>
            </p>
            <ul className="mt-3 space-y-3">
              {level.choices.map((c) => (
                <li key={c.key}>
                  <button
                    type="button"
                    onClick={() => {
                      playSound("click");
                      onChoose(c.key);
                    }}
                    className="pixel-frame group flex w-full items-center gap-4 bg-cream px-3 py-3 text-left transition-transform hover:translate-x-1 hover:bg-pastel-pink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neon-cyan"
                  >
                    <span className="font-pixel flex h-10 w-10 shrink-0 items-center justify-center bg-neon-pink text-sm text-cream pixel-text-shadow group-hover:bg-lavender-deep">
                      {c.key}
                    </span>
                    <span className="font-terminal flex-1 text-xl leading-tight sm:text-2xl">{c.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </PixelWindow>
    </div>
  );
}
