import { useSyncExternalStore } from "react";
import type { AvatarLook } from "./avatars";

/** Player-uploaded sprites, kept in this browser so the exhibition laptop remembers them. */
const STORAGE_KEY = "eight-bit-equality-avatars";
const HIDDEN_AVATARS_KEY = "wamihs-hidden-avatars";
const MAX_CUSTOM = 6;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_SIDE = 1024;
const EMPTY: AvatarLook[] = [];

let list: AvatarLook[] = EMPTY;
let loaded = false;
let hiddenAvatarIds: string[] = [];
let hiddenLoaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as AvatarLook[]) : [];
    list = Array.isArray(parsed) ? parsed.filter((a) => a && typeof a.src === "string") : [];
  } catch {
    list = [];
  }
}

function loadHiddenAvatars() {
  if (hiddenLoaded || typeof window === "undefined") return;
  hiddenLoaded = true;
  try {
    const raw = window.localStorage.getItem(HIDDEN_AVATARS_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    hiddenAvatarIds = Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    hiddenAvatarIds = [];
  }
}

function save(next: AvatarLook[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  list = next;
  for (const l of listeners) l();
}

function saveHiddenAvatars(next: string[]) {
  window.localStorage.setItem(HIDDEN_AVATARS_KEY, JSON.stringify(next));
  hiddenAvatarIds = next;
  for (const l of listeners) l();
}

export function useCustomAvatars(): AvatarLook[] {
  return useSyncExternalStore(
    (cb) => {
      load();
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => {
      load();
      return list;
    },
    () => EMPTY,
  );
}

export function useHiddenAvatars(): string[] {
  return useSyncExternalStore(
    (cb) => {
      loadHiddenAvatars();
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => {
      loadHiddenAvatars();
      return hiddenAvatarIds;
    },
    () => [],
  );
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("That file isn't an image we can read."));
    img.src = url;
  });
}

/** Reads an uploaded image (single sprite or horizontal sprite sheet) into an AvatarLook. */
export async function createCustomAvatar(
  file: File,
  frames: number,
  customName: string,
  personality: string,
): Promise<AvatarLook> {
  if (!file.type.startsWith("image/")) throw new Error("Please choose a PNG, GIF or JPG image.");
  if (file.size > MAX_FILE_BYTES) throw new Error("That image is over 5 MB — try a smaller one.");
  const title = customName.replace(/\s+/g, " ").trim();
  const tagline = personality.replace(/\s+/g, " ").trim();
  if (!title) throw new Error("Enter a name for this sprite.");
  if (!tagline) throw new Error("Enter a personality description for this sprite.");
  if (title.length > 24) throw new Error("Sprite names must be 24 characters or fewer.");
  if (tagline.length > 120) throw new Error("Personality descriptions must be 120 characters or fewer.");
  const img = await loadImage(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
  const width = Math.max(1, Math.round(img.naturalWidth * scale));
  const height = Math.max(1, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Your browser couldn't process that image.");
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, 0, 0, width, height);
  URL.revokeObjectURL(img.src);
  const safeFrames = Math.min(12, Math.max(1, Math.round(frames)));
  return {
    id: `custom-${Date.now().toString(36)}`,
    title,
    tagline,
    src: canvas.toDataURL("image/png"),
    width,
    height,
    frames: safeFrames,
    custom: true,
  };
}

export function addCustomAvatar(avatar: AvatarLook) {
  load();
  if (list.length >= MAX_CUSTOM) throw new Error(`You can keep up to ${MAX_CUSTOM} custom avatars. Remove one before adding another.`);
  const next = [...list, avatar];
  try {
    save(next);
  } catch {
    throw new Error("This browser's storage is full — remove an uploaded sprite first.");
  }
}

export function removeCustomAvatar(id: string) {
  load();
  save(list.filter((a) => a.id !== id));
}

export function hideBuiltInAvatar(id: string) {
  loadHiddenAvatars();
  if (!hiddenAvatarIds.includes(id)) saveHiddenAvatars([...hiddenAvatarIds, id]);
}
