import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AVATARS, HERO_NAME_MAX, type AvatarLook } from "@/game/avatars";
import {
  addCustomAvatar,
  createCustomAvatar,
  hideBuiltInAvatar,
  removeCustomAvatar,
  useHiddenAvatars,
  useCustomAvatars,
} from "@/game/customAvatars";
import { playSound } from "@/game/audio";
import { useHotkeys } from "@/game/useHotkeys";
import { PixelButton } from "../PixelButton";
import { PixelWindow } from "../PixelWindow";
import { AvatarSprite } from "../AvatarSprite";

const FRAME_OPTIONS = [1, 2, 3, 4, 6, 8];

/** Sliding sideways carousel of avatars, with a final "upload your own sprite" card. */
export function AvatarSelect({ onConfirm }: { onConfirm: (look: AvatarLook, name: string) => void }) {
  const custom = useCustomAvatars();
  const hiddenAvatarIds = useHiddenAvatars();
  const avatars = useMemo(
    () => [...AVATARS.filter((avatar) => !hiddenAvatarIds.includes(avatar.id)), ...custom],
    [custom, hiddenAvatarIds],
  );
  const slideCount = avatars.length + 1; // + upload card
  const [index, setIndex] = useState(0);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [frames, setFrames] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const swipeX = useRef<number | null>(null);
  /** The sprite picked in the carousel, waiting for the player to type a name. */
  const [naming, setNaming] = useState<AvatarLook | null>(null);

  const current = avatars[index] ?? null;

  useEffect(() => {
    if (!pendingId) return;
    const i = avatars.findIndex((a) => a.id === pendingId);
    if (i >= 0) {
      setIndex(i);
      setPendingId(null);
    }
  }, [pendingId, avatars]);

  useEffect(() => {
    if (index > slideCount - 1) setIndex(slideCount - 1);
  }, [index, slideCount]);

  const go = (next: number) => {
    const clamped = (next + slideCount) % slideCount;
    if (clamped !== index) playSound("select");
    setIndex(clamped);
  };

  useHotkeys((key) => {
    if (key === "arrowleft") go(index - 1);
    if (key === "arrowright") go(index + 1);
    if (key === "enter" && current) {
      playSound("click");
      setNaming(current);
    }
  }, !naming);

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setBusy(true);
    try {
      const avatar = await createCustomAvatar(file, frames);
      addCustomAvatar(avatar);
      setPendingId(avatar.id);
      playSound("levelup");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong reading that image.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const onRemove = (id: string) => {
    setError(null);
    try {
      if (custom.some((avatar) => avatar.id === id)) removeCustomAvatar(id);
      else hideBuiltInAvatar(id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "The avatar could not be removed.");
    }
  };

  if (naming) {
    return <NameHero look={naming} onBack={() => setNaming(null)} onConfirm={(name) => onConfirm(naming, name)} />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <PixelWindow title="WALK A MILE IN HER SHOES · PLAYER SELECT" className="w-full max-w-4xl">
        <p className="font-pixel text-center text-[8px] text-neon-cyan">8-BIT EQUALITY</p>
        <h1 className="font-pixel mt-3 text-center text-sm text-lavender-deep sm:text-lg">CHOOSE YOUR HERO</h1>
        <p className="font-terminal mt-2 text-center text-2xl text-ink/80">
          Slide through the heroes — or upload your own pixel sprite.
        </p>

        <div
          className="relative mt-6 h-[400px] overflow-hidden sm:h-[430px]"
          style={{ ["--slide" as string]: "min(64vw, 280px)" }}
          role="listbox"
          aria-label="Avatars"
          onPointerDown={(e) => (swipeX.current = e.clientX)}
          onPointerUp={(e) => {
            if (swipeX.current === null) return;
            const dx = e.clientX - swipeX.current;
            swipeX.current = null;
            if (Math.abs(dx) > 40) go(dx < 0 ? index + 1 : index - 1);
          }}
        >
          <div
            className="absolute top-0 left-1/2 flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(var(--slide) * -${index + 0.5}))` }}
          >
            {avatars.map((a, i) => {
              const active = i === index;
              return (
                <div key={a.id} className="h-full shrink-0 px-3" style={{ width: "var(--slide)" }}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => (active ? setNaming(a) : go(i))}
                    className={cn(
                      "relative flex h-full w-full flex-col items-center p-4 transition-all duration-300 focus-visible:outline-none",
                      active
                        ? "pixel-frame-glow bg-lavender-night text-cream"
                        : "pixel-frame scale-90 bg-pastel-pink text-ink opacity-60",
                    )}
                  >
                    <div className="flex h-48 items-end justify-center sm:h-56">
                      <div className={cn("h-full", active && "animate-idle-bob")}>
                        <AvatarSprite
                          avatar={a}
                          animate={active}
                          alt={a.title}
                          className="h-full drop-shadow-[4px_4px_0_var(--ink)]"
                        />
                      </div>
                    </div>
                    <p className={cn("font-pixel mt-4 text-[10px] leading-relaxed", active ? "glow-pink" : "text-lavender-deep")}>
                      {active ? "▶ " : ""}
                      {a.title}
                    </p>
                    <p className="font-terminal mt-2 text-xl leading-tight">{a.tagline}</p>
                  </button>
                  {active && (
                    <button
                      type="button"
                      onClick={() => onRemove(a.id)}
                      aria-label={`Remove ${a.title} from the avatar list`}
                      className="font-pixel absolute top-2 right-5 bg-ink px-2 py-1 text-[8px] text-cream hover:text-neon-pink"
                    >
                      ✕ REMOVE / DELETE
                    </button>
                  )}
                </div>
              );
            })}

            {/* Upload card */}
            <div className="h-full shrink-0 px-3" style={{ width: "var(--slide)" }}>
              <div
                className={cn(
                  "flex h-full w-full flex-col items-center justify-center gap-3 border-4 border-dashed border-lavender-deep p-4 text-center transition-all duration-300",
                  index === avatars.length ? "bg-cream" : "scale-90 bg-pastel-pink opacity-60",
                )}
                onClick={() => index !== avatars.length && go(avatars.length)}
              >
                <p className="font-pixel text-3xl text-neon-pink">+</p>
                <p className="font-pixel text-[10px] text-lavender-deep">ADD YOUR SPRITE</p>
                <p className="font-terminal text-lg leading-tight">
                  PNG or GIF with a transparent background works best. Sprite sheet? Pick its frame count.
                </p>
                <label className="font-pixel flex items-center gap-2 text-[8px]">
                  FRAMES
                  <select
                    value={frames}
                    onChange={(e) => setFrames(Number(e.target.value))}
                    className="font-pixel bg-lavender-night px-2 py-1 text-[9px] text-cream"
                  >
                    {FRAME_OPTIONS.map((f) => (
                      <option key={f} value={f}>
                        {f === 1 ? "1 (still)" : f}
                      </option>
                    ))}
                  </select>
                </label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/png,image/gif,image/webp,image/jpeg"
                  className="hidden"
                  onChange={(e) => void onFile(e.target.files?.[0])}
                />
                <PixelButton size="sm" variant="cyan" disabled={busy} onClick={() => fileRef.current?.click()}>
                  {busy ? "LOADING…" : "CHOOSE IMAGE"}
                </PixelButton>
              </div>
            </div>
          </div>

          <PixelButton
            size="sm"
            variant="night"
            className="absolute top-1/2 left-1 -translate-y-1/2"
            aria-label="Previous avatar"
            silent
            onClick={() => go(index - 1)}
          >
            ◀
          </PixelButton>
          <PixelButton
            size="sm"
            variant="night"
            className="absolute top-1/2 right-1 -translate-y-1/2"
            aria-label="Next avatar"
            silent
            onClick={() => go(index + 1)}
          >
            ▶
          </PixelButton>
        </div>

        <div className="mt-4 flex justify-center gap-2" aria-hidden>
          {Array.from({ length: slideCount }, (_, i) => (
            <span key={i} className={cn("h-3 w-3", i === index ? "bg-neon-pink" : "bg-lavender/60")} />
          ))}
        </div>
        {error && <p role="status" className="font-terminal mt-3 text-center text-lg text-destructive">{error}</p>}

        <div className="mt-6 flex justify-center">
          <PixelButton size="lg" variant="gold" disabled={!current} onClick={() => current && setNaming(current)}>
            {current ? "PICK THIS HERO ▶" : "UPLOAD A SPRITE FIRST"}
          </PixelButton>
        </div>
        <p className="font-pixel mt-4 text-center text-[8px] text-lavender-deep">◀ ▶ ARROW KEYS OR SWIPE · ENTER TO PICK</p>
      </PixelWindow>
    </div>
  );
}

/** Second step: the player types any name they like for the hero they picked. */
function NameHero({
  look,
  onBack,
  onConfirm,
}: {
  look: AvatarLook;
  onBack: () => void;
  onConfirm: (name: string) => void;
}) {
  const [name, setName] = useState("");
  const ready = name.trim().length > 0;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <PixelWindow title="WALK A MILE IN HER SHOES · NAME YOUR HERO" className="w-full max-w-2xl">
        <h1 className="font-pixel text-center text-sm text-lavender-deep sm:text-lg">NAME YOUR HERO</h1>
        <p className="font-terminal mt-2 text-center text-2xl text-ink/80">Give her any name you like.</p>

        <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
          <div className="pixel-frame-glow flex h-48 w-48 shrink-0 items-end justify-center bg-lavender-night p-3">
            <div className="h-full animate-idle-bob">
              <AvatarSprite
                avatar={look}
                animate
                alt={look.title}
                className="h-full drop-shadow-[4px_4px_0_var(--ink)]"
              />
            </div>
          </div>

          <form
            className="flex w-full flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!ready) return;
              playSound("click");
              onConfirm(name);
            }}
          >
            <p className="font-pixel text-[10px] text-neon-pink">{look.title}</p>
            <p className="font-terminal text-xl leading-tight text-ink/80">{look.tagline}</p>
            <label htmlFor="hero-name" className="font-pixel mt-2 text-[9px] text-lavender-deep">
              HERO NAME
            </label>
            <input
              id="hero-name"
              autoFocus
              autoComplete="off"
              spellCheck={false}
              maxLength={HERO_NAME_MAX}
              value={name}
              placeholder="TYPE A NAME"
              onChange={(e) => {
                setName(e.target.value);
                playSound("blip");
              }}
              className="pixel-inset font-pixel w-full bg-cream px-3 py-3 text-sm uppercase text-ink placeholder:text-ink/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neon-cyan"
            />
            <p className="font-pixel text-right text-[8px] text-lavender-deep">
              {name.length}/{HERO_NAME_MAX}
            </p>
            <div className="mt-1 flex flex-wrap justify-between gap-3">
              <PixelButton type="button" size="sm" variant="night" onClick={onBack}>
                ◀ BACK
              </PixelButton>
              <PixelButton type="submit" size="md" variant="gold" disabled={!ready} silent>
                PLAY AS {ready ? name.trim().toUpperCase() : "…"} ▶
              </PixelButton>
            </div>
          </form>
        </div>
        <p className="font-pixel mt-6 text-center text-[8px] text-lavender-deep">TYPE A NAME · ENTER TO START</p>
      </PixelWindow>
    </div>
  );
}
