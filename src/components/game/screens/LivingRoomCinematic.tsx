import { useEffect, useState, type CSSProperties } from "react";
import type { Avatar } from "@/game/avatars";
import { playSound, stopAll, type SoundName } from "@/game/audio";
import { cn } from "@/lib/utils";
import { AvatarSprite } from "../AvatarSprite";
import { LivingRoomStage, ROOM, TvVortex } from "../LivingRoomStage";

type Phase = "enter" | "walk" | "sit" | "tv" | "vortex" | "flash";

/** Timeline in ms for the 10-second intro. */
const TIMELINE: { at: number; phase: Phase; sound?: SoundName }[] = [
  { at: 60, phase: "walk", sound: "walk" },
  { at: 3000, phase: "sit", sound: "sit" },
  { at: 6000, phase: "tv", sound: "click" },
  { at: 8000, phase: "vortex", sound: "teleport" },
  { at: 9500, phase: "flash" },
];
const DURATION = 10000;

const CAPTIONS: Record<Phase, string> = {
  enter: "",
  walk: "*creak* *creak* ... home at last.",
  sit: "*PLOP* Time to unwind.",
  tv: "*click* ... what's on tonight?",
  vortex: "WAIT — THE TV IS PULLING ME IN!",
  flash: "",
};

const CENTER = "translateX(-50%)";
const SUCKED = "translate(-50%, 50%) scale(0) rotate(900deg)";

const POSE: Record<Phase, CSSProperties> = {
  enter: { ...ROOM.door, transform: CENTER, transitionDuration: "0ms" },
  walk: { ...ROOM.floor, transform: CENTER, transitionDuration: "2900ms" },
  sit: { ...ROOM.seat, transform: CENTER, transitionDuration: "550ms" },
  tv: { ...ROOM.seat, transform: CENTER, transitionDuration: "0ms" },
  vortex: { ...ROOM.tv, transform: SUCKED, transitionDuration: "1500ms" },
  flash: { ...ROOM.tv, transform: SUCKED, transitionDuration: "0ms" },
};

/** Remote → TV infrared beam dots (% of scene). */
const BEAM = Array.from({ length: 7 }, (_, i) => ({
  left: 72 + (i * (ROOM.tvCenter.x - 74)) / 6,
  top: 56 - (i * (56 - ROOM.tvCenter.y)) / 6,
}));

export function LivingRoomCinematic({ avatar, onDone }: { avatar: Avatar; onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("enter");

  useEffect(() => {
    const timers = TIMELINE.map(({ at, phase: p, sound }) =>
      window.setTimeout(() => {
        setPhase(p);
        if (sound) playSound(sound);
      }, at),
    );
    timers.push(window.setTimeout(onDone, DURATION));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [onDone]);

  const tvOn = phase === "tv" || phase === "vortex" || phase === "flash";
  const pulling = phase === "vortex" || phase === "flash";
  const seated = phase === "sit" || phase === "tv";

  return (
    <LivingRoomStage
      tvOn={tvOn}
      actor={
        <div
          className="ease-out absolute transition-all"
          style={{ transitionProperty: "left, bottom, height, transform", ...POSE[phase] }}
        >
          <div
            key={seated ? "seated" : "standing"}
            className={cn(
              "h-full origin-bottom",
              phase === "walk" && avatar.frames <= 1 && "animate-walk-bob",
              phase === "sit" && "animate-plop",
            )}
            style={phase === "sit" ? { animationDelay: "500ms" } : undefined}
          >
            <AvatarSprite
              avatar={avatar}
              animate={phase === "walk"}
              alt={`${avatar.name} in the living room`}
              className="h-full drop-shadow-[4px_4px_0_var(--ink)]"
            />
          </div>
        </div>
      }
    >
      {phase === "tv" && (
        <>
          <div
            className="pixel-frame absolute bg-ink"
            style={{ left: "71%", top: "55%", width: "1.4%", height: "3.2%" }}
            aria-hidden
          >
            <span className="absolute top-[15%] left-1/2 h-1 w-1 -translate-x-1/2 bg-neon-pink" />
          </div>
          {BEAM.map((b, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute h-[1.2%] w-[0.7%] bg-neon-pink"
              style={{
                left: `${b.left}%`,
                top: `${b.top}%`,
                animation: `beam 0.6s steps(2) ${i * 60}ms 2 both`,
              }}
            />
          ))}
          <p className="font-pixel animate-pop-in absolute top-[44%] left-[70%] text-xs glow-gold sm:text-base">
            CLICK!
          </p>
        </>
      )}

      {pulling && <TvVortex />}

      {pulling && (
        <p className="font-pixel animate-whoosh absolute top-[12%] left-[38%] text-3xl glow-pink pixel-text-shadow sm:text-6xl">
          WHOOSH!
        </p>
      )}

      {phase === "flash" && <div className="animate-white-flash absolute inset-0 bg-cream" aria-hidden />}

      {CAPTIONS[phase] && (
        <div className="pixel-frame absolute right-[4%] bottom-[4%] left-[4%] bg-lavender-night/90 px-4 py-2 sm:right-[20%] sm:left-[20%]">
          <p className="font-terminal text-center text-xl text-neon-cyan sm:text-3xl">
            <span className="text-neon-gold">{avatar.name}: </span>
            {CAPTIONS[phase]}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          stopAll();
          onDone();
        }}
        className="font-pixel absolute top-3 right-3 bg-ink/70 px-3 py-2 text-[9px] text-cream hover:text-neon-pink"
      >
        SKIP ▶▶
      </button>
    </LivingRoomStage>
  );
}
