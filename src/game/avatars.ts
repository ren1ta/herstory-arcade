import scarletAsset from "@/assets/avatar-scarlet.png.asset.json";
import novaAsset from "@/assets/avatar-nova.png.asset.json";
import miraAsset from "@/assets/avatar-mira.png.asset.json";
import ivyAsset from "@/assets/avatar-ivy.png.asset.json";

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

/** Renita's own pixel avatars. */
export const AVATARS: Avatar[] = [
  {
    id: "scarlet",
    name: "SCARLET",
    title: "The Red-Haired Rebel",
    tagline: "Fearless explorer of forgotten history.",
    src: scarletAsset.url,
    width: 165,
    height: 230,
    frames: 1,
  },
  {
    id: "nova",
    name: "NOVA",
    title: "Cyber Heroine",
    tagline: "Hacks the system. Rewrites the code.",
    src: novaAsset.url,
    width: 200,
    height: 230,
    frames: 1,
  },
  {
    id: "mira",
    name: "MIRA",
    title: "Classic Pixel Hero",
    tagline: "Asks the questions nobody else will.",
    src: miraAsset.url,
    width: 399,
    height: 634,
    frames: 1,
  },
  {
    id: "ivy",
    name: "IVY",
    title: "The Eco Guardian",
    tagline: "Grows change from the roots up.",
    src: ivyAsset.url,
    width: 180,
    height: 230,
    frames: 1,
  },
];

export const DEFAULT_AVATAR: Avatar = AVATARS[0]!;
