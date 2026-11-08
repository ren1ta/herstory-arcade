import { describe, expect, it } from "vitest";
import { MAX_STARS, countHearts, countStars, gameReducer, initialState } from "@/game/state";

function toLevel() {
  let s = initialState();
  s = gameReducer(s, { type: "START" });
  s = gameReducer(s, { type: "SELECT_AVATAR", avatarId: "cyber" });
  return gameReducer(s, { type: "CINEMATIC_DONE" });
}

describe("game rules", () => {
  it("has four levels with three choices each = 12 stars", () => {
    expect(MAX_STARS).toBe(12);
  });

  it("awards one star per newly explored path, not for repeats", () => {
    let s = toLevel();
    s = gameReducer(s, { type: "CHOOSE", choice: "A" });
    expect(countStars(s)).toBe(1);
    expect(s.lastWasNew).toBe(true);
    s = gameReducer(s, { type: "TRY_ANOTHER" });
    s = gameReducer(s, { type: "CHOOSE", choice: "A" });
    expect(countStars(s)).toBe(1);
    expect(s.lastWasNew).toBe(false);
  });

  it("fills a heart per wave cleared and reaches victory after level 4", () => {
    let s = toLevel();
    for (let i = 0; i < 4; i++) {
      expect(s.levelIndex).toBe(i);
      s = gameReducer(s, { type: "CHOOSE", choice: "C" });
      expect(countHearts(s)).toBe(i + 1);
      s = gameReducer(s, { type: "NEXT_LEVEL" });
    }
    expect(s.screen).toBe("victory");
    expect(countStars(s)).toBe(4);
  });
});
