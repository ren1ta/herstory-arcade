import { createFileRoute } from "@tanstack/react-router";
import { Game } from "@/components/game/Game";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Walk A Mile In Her Shoes — Retro Feminism Arcade" },
      {
        name: "description",
        content:
          "Play an 8-bit story game through the four waves of feminism, from suffrage to digital activism.",
      },
      { property: "og:title", content: "Walk A Mile In Her Shoes — Retro Arcade" },
      {
        property: "og:description",
        content:
          "Pick a pixel hero, get pulled into the TV and make choices across 130 years of history.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Game />;
}
