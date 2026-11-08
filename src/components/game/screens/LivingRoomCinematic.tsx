import { useEffect, useState, type CSSProperties } from "react";
import livingRoom from "@/assets/living-room.jpg";
import type { Avatar } from "@/game/avatars";
import { playSound, stopAll } from "@/game/audio";
import { cn } from "@/lib/utils";

type Phase = "enter" | "walk" | "sit" | "tv" | "vortex" | "flash";

/** Timeline in ms for the 10-second intro. */
const TIMELINE: { at: number; phase: Phase; sound?: Parameters<typeof playSound>[0] }[] = [
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
  flash: "WAIT — THE TV IS PULLING ME IN!",
};

/** Avatar position per phase, as % of the 16:9 scene. */
const POSE: Record<Phase, CSSProperties> = {
  enter: { left: "6%", bottom: "6%", height: "42%", transitionDuration: "0ms" },
  walk: { left: "44%", bottom: "6%", height: "42%", transitionDuration: "2900ms" },
  sit: { left: "59.5%", bottom: "21%", height: "36%", transitionDuration: "450ms" },
  tv: { left: "59.5%", bottom: "21%", height: "36%", transitionDuration: "0ms" },
  vortex: {
    left: "91%",
    bottom: "55%",
    height: "36%",
    transform: "translate(-50%, 50%) scale(0) rotate(900deg)",
    transitionDuration: "1500ms",
  },
  flash: {
    left: "91%",
    bottom: "55%",
    height: "36%",
    transform: "translate(-50%, 50%) scale(0) rotate(900deg)",
    transitionDuration: "0ms",
  },
};

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink p-2 sm:p-6">
      <div className="pixel-frame relative aspect-video w-full max-w-[min(100%,calc((100vh-3rem)*16/9))] overflow-hidden bg-lavender-night">
        <img
          src={livingRoom}
          alt="A cosy pixel-art living room with a pink couch, coffee table, plants and a big old TV"
          width={1536}
          height={864}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* TV screen glow */}
        <div
          className={cn(
            "absolute transition-opacity duration-150",
            tvOn ? "tv-static opacity-90" : "opacity-0",
          )}
          style={{ left: "88.2%", top: "36.5%", width: "8.6%", height: "17%" }}
          aria-hidden
        />
        {tvOn && (
          <div
            className="pointer-events-none absolute rounded-full"
            style={{
              left: "92.5%",
              top: "45%",
              width: "40%",
              aspectRatio: "1",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--neon-cyan) 35%, transparent), transparent 65%)",
            }}
            aria-hidden
          />
        )}

        {/* Vortex */}
        {pulling && (
          <div
            className="absolute"
            style={{
              left: "92.5%",
              top: "45%",
              width: "55%",
              aspectRatio: "1",
              transform: "translate(-50%, -50%)",
            }}
            aria-hidden
          >
            <div className="vortex animate-pop-in h-full w-full rounded-full" />
          </div>
        )}

        {/* Avatar */}
        <div
          className="absolute transition-all ease-linear"
          style={{ transitionProperty: "left, bottom, height, transform", ...POSE[phase] }}
        >
          <img
            key={phase === "sit" ? "sit" : "other"}
            src={avatar.src}
            alt={`${avatar.name} walking through the living room`}
            className={cn(
              "h-full w-auto origin-bottom drop-shadow-[4px_4px_0_var(--ink)]",
              phase === "walk" && "animate-walk-bob",
              phase === "sit" && "animate-plop",
            )}
            style={
              phase === "sit" || phase === "tv"
                ? { clipPath: "inset(0 0 42% 0)" }
                : undefined
            }
          />
        </div>

        {pulling && (
          <p className="font-pixel animate-whoosh absolute top-[12%] left-[38%] text-3xl text-glow-pink text-pixel-shadow sm:text-6xl">
            WHOOSH!
          </p>
        )}

        {phase === "flash" && (
          <div className="animate-white-flash absolute inset-0 bg-cream" aria-hidden />
        )}

        {/* Caption box */}
        {CAPTIONS[phase] && phase !== "flash" && (
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
      </div>
    </div>
  );
}
