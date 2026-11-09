import scarletSprite from "@/assets/avatar-scarlet.png";
import silverSprite from "@/assets/avatar-silver.png";
import jadeSprite from "@/assets/avatar-jade.png";
import walkerSprite from "@/assets/avatar-walker.png";

export type AvatarId = string;

export interface Avatar {
  id: AvatarId;
  name: string;
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

/** Bundled pixel avatars, so the selection screen works without remote asset hosting. */
export const AVATARS: Avatar[] = [
  {
    id: "silver",
    name: "SILVER",
    title: "The Double-Bun Trailblazer",
    tagline: "Fiery, sharp-witted, unapologetically direct.",
    src: silverSprite,
    width: 250,
    height: 250,
    frames: 1,
  },
  {
    id: "scarlet",
    name: "SCARLET",
    title: "The Red-Haired Rebel",
    tagline: "Strategic, composed, fierce.",
    src: scarletSprite,
    width: 250,
    height: 250,
    frames: 1,
  },
  {
    id: "iris",
    name: "IRIS",
    title: "The Pink-Ponytail Explorer",
    tagline: "Optimistic, expressive, deeply empathetic.",
    src: walkerSprite,
    width: 250,
    height: 250,
    frames: 1,
  },
  {
    id: "jade",
    name: "SILVER BRAID",
    title: "The Emerald Guardian",
    tagline: "Cool, observant, grounded.",
    src: jadeSprite,
    width: 250,
    height: 250,
    frames: 1,
  },
];

export const DEFAULT_AVATAR: Avatar = AVATARS.find((avatar) => avatar.id === "iris")!;
