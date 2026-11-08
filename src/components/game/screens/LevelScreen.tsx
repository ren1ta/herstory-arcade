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

interface LevelScreenProps {
  level: Level;
  avatar: Avatar;
  onChoose: (key: ChoiceKey) => void;
}

type DialoguePhase = "npc" | "response" | "choices";

export function LevelScreen({ level, avatar, onChoose }: LevelScreenProps) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [phase, setPhase] = useState<DialoguePhase>("npc");
  const dialogue =
    phase === "npc" ? (level.npcDialogue[dialogueIndex] ?? level.npcDialogue[0]) : level.avatarResponse;
  const typed = useTypewriter(dialogue, 22);

  useEffect(() => {
    if (phase !== "response" || !typed.done) return;
    const timer = window.setTimeout(() => setPhase("choices"), 5000);
    return () => window.clearTimeout(timer);
  }, [phase, typed.done]);

  const advanceDialogue = () => {
    if (!typed.done) return;
    if (dialogueIndex < level.npcDialogue.length - 1) {
      setDialogueIndex((index) => index + 1);
    } else {
      setPhase("response");
    }
  };

  useHotkeys((key) => {
    if (phase === "npc") {
      if (key === "enter" || key === " ") {
        if (typed.done) advanceDialogue();
        else typed.skip();
      }
      return;
    }
    if (phase === "choices") {
      const choice = KEY_MAP[key];
      if (choice) {
        playSound("click");
        onChoose(choice);
      }
    }
  });

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,170px)_minmax(0,1fr)_minmax(0,170px)]">
      <figure className="order-1 flex flex-col items-center lg:order-none lg:sticky lg:top-6 lg:mt-24">
        <div className="flex h-36 items-end justify-center sm:h-44 lg:h-56">
          <img
            src={level.npcSprite}
            alt={level.npcName}
            width={250}
            height={250}
            className="h-full w-auto drop-shadow-[4px_4px_0_var(--ink)]"
          />
        </div>
        <figcaption className="font-pixel mt-2 text-center text-[8px] text-neon-gold">{level.npcName}</figcaption>
      </figure>

      <PixelWindow
        title={`LEVEL ${level.id} — ${level.stage} · AGE ${level.age}`}
        className="order-3 w-full lg:order-none"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="font-pixel text-sm text-lavender-deep sm:text-base">{level.place}</h1>
          <span className="font-pixel bg-lavender-deep px-2 py-1 text-[9px] text-neon-gold">{level.year}</span>
        </div>
        <p className="font-pixel mt-4 text-[8px] text-neon-cyan">{level.system}</p>
        <p className="font-terminal mt-2 text-xl leading-snug text-ink/80 sm:text-2xl">{level.scene}</p>

        <div
          className="pixel-frame mt-5 min-h-32 bg-ink px-4 py-3"
          aria-live="polite"
          aria-label={phase === "response" ? `${avatar.name}'s response` : `${level.npcName} dialogue`}
        >
          <p className="font-pixel text-[9px] text-neon-gold">
            {phase === "response" ? `${avatar.name}:` : `${level.npcName}:`}
          </p>
          <p className="font-terminal mt-2 whitespace-pre-wrap text-2xl leading-snug text-neon-cyan sm:text-[1.7rem]">
            {typed.shown}
            {phase !== "choices" && <span className="animate-blink text-neon-pink">█</span>}
          </p>
        </div>

        {phase === "npc" && (
          <div className="mt-4 flex justify-end">
            <PixelButton size="sm" variant="cyan" onClick={advanceDialogue} disabled={!typed.done}>
              {dialogueIndex < level.npcDialogue.length - 1 ? "NEXT ▶" : "RESPOND ▶"}
            </PixelButton>
          </div>
        )}

        {phase === "response" && (
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="font-pixel text-[8px] text-neon-gold">YOUR RESPONSE · 5 SECONDS</p>
            <div className="h-3 flex-1 bg-ink p-[2px]" aria-hidden>
              <span className="block h-full animate-pulse bg-neon-pink" />
            </div>
          </div>
        )}

        {phase === "choices" && (
          <div className="animate-pop-in">
            <p className="font-pixel mt-6 text-[10px] text-lavender-deep">
              ▼ WHAT WILL YOU DO? <span className="text-ink/60">(press A or B)</span>
            </p>
            <ul className="mt-3 space-y-3">
              {level.choices.map((choice) => (
                <li key={choice.key}>
                  <button
                    type="button"
                    onClick={() => {
                      playSound("click");
                      onChoose(choice.key);
                    }}
                    className="pixel-frame group flex w-full items-center gap-4 bg-cream px-3 py-3 text-left transition-transform hover:translate-x-1 hover:bg-pastel-pink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neon-cyan"
                  >
                    <span className="font-pixel flex h-10 w-10 shrink-0 items-center justify-center bg-neon-pink text-sm text-cream pixel-text-shadow group-hover:bg-lavender-deep">
                      {choice.key}
                    </span>
                    <span className="font-terminal flex-1 text-xl leading-tight sm:text-2xl">{choice.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </PixelWindow>

      <figure className="order-2 flex flex-col items-center lg:order-none lg:sticky lg:top-6 lg:mt-24">
        <div className="flex h-36 items-end justify-center sm:h-44 lg:h-56">
          <AvatarSprite
            avatar={avatar}
            animate
            alt={`${avatar.name} in ${level.place}`}
            className="h-full drop-shadow-[4px_4px_0_var(--ink)]"
          />
        </div>
        <figcaption className="font-pixel mt-2 text-center text-[8px] text-neon-cyan">{avatar.name}</figcaption>
      </figure>
    </div>
  );
}
