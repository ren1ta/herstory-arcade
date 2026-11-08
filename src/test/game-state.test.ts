import { describe, expect, it } from "vitest";
import { AVATARS } from "@/game/avatars";
import { LEVELS, type ChoiceKey } from "@/game/story";
import {
  MAX_STARS,
  countHearts,
  countStars,
  gameReducer,
  initialState,
  type GameState,
} from "@/game/state";

function boldKey(i: number): ChoiceKey {
  return LEVELS[i]!.choices.find((c) => c.bold)!.key;
}
function wrongKey(i: number): ChoiceKey {
  return LEVELS[i]!.choices.find((c) => !c.bold)!.key;
}

function toFirstLevel(): GameState {
  let s = initialState();
  s = gameReducer(s, { type: "START" });
  s = gameReducer(s, { type: "SELECT_AVATAR", avatar: AVATARS[0]! });
  s = gameReducer(s, { type: "CINEMATIC_DONE" });
  expect(s.screen).toBe("arrival");
  s = gameReducer(s, { type: "ARRIVAL_DONE" });
  return gameReducer(s, { type: "BEGIN_ACT" });
}

describe("game rules", () => {
  it("has 3 stories of 4 life-stage levels = 12 levels/stars", () => {
    expect(LEVELS).toHaveLength(12);
    expect(MAX_STARS).toBe(12);
    for (const act of [1, 2, 3]) {
      expect(LEVELS.filter((l) => l.act === act).map((l) => l.stage)).toEqual([
        "CHILDHOOD",
        "YOUTH",
        "ADULTHOOD",
        "MATURITY",
      ]);
    }
  });

  it("every level has exactly one bold choice and one wrong choice", () => {
    for (const l of LEVELS) {
      expect(l.choices.filter((c) => c.bold)).toHaveLength(1);
      expect(l.choices.filter((c) => !c.bold)).toHaveLength(1);
      expect(l.background).toBeTruthy();
      expect(l.npc.name).toBeTruthy();
      expect(l.npc.sprite).toBeTruthy();
      expect(l.npc.lines.length).toBeGreaterThan(0);
      expect(l.npc.response).toBeTruthy();
    }
    expect(new Set(LEVELS.map((l) => l.background)).size).toBe(LEVELS.length);
  });

  it("uses the requested year for the 1985 media level", () => {
    expect(LEVELS.find((level) => level.id === "2.1")?.year).toBe("1985");
  });

  it("a wrong choice triggers GAME OVER and RETRY replays the same level", () => {
    let s = toFirstLevel();
    s = gameReducer(s, { type: "CHOOSE", choice: wrongKey(0) });
    expect(s.screen).toBe("gameover");
    expect(countStars(s)).toBe(0);
    s = gameReducer(s, { type: "RETRY" });
    expect(s.screen).toBe("level");
    expect(s.levelIndex).toBe(0);
    expect(s.retries).toBe(1);
  });

  it("clearing an act's 4 levels returns home, then the portal opens the next act", () => {
    let s = toFirstLevel();
    for (let i = 0; i < 4; i++) {
      s = gameReducer(s, { type: "CHOOSE", choice: boldKey(i) });
      expect(s.screen).toBe("cleared");
      s = gameReducer(s, { type: "CONTINUE" });
    }
    expect(s.screen).toBe("home");
    expect(countHearts(s)).toBe(1);
    s = gameReducer(s, { type: "LEAVE_HOME" });
    expect(s.screen).toBe("actIntro");
    expect(LEVELS[s.levelIndex]!.id).toBe("2.1");
  });

  it("stopping at an act intermission opens the journey summary", () => {
    let s = toFirstLevel();
    for (let i = 0; i < 4; i++) {
      s = gameReducer(s, { type: "CHOOSE", choice: boldKey(i) });
      s = gameReducer(s, { type: "CONTINUE" });
    }
    expect(s.screen).toBe("home");
    s = gameReducer(s, { type: "STOP_AT_HOME" });
    expect(s.screen).toBe("summary");
    expect(countStars(s)).toBe(4);
  });

  it("clearing all 12 levels reaches victory with 12 stars and 3 hearts", () => {
    let s = toFirstLevel();
    for (let i = 0; i < 12; i++) {
      if (s.screen === "actIntro") s = gameReducer(s, { type: "BEGIN_ACT" });
      s = gameReducer(s, { type: "CHOOSE", choice: boldKey(i) });
      s = gameReducer(s, { type: "CONTINUE" });
      if (s.screen === "home") s = gameReducer(s, { type: "LEAVE_HOME" });
    }
    expect(s.screen).toBe("victory");
    expect(countStars(s)).toBe(12);
    expect(countHearts(s)).toBe(3);
  });
});
