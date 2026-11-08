import { useSyncExternalStore } from "react";

/** Sound effect files served from /public/audio. */
export const SOUNDS = {
  walk: "/audio/walk.mp3",
  sit: "/audio/sit.mp3",
  click: "/audio/click.mp3",
  teleport: "/audio/teleport_suck.mp3",
  select: "/audio/select.mp3",
  levelup: "/audio/levelup.mp3",
  victory: "/audio/victory.mp3",
} as const;

export type SoundName = keyof typeof SOUNDS;

export interface AudioSettings {
  enabled: boolean;
  volume: number; // 0..1
}

const STORAGE_KEY = "wamihs-audio";
const DEFAULT_SETTINGS: AudioSettings = { enabled: true, volume: 0.7 };

let settings: AudioSettings = DEFAULT_SETTINGS;
let loaded = false;
const listeners = new Set<() => void>();
const cache = new Map<SoundName, HTMLAudioElement>();
const playing = new Set<HTMLAudioElement>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AudioSettings>;
      settings = {
        enabled: typeof parsed.enabled === "boolean" ? parsed.enabled : DEFAULT_SETTINGS.enabled,
        volume:
          typeof parsed.volume === "number"
            ? Math.min(1, Math.max(0, parsed.volume))
            : DEFAULT_SETTINGS.volume,
      };
    }
  } catch {
    // ignore corrupt storage
  }
}

function emit() {
  for (const l of listeners) l();
}

export function setAudioSettings(next: Partial<AudioSettings>) {
  load();
  settings = { ...settings, ...next };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // storage may be unavailable
  }
  for (const el of playing) el.volume = settings.volume;
  if (!settings.enabled) stopAll();
  emit();
}

export function useAudioSettings(): AudioSettings {
  return useSyncExternalStore(
    (cb) => {
      load();
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => {
      load();
      return settings;
    },
    () => DEFAULT_SETTINGS,
  );
}

/** Warm the browser cache so the cinematic plays sounds on cue. */
export function preloadSounds() {
  if (typeof window === "undefined") return;
  for (const name of Object.keys(SOUNDS) as SoundName[]) {
    if (!cache.has(name)) {
      const el = new Audio(SOUNDS[name]);
      el.preload = "auto";
      cache.set(name, el);
    }
  }
}

/** HTML5 audio trigger. Each call uses a fresh clone so overlapping plays work. */
export function playSound(name: SoundName) {
  if (typeof window === "undefined") return;
  load();
  if (!settings.enabled || settings.volume <= 0) return;
  const base = cache.get(name) ?? new Audio(SOUNDS[name]);
  if (!cache.has(name)) cache.set(name, base);
  const el = base.cloneNode(true) as HTMLAudioElement;
  el.volume = settings.volume;
  playing.add(el);
  el.addEventListener("ended", () => playing.delete(el), { once: true });
  void el.play().catch(() => playing.delete(el));
}

export function stopAll() {
  for (const el of playing) {
    el.pause();
  }
  playing.clear();
}
