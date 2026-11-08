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
const ACT_DIALOGUE: Record<number, string> = {
  1: "Seeing history like that... the structural barriers women fought through was eye-opening. But I can feel it—there's so much more history and activism left to fight for!",
  2: "Intersectionality changed everything! But as we move into the modern digital age, new technological barriers are rising. I can't stop now—I have to see how activism evolves in the digital era!",
};

interface HomeScreenProps {
  avatar: Avatar;
  clearedAct: Act;
  victory: boolean;
  ending: boolean;
  stars: number;
  retries: number;
  onLeave: () => void;
  onStop: () => void;
  onReplay: () => void;
}

/** Pixel-dissolve back to the living room after a story, with act choices or the final summary. */
export function HomeScreen({
  avatar,
  clearedAct,
  victory,
  ending,
  stars,
  retries,
  onLeave,
  onStop,
  onReplay,
}: HomeScreenProps) {
  const [phase, setPhase] = useState<Phase>("arrive");
  const nextAct = ACTS[clearedAct.number];
  const showSummary = victory || ending;

  useEffect(() => {
    playSound("teleport");
    const emergeTimer = window.setTimeout(() => setPhase("emerge"), 900);
    const seatedTimer = window.setTimeout(() => {
      setPhase("seated");
      playSound(victory ? "victory" : "sit");
    }, 1950);
    return () => {
      window.clearTimeout(emergeTimer);
      window.clearTimeout(seatedTimer);
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

  const tvOn = ending ? false : victory ? phase === "arrive" || phase === "emerge" : true;
  const showPortal = !ending && (phase === "arrive" || phase === "emerge" || phase === "leaving");
  const hearts = Math.floor(stars / 4);

  const stage = (
    <LivingRoomStage
      fullscreen={!showSummary}
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
      {!showSummary && phase === "seated" && (
        <div className="pixel-frame animate-pop-in absolute right-[3%] bottom-[3%] left-[3%] bg-lavender-night/95 px-3 py-3 text-center sm:right-[10%] sm:left-[10%] sm:px-5">
          <p className="font-pixel text-[9px] glow-gold sm:text-xs">
            ACT {clearedAct.numeral} CLEAR · ACT {nextAct?.numeral} PORTAL UNLOCKED
          </p>
          <p className="font-terminal mt-2 text-lg text-cream sm:text-2xl">
            <span className="text-neon-gold">{avatar.name}: </span>
            {ACT_DIALOGUE[clearedAct.number]}
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

  return (
    <div className={cn("relative min-h-screen overflow-hidden px-3 py-6 sm:px-6", !showSummary && "flex items-center justify-center bg-ink")}>
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
      <div className={cn("mx-auto flex w-full flex-col gap-6", showSummary ? "max-w-5xl" : "max-w-[min(100%,calc((100vh-3rem)*16/9))]")}>
        {stage}
        {showSummary && (
          <PixelWindow title={victory ? "FULL_JOURNEY_COMPLETE.EXE" : "JOURNEY_SUMMARY.EXE"} className="w-full">
            <h1 className="font-pixel text-center text-xl glow-pink sm:text-3xl">
              {victory ? "GRAND VICTORY!" : "THANK YOU, HERO!"}
            </h1>
            <p className="font-terminal mt-3 text-center text-2xl sm:text-3xl">
              {victory
                ? "VICTORY! You completed the full journey from historical suffrage to digital ethics. Equality evolves through continuous action!"
                : "Thank you for walking a mile in her shoes!"}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
              <div className="flex gap-1" aria-label={`${hearts} of ${TOTAL_ACTS} act badges`}>
                {Array.from({ length: TOTAL_ACTS }, (_, i) => (
                  <PixelHeart key={i} filled={i < hearts} className="h-8 w-8" />
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
              {ACTS.map((act, index) => (
                <li
                  key={act.number}
                  className={cn("border-l-8 px-3 py-2", index < hearts ? "border-neon-pink bg-pastel-pink/50" : "border-lavender-deep bg-lavender/30")}
                >
                  <p className="font-pixel text-[8px] text-lavender-deep">
                    ACT {act.numeral} · {act.era} {index < hearts ? "★" : ""}
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
              <PixelButton size="lg" variant="gold" onClick={onReplay}>
                ↻ PLAY AGAIN
              </PixelButton>
            </div>
          </PixelWindow>
        )}
      </div>
      <PixelDissolve />
    </div>
  );
}
