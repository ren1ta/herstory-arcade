import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { Avatar } from "@/game/avatars";
import { ACTS, type Act } from "@/game/story";
import { MAX_STARS, TOTAL_ACTS, getRank } from "@/game/state";
import { playSound } from "@/game/audio";
import { cn } from "@/lib/utils";
import { AvatarSprite } from "../AvatarSprite";
import { LivingRoomStage, ROOM, TvVortex } from "../LivingRoomStage";
import { PixelDissolve } from "../PixelDissolve";
import { PixelButton } from "../PixelButton";
import { PixelWindow } from "../PixelWindow";
import { PixelHeart, PixelStar } from "../PixelIcons";

type Phase = "arrive" | "emerge" | "seated" | "leaving";

const CENTER = "translateX(-50%)";
const IN_TV = "translate(-50%, 50%) scale(0) rotate(-900deg)";
const POSE: Record<Phase, CSSProperties> = {
  arrive: { ...ROOM.tv, transform: IN_TV, transitionDuration: "0ms" },
  emerge: { ...ROOM.seat, transform: CENTER, transitionDuration: "1000ms" },
  seated: { ...ROOM.seat, transform: CENTER, transitionDuration: "0ms" },
  leaving: { ...ROOM.tv, transform: IN_TV, transitionDuration: "1300ms" },
};
const CONFETTI = ["var(--neon-pink)", "var(--neon-cyan)", "var(--neon-gold)", "var(--pastel-pink)"];

interface HomeScreenProps {
  avatar: Avatar;
  clearedAct: Act;
  /** Final homecoming after Act III. */
  victory: boolean;
  stars: number;
  retries: number;
  onLeave: () => void;
  onReplay: () => void;
}

/** Pixel-dissolve back to the living room after a story; portal to the next act or final victory. */
export function HomeScreen({ avatar, clearedAct, victory, stars, retries, onLeave, onReplay }: HomeScreenProps) {
  const [phase, setPhase] = useState<Phase>("arrive");
  const nextAct = ACTS[clearedAct.number];

  useEffect(() => {
    playSound("teleport");
    const t1 = window.setTimeout(() => setPhase("emerge"), 900);
    const t2 = window.setTimeout(() => {
      setPhase("seated");
      playSound(victory ? "victory" : "sit");
    }, 1950);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [victory]);

  const leave = () => {
    setPhase("leaving");
    playSound("teleport");
    window.setTimeout(onLeave, 1500);
  };

  const confetti = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        delay: `${(i % 9) * 0.35}s`,
        duration: `${3 + (i % 5)}s`,
        color: CONFETTI[i % CONFETTI.length],
      })),
    [],
  );

  const tvOn = victory ? phase === "arrive" || phase === "emerge" : true;
  const showPortal = phase === "arrive" || phase === "emerge" || phase === "leaving";

  const stage = (
    <LivingRoomStage
      fullscreen={!victory}
      tvOn={tvOn}
      actor={
        <div className="absolute transition-all ease-out" style={{ transitionProperty: "left, bottom, height, transform", ...POSE[phase] }}>
          <div key={phase === "seated" ? "s" : "o"} className={cn("h-full origin-bottom", phase === "seated" && "animate-plop")}>
            <AvatarSprite avatar={avatar} alt={`${avatar.name} back home`} className="h-full drop-shadow-[4px_4px_0_var(--ink)]" />
          </div>
        </div>
      }
    >
      {showPortal && <TvVortex reverse={phase !== "leaving"} />}
      {!victory && phase === "seated" && (
        <div className="pixel-frame animate-pop-in absolute right-[4%] bottom-[4%] left-[4%] bg-lavender-night/95 px-4 py-3 text-center sm:right-[14%] sm:left-[14%]">
          <p className="font-pixel text-[10px] glow-gold sm:text-xs">
            ACT {clearedAct.numeral} CLEAR · PORTAL TO ACT {nextAct?.numeral} UNLOCKED
          </p>
          <p className="font-terminal mt-2 text-xl text-cream sm:text-2xl">
            <span className="text-neon-gold">{avatar.name}: </span>
            Phew... home! But the TV is still glowing — the timeline isn't finished yet.
          </p>
          <PixelButton size="md" variant="gold" className="mt-3" onClick={leave} autoFocus>
            JUMP INTO ACT {nextAct?.numeral} ▶
          </PixelButton>
        </div>
      )}
    </LivingRoomStage>
  );

  if (!victory) {
    return (
      <>
        {stage}
        <PixelDissolve />
      </>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-3 py-6 sm:px-6">
      {phase === "seated" && (
        <div className="pointer-events-none fixed inset-0 z-[80]" aria-hidden>
          {confetti.map((c, i) => (
            <span
              key={i}
              className="absolute top-0 h-3 w-3"
              style={{ left: c.left, background: c.color, animation: `confetti-fall ${c.duration} linear ${c.delay} infinite` }}
            />
          ))}
        </div>
      )}
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        {stage}
        <PixelWindow title="SIMULATION_BROKEN.EXE" className="w-full">
          <h1 className="font-pixel text-center text-xl glow-pink sm:text-3xl">VICTORY — YOU'RE HOME!</h1>
          <p className="font-terminal mt-3 text-center text-2xl sm:text-3xl">
            {avatar.name} walked a mile through every life stage, from 1950s toy shelves to the 2026
            Digital Summit — proving the fight for equality evolves alongside us.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            <div className="flex gap-1">
              {Array.from({ length: TOTAL_ACTS }, (_, i) => (
                <PixelHeart key={i} filled className="h-8 w-8" />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <PixelStar className="animate-star-spin h-8 w-8" />
              <span className="font-pixel text-sm text-lavender-deep">{stars} / {MAX_STARS}</span>
            </div>
            <span className="font-pixel text-[9px] text-lavender-deep">CONTINUES USED: {retries}</span>
          </div>
          <p className="font-pixel mt-4 text-center text-[10px] text-lavender-deep">RANK</p>
          <p className="font-pixel mt-2 bg-lavender-night py-3 text-center text-sm glow-gold sm:text-base">{getRank(retries)}</p>
          <ol className="mt-6 grid gap-2 sm:grid-cols-3">
            {ACTS.map((a) => (
              <li key={a.number} className="border-l-8 border-neon-pink bg-pastel-pink/50 px-3 py-2">
                <p className="font-pixel text-[8px] text-lavender-deep">ACT {a.numeral} · {a.era}</p>
                <p className="font-terminal text-xl">{a.title}</p>
              </li>
            ))}
          </ol>
          <p className="font-terminal mt-6 text-center text-2xl text-ink/80">
            The next level is real life. What will you stand up for?
          </p>
          <div className="mt-6 flex justify-center">
            <PixelButton size="lg" variant="gold" onClick={onReplay}>↻ PLAY AGAIN</PixelButton>
          </div>
        </PixelWindow>
      </div>
      <PixelDissolve />
    </div>
  );
}
