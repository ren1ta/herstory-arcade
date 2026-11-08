import { useEffect } from "react";
import { PixelButton } from "../PixelButton";
import { AVATARS } from "@/game/avatars";

export function TitleScreen({ onStart }: { onStart: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") onStart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onStart]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 text-center">
      <div className="starfield absolute inset-0" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-[38vh] overflow-hidden" aria-hidden>
        <div className="synth-grid absolute -inset-x-1/2 top-0 h-[200%]" />
      </div>

      <p className="font-pixel relative mb-6 text-[10px] text-neon-cyan sm:text-xs">
        ★ SOCIAL SCIENCE ARCADE ★
      </p>
      <h1 className="font-pixel relative text-2xl leading-snug text-cream text-pixel-shadow sm:text-4xl md:text-5xl">
        WALK A MILE
        <br />
        <span className="text-glow-pink">IN HER SHOES</span>
      </h1>
      <p className="font-terminal relative mt-6 max-w-xl text-2xl text-pastel-pink sm:text-3xl">
        A retro journey through the four waves of feminism — 1890s to today.
      </p>

      <div className="relative mt-10 flex items-end gap-6 sm:gap-10" aria-hidden>
        {AVATARS.map((a, i) => (
          <img
            key={a.id}
            src={a.src}
            alt=""
            className="animate-idle-bob h-28 w-auto drop-shadow-[4px_4px_0_var(--ink)] sm:h-40"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}
      </div>

      <PixelButton size="lg" className="relative mt-12" onClick={onStart} autoFocus>
        <span className="animate-blink">▶ PRESS START</span>
      </PixelButton>
      <p className="font-pixel relative mt-6 text-[8px] text-muted-foreground">
        PRESS ENTER · 4 LEVELS · 12 STARS TO COLLECT
      </p>
    </div>
  );
}
