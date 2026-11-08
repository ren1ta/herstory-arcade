import { createFileRoute } from "@tanstack/react-router";
import { Game } from "@/components/game/Game";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Walk A Mile In Her Shoes — 8-Bit Equality" },
      {
        name: "description",
        content:
          "A retro pixel story game: three timelines, four life stages each, one bold choice at a time.",
      },
      { property: "og:title", content: "Walk A Mile In Her Shoes — 8-Bit Equality" },
      {
        property: "og:description",
        content:
          "Pick a pixel hero, get pulled into the TV and break the simulation from the 1950s to 2026.",
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
