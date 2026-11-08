import { Volume2, VolumeX } from "lucide-react";
import { playSound, setAudioSettings, useAudioSettings } from "@/game/audio";
import { cn } from "@/lib/utils";

/** Persistent sound settings: SFX on/off toggle and volume slider. */
export function AudioControls({ variant = "corner" }: { variant?: "corner" | "inline" }) {
  const { enabled, volume } = useAudioSettings();

  return (
    <div
      className={cn(
        "pixel-frame flex items-center gap-3 bg-lavender-night/95 px-3 py-2 text-cream",
        variant === "corner" ? "fixed right-3 bottom-3 z-[90]" : "relative",
      )}
    >
      <button
        type="button"
        onClick={() => {
          setAudioSettings({ enabled: !enabled });
          if (!enabled) setTimeout(() => playSound("click"), 0);
        }}
        aria-pressed={enabled}
        aria-label={enabled ? "Turn sound effects off" : "Turn sound effects on"}
        className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
      >
        {enabled ? (
          <Volume2 className="h-5 w-5 text-neon-cyan" />
        ) : (
          <VolumeX className="h-5 w-5 text-muted-foreground" />
        )}
        <span className="font-pixel text-[8px]">SFX {enabled ? "ON" : "OFF"}</span>
      </button>
      <label className="flex items-center gap-2">
        <span className={variant === "inline" ? "font-pixel text-[8px] text-pastel-pink" : "sr-only"}>
          VOL
        </span>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={Math.round(volume * 100)}
          disabled={!enabled}
          aria-label="Volume"
          onChange={(e) => setAudioSettings({ volume: Number(e.target.value) / 100 })}
          onPointerUp={() => playSound("select")}
          className={cn("pixel-range", variant === "inline" ? "w-32 sm:w-44" : "w-24 sm:w-32")}
        />
        <span className="font-pixel w-8 text-right text-[8px] text-neon-gold">
          {Math.round(volume * 100)}
        </span>
      </label>
    </div>
  );
}
