import { useEffect, useState } from "react";
import type { Level, ChoiceKey } from "@/game/story";
import type { Avatar } from "@/game/avatars";
import { useTypewriter } from "@/game/useTypewriter";
import { useHotkeys } from "@/game/useHotkeys";
import { playSound } from "@/game/audio";
import { PixelButton } from "../PixelButton";
import { PixelWindow } from "../PixelWindow";
import { AvatarSprite } from "../AvatarSprite";

const KEY_MAP: Record<string, ChoiceKey> = { a: "A", b: "B", "1": "A", "2": "B" };
const AVATAR_DIALOGUE_MS = 5000;

type DialoguePhase = "npc" | "avatar" | "choice";

interface LevelScreenProps {
  level: Level;
  avatar: Avatar;
  onChoose: (key: ChoiceKey) => void;
}

export function LevelScreen({ level, avatar, onChoose }: LevelScreenProps) {
  const [phase, setPhase] = useState<DialoguePhase>("npc");
  const [lineIndex, setLineIndex] = useState(0);
  const npcTyped = useTypewriter(level.npc.lines[lineIndex] ?? "", 28);
  const avatarTyped = useTypewriter(phase === "avatar" ? level.npc.response : "", 25);

  useEffect(() => {
    if (phase !== "avatar") return;
    const timer = window.setTimeout(() => setPhase("choice"), AVATAR_DIALOGUE_MS);
    return () => window.clearTimeout(timer);
  }, [phase, level.id]);

  const advanceNpc = () => {
    if (!npcTyped.done) {
      npcTyped.skip();
      return;
    }
    if (lineIndex < level.npc.lines.length - 1) {
      setLineIndex((current) => current + 1);
      playSound("blip");
      return;
    }
    setPhase("avatar");
  };

  useHotkeys((key) => {
    if (phase === "npc" && (key === "enter" || key === " ")) {
      advanceNpc();
      return;
    }
    if (phase === "choice") {
      const choice = KEY_MAP[key];
      if (choice) {
        playSound("click");
        onChoose(choice);
      }
    }
  });

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-4">
      <div className="pixel-frame relative flex min-h-56 items-end justify-between overflow-hidden bg-lavender-night/50 px-8 pt-5 sm:min-h-72 sm:px-16">
        <div className="animate-idle-bob h-40 sm:h-56">
          <AvatarSprite
            avatar={avatar}
            alt={`${avatar.name}, in ${level.place}`}
            className="h-full drop-shadow-[5px_5px_0_var(--ink)]"
          />
        </div>
        <div className="animate-idle-bob flex h-40 items-end sm:h-56 [animation-delay:-0.7s]">
          <img
            src={level.npc.sprite}
            alt={level.npc.name}
            width={250}
            height={250}
            draggable={false}
            className="h-full w-auto object-contain drop-shadow-[5px_5px_0_var(--ink)] [image-rendering:pixelated]"
          />
        </div>
        <div className="font-pixel absolute top-3 left-3 bg-ink/80 px-2 py-1 text-[8px] text-neon-gold sm:text-[10px]">
          {level.place} · {level.year}
        </div>
      </div>

      <PixelWindow title={`LEVEL ${level.id} — ${level.stage} · AGE ${level.age}`} tone="night" className="w-full">
        <p className="font-terminal mb-4 text-lg text-cream/80 sm:text-xl">{level.scene}</p>
        <p className="font-pixel mb-3 text-[8px] text-neon-cyan sm:text-[9px]">{level.system}</p>
        {phase === "npc" && (
          <button
            type="button"
            onClick={advanceNpc}
            className="pixel-frame block min-h-28 w-full bg-ink px-4 py-3 text-left"
            aria-label="Advance NPC dialogue"
          >
            <p className="font-pixel text-[10px] text-neon-gold">{level.npc.name}</p>
            <p className="font-terminal mt-2 min-h-14 whitespace-pre-wrap text-2xl leading-snug text-cream sm:text-3xl">
              {npcTyped.shown}
              {!npcTyped.done && <span className="animate-blink text-neon-pink">█</span>}
            </p>
            <p className="font-pixel mt-2 text-[8px] text-neon-cyan">
              {npcTyped.done ? "CLICK OR PRESS ENTER TO CONTINUE ▶" : "CLICK OR PRESS ENTER TO FINISH LINE"}
            </p>
          </button>
        )}

        {phase === "avatar" && (
          <div className="pixel-frame animate-pop-in min-h-28 bg-lavender-night px-4 py-3">
            <p className="font-pixel text-[10px] text-neon-pink">{avatar.name}</p>
            <p className="font-pixel mt-1 text-[8px] text-neon-gold">{avatar.tagline}</p>
            <p className="font-terminal mt-2 min-h-14 whitespace-pre-wrap text-2xl leading-snug text-cream sm:text-3xl">
              {avatarTyped.shown}
              {!avatarTyped.done && <span className="animate-blink text-neon-cyan">█</span>}
            </p>
          </div>
        )}

        {phase === "choice" && (
          <div className="animate-pop-in">
            <p className="font-pixel text-[10px] text-lavender-deep">
              ▼ WHAT WILL YOU DO? <span className="text-cream/60">(press A or B)</span>
            </p>
            <ul className="mt-3 space-y-3">
              {level.choices.map((choice) => (
                <li key={choice.key}>
                  <PixelButton
                    variant={choice.bold ? "gold" : "night"}
                    size="md"
                    className="w-full justify-start gap-4 whitespace-normal text-left"
                    onClick={() => {
                      playSound("click");
                      onChoose(choice.key);
                    }}
                  >
                    <span className="font-pixel flex h-10 w-10 shrink-0 items-center justify-center bg-lavender-deep text-sm text-cream">
                      {choice.key}
                    </span>
                    <span className="font-terminal flex-1 text-xl leading-tight sm:text-2xl">{choice.label}</span>
                  </PixelButton>
                </li>
              ))}
            </ul>
          </div>
        )}
      </PixelWindow>
    </div>
  );
}
