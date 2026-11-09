import scarletSprite from "@/assets/avatar-scarlet.png";
import silverSprite from "@/assets/avatar-silver.png";
import jadeSprite from "@/assets/avatar-jade.png";
import walkerSprite from "@/assets/avatar-walker.png";

export type AvatarId = string;

/** A sprite the player can pick. It has no name — the player names their hero after picking. */
export interface AvatarLook {
  id: AvatarId;
  title: string;
  tagline: string;
  src: string;
  /** Full image size in px. For sprite sheets this is the whole strip. */
  width: number;
  height: number;
  /** Number of frames laid out left-to-right (1 = single still sprite). */
  frames: number;
  custom?: boolean;
}

/** The player's hero: a picked sprite plus the name the player typed. */
export interface Avatar extends AvatarLook {
  name: string;
}

export const HERO_NAME_MAX = 12;
export const FALLBACK_HERO_NAME = "HERO";

/** Trims, collapses spaces, upper-cases and caps the player's typed name; blank becomes "HERO". */
export function cleanHeroName(raw: string): string {
  const name = raw.replace(/\s+/g, " ").trim().toUpperCase().slice(0, HERO_NAME_MAX).trim();
  return name || FALLBACK_HERO_NAME;
}

export function nameAvatar(look: AvatarLook, rawName: string): Avatar {
  return { ...look, name: cleanHeroName(rawName) };
}

/** Bundled pixel avatars, so the selection screen works without remote asset hosting. */
export const AVATARS: AvatarLook[] = [
  {
    id: "silver",
    title: "The Double-Bun Trailblazer",
    tagline: "Fiery, sharp-witted, unapologetically direct.",
    src: silverSprite,
    width: 250,
    height: 250,
    frames: 1,
  },
  {
    id: "scarlet",
    title: "The Red-Haired Rebel",
    tagline: "Strategic, composed, fierce.",
    src: scarletSprite,
    width: 250,
    height: 250,
    frames: 1,
  },
  {
    id: "iris",
    title: "The Pink-Ponytail Explorer",
    tagline: "Optimistic, expressive, deeply empathetic.",
    src: walkerSprite,
    width: 250,
    height: 250,
    frames: 1,
  },
  {
    id: "jade",
    title: "The Emerald Guardian",
    tagline: "Cool, observant, grounded.",
    src: jadeSprite,
    width: 250,
    height: 250,
    frames: 1,
  },
];

export const DEFAULT_AVATAR: Avatar = nameAvatar(AVATARS.find((avatar) => avatar.id === "iris")!, "IRIS");
