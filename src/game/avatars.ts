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
    id: "iris",
    name: "IRIS",
    title: "The Equality Explorer",
    tagline: "Steps into history and chooses a bolder future.",
    src: walkerSprite,
    width: 250,
    height: 250,
    frames: 1,
  },
  {
    id: "scarlet",
    name: "SCARLET",
    title: "The Red-Haired Rebel",
    tagline: "Fearless explorer of forgotten history.",
    src: scarletSprite,
    width: 250,
    height: 250,
    frames: 1,
  },
  {
    id: "silver",
    name: "SILVER",
    title: "The Silver-Haired Rebel",
    tagline: "Steps into history and chooses a bolder future.",
    src: silverSprite,
    width: 250,
    height: 250,
    frames: 1,
  },
  {
    id: "jade",
    name: "JADE",
    title: "The Green Guardian",
    tagline: "Grows change from the roots up.",
    src: jadeSprite,
    width: 250,
    height: 250,
    frames: 1,
  },
];

export const DEFAULT_AVATAR: Avatar = AVATARS[0]!;
