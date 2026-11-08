import { PixelButton } from "../PixelButton";
import { AudioControls } from "../AudioControls";
import { AvatarSprite } from "../AvatarSprite";
import { AVATARS } from "@/game/avatars";
import { useHotkeys } from "@/game/useHotkeys";

export function TitleScreen({ onStart }: { onStart: () => void }) {
  useHotkeys((key) => {
    if (key === "enter" || key === " ") onStart();
  });

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 text-center">
      <div className="starfield absolute inset-0" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-[38vh] overflow-hidden" aria-hidden>
        <div className="synth-grid absolute -inset-x-1/2 top-0 h-[200%]" />
      </div>

      <p className="font-pixel relative mb-6 text-[10px] text-neon-cyan sm:text-xs">
        ★ WALK A MILE IN HER SHOES ★
      </p>
      <h1 className="font-pixel relative text-3xl leading-snug text-cream pixel-text-shadow sm:text-5xl md:text-6xl">
        8-BIT
        <br />
        <span className="glow-pink">EQUALITY</span>
      </h1>
      <p className="font-terminal relative mt-6 max-w-xl text-2xl text-pastel-pink sm:text-3xl">
        Three timelines. Four life stages each. One bold choice at a time.
      </p>

      <div className="relative mt-10 flex items-end gap-5 sm:gap-8" aria-hidden>
        {AVATARS.map((a, i) => (
          <div key={a.id} className="animate-idle-bob h-24 sm:h-32" style={{ animationDelay: `${i * 0.25}s` }}>
            <AvatarSprite avatar={a} className="h-full drop-shadow-[4px_4px_0_var(--ink)]" />
          </div>
        ))}
      </div>

      <div className="relative mt-10">
        <AudioControls variant="inline" />
      </div>

      <PixelButton size="lg" className="relative mt-8" onClick={onStart} autoFocus>
        <span className="animate-blink">▶</span> START GAME
      </PixelButton>
      <p className="font-pixel relative mt-6 text-[8px] text-muted-foreground">
        PRESS ENTER · 3 STORIES · 12 LEVELS · CHOOSE BOLDLY
      </p>
    </div>
  );
}
