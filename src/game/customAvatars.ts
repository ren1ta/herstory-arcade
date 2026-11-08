import { useSyncExternalStore } from "react";
import type { Avatar } from "./avatars";

/** Player-uploaded sprites, kept in this browser so the exhibition laptop remembers them. */
const STORAGE_KEY = "eight-bit-equality-avatars";
const MAX_CUSTOM = 6;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_SIDE = 1024;
const EMPTY: Avatar[] = [];

let list: Avatar[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Avatar[]) : [];
    list = Array.isArray(parsed) ? parsed.filter((a) => a && typeof a.src === "string") : [];
  } catch {
    list = [];
  }
}

function save(next: Avatar[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  list = next;
  for (const l of listeners) l();
}

export function useCustomAvatars(): Avatar[] {
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

function nameFromFile(fileName: string): string {
  const base = fileName.replace(/\.[^.]+$/, "").replace(/[^a-z0-9 ]/gi, " ").trim();
  return (base || "PLAYER").toUpperCase().slice(0, 10);
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

/** Reads an uploaded image (single sprite or horizontal sprite sheet) into an Avatar. */
export async function createCustomAvatar(file: File, frames: number): Promise<Avatar> {
  if (!file.type.startsWith("image/")) throw new Error("Please choose a PNG, GIF or JPG image.");
  if (file.size > MAX_FILE_BYTES) throw new Error("That image is over 5 MB — try a smaller one.");
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
    name: nameFromFile(file.name),
    title: safeFrames > 1 ? `Custom Sprite · ${safeFrames} frames` : "Custom Sprite",
    tagline: "Your very own pixel hero.",
    src: canvas.toDataURL("image/png"),
    width,
    height,
    frames: safeFrames,
    custom: true,
  };
}

export function addCustomAvatar(avatar: Avatar) {
  load();
  const next = [...list, avatar].slice(-MAX_CUSTOM);
  try {
    save(next);
  } catch {
    throw new Error("This browser's storage is full — remove an uploaded sprite first.");
  }
}

export function removeCustomAvatar(id: string) {
  load();
  try {
    save(list.filter((a) => a.id !== id));
  } catch {
    // ignore
  }
}
