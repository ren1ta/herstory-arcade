import avatarRed from "@/assets/avatar-red.png";
import avatarCyber from "@/assets/avatar-cyber.png";
import avatarClassic from "@/assets/avatar-classic.png";

export type AvatarId = "red" | "cyber" | "classic";

export interface Avatar {
  id: AvatarId;
  name: string;
  title: string;
  tagline: string;
  src: string;
  width: number;
  height: number;
}

export const AVATARS: Avatar[] = [
  {
    id: "red",
    name: "SCARLET",
    title: "The Adventurer",
    tagline: "Fearless explorer of forgotten history.",
    src: avatarRed,
    width: 320,
    height: 808,
  },
  {
    id: "cyber",
    name: "NOVA",
    title: "Cyber Heroine",
    tagline: "Hacks the system. Rewrites the code.",
    src: avatarCyber,
    width: 307,
    height: 876,
  },
  {
    id: "classic",
    name: "MIRA",
    title: "Classic Pixel Hero",
    tagline: "Asks the questions nobody else will.",
    src: avatarClassic,
    width: 251,
    height: 781,
  },
];

export function getAvatar(id: AvatarId | null): Avatar {
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0];
}
