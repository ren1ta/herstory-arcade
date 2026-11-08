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
  stopped: boolean;
  stars: number;
  retries: number;
  onLeave: () => void;
  onStop: () => void;
  onReplay: () => void;
}

/** Pixel-dissolve back to the living room after a story; portal to the next act or final summary. */
export function HomeScreen({
  avatar,
  clearedAct,
  victory,
  stopped,
  stars,
  retries,
  onLeave,
  onStop,
  onReplay,
}: HomeScreenProps) {
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

  const tvOn = !stopped && (victory ? phase === "arrive" || phase === "emerge" : true);
  const showPortal = !stopped && (phase === "arrive" || phase === "emerge" || phase === "leaving");
  const homecomingDialogue =
    clearedAct.number === 1
      ? "Seeing history like that... the structural barriers women fought through was eye-opening. But I can feel it—there's so much more history and activism left to fight for!"
      : "Intersectionality changed everything! But as we move into the modern digital age, new technological barriers are rising. I can't stop now—I have to see how activism evolves in the digital era!";

  const stage = (
    <LivingRoomStage
      fullscreen={!victory && !stopped}
      tvOn={tvOn}
      actor={
        <div
          className="absolute transition-all ease-out"
          style={{ transitionProperty: "left, bottom, height, transform", ...POSE[phase] }}
        >
          <div
            key={phase === "seated" ? "s" : "o"}
            className={cn("h-full origin-bottom", phase === "seated" && "animate-plop")}
          >
            <AvatarSprite
              avatar={avatar}
              alt={`${avatar.name} back home`}
              className="h-full drop-shadow-[4px_4px_0_var(--ink)]"
            />
          </div>
        </div>
      }
    >
      {showPortal && <TvVortex reverse={phase !== "leaving"} />}
      {!victory && !stopped && phase === "seated" && (
        <div className="pixel-frame animate-pop-in absolute right-[4%] bottom-[4%] left-[4%] bg-lavender-night/95 px-4 py-3 text-center sm:right-[10%] sm:left-[10%]">
          <p className="font-pixel text-[10px] glow-gold sm:text-xs">
            ACT {clearedAct.numeral} CLEAR · ACT {nextAct?.numeral} UNLOCKED
          </p>
          <p className="font-terminal mt-2 text-lg text-cream sm:text-2xl">
            <span className="text-neon-gold">{avatar.name}: </span>
            {homecomingDialogue}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <PixelButton size="md" variant="gold" onClick={leave} autoFocus>
              CONTINUE TO ACT {nextAct?.numeral} ▶
            </PixelButton>
            <PixelButton size="md" variant="night" onClick={onStop}>
              STOP HERE
            </PixelButton>
          </div>
        </div>
      )}
    </LivingRoomStage>
  );

  if (!victory && !stopped) {
    return (
      <>
        {stage}
        <PixelDissolve />
      </>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-3 py-6 sm:px-6">
      {victory && phase === "seated" && (
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
        <PixelWindow title={victory ? "FULL_JOURNEY_COMPLETE.EXE" : "CLOSING_CREDITS.EXE"} className="w-full">
          <h1 className="font-pixel text-center text-xl glow-pink sm:text-3xl">
            {victory ? "VICTORY!" : "THANK YOU FOR PLAYING"}
          </h1>
          <p className="font-terminal mt-3 text-center text-2xl sm:text-3xl">
            {victory
              ? "You completed the full journey from historical suffrage to digital ethics. Equality evolves through continuous action!"
              : "Thank you for walking a mile in her shoes!"}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            <div className="flex gap-1" aria-label={`${Math.floor(stars / 4)} of ${TOTAL_ACTS} acts cleared`}>
              {Array.from({ length: TOTAL_ACTS }, (_, i) => (
                <PixelHeart key={i} filled={i < Math.floor(stars / 4)} className="h-8 w-8" />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <PixelStar className="animate-star-spin h-8 w-8" />
              <span className="font-pixel text-sm text-lavender-deep">{stars} / {MAX_STARS}</span>
            </div>
            <span className="font-pixel text-[9px] text-lavender-deep">CONTINUES USED: {retries}</span>
          </div>
          <p className="font-pixel mt-4 text-center text-[10px] text-lavender-deep">RANK</p>
          <p className="font-pixel mt-2 bg-lavender-night py-3 text-center text-sm glow-gold sm:text-base">
            {getRank(retries)}
          </p>
          <ol className="mt-6 grid gap-2 sm:grid-cols-3">
            {ACTS.map((act) => (
              <li key={act.number} className="border-l-8 border-neon-pink bg-pastel-pink/50 px-3 py-2">
                <p className="font-pixel text-[8px] text-lavender-deep">
                  ACT {act.numeral} · {act.era} · {act.number <= clearedAct.number ? "CLEARED" : "NOT PLAYED"}
                </p>
                <p className="font-terminal text-xl">{act.title}</p>
              </li>
            ))}
          </ol>
          {victory && (
            <p className="font-terminal mt-6 text-center text-2xl text-ink/80">
              The next level is real life. What will you stand up for?
            </p>
          )}
          <div className="mt-6 flex justify-center">
            <PixelButton size="lg" variant="gold" onClick={onReplay}>↻ PLAY AGAIN</PixelButton>
          </div>
        </PixelWindow>
      </div>
      <PixelDissolve />
    </div>
  );
}
