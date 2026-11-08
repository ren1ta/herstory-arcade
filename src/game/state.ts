import type { AvatarId } from "./avatars";
import { LEVELS, type ChoiceKey } from "./levels";

export type Screen = "title" | "select" | "cinematic" | "level" | "outcome" | "victory";

export interface GameState {
  screen: Screen;
  avatarId: AvatarId | null;
  levelIndex: number;
  /** Paths explored per level index. Each new path earns one star. */
  explored: ChoiceKey[][];
  lastChoice: ChoiceKey | null;
  /** True when the last choice explored a path for the first time (earned a star). */
  lastWasNew: boolean;
}

export type GameAction =
  | { type: "START" }
  | { type: "SELECT_AVATAR"; avatarId: AvatarId }
  | { type: "CINEMATIC_DONE" }
  | { type: "CHOOSE"; choice: ChoiceKey }
  | { type: "TRY_ANOTHER" }
  | { type: "NEXT_LEVEL" }
  | { type: "RESET" };

export const TOTAL_LEVELS = LEVELS.length;
export const STARS_PER_LEVEL = 3;
export const MAX_STARS = TOTAL_LEVELS * STARS_PER_LEVEL;

export function initialState(): GameState {
  return {
    screen: "title",
    avatarId: null,
    levelIndex: 0,
    explored: LEVELS.map(() => []),
    lastChoice: null,
    lastWasNew: false,
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START":
      return { ...state, screen: "select" };
    case "SELECT_AVATAR":
      return { ...state, avatarId: action.avatarId, screen: "cinematic" };
    case "CINEMATIC_DONE":
      return { ...state, screen: "level", levelIndex: 0 };
    case "CHOOSE": {
      if (state.screen !== "level") return state;
      const current = state.explored[state.levelIndex];
      const isNew = !current.includes(action.choice);
      const explored = !isNew
        ? state.explored
        : state.explored.map((list, i) =>
            i === state.levelIndex ? [...list, action.choice] : list,
          );
      return {
        ...state,
        explored,
        lastChoice: action.choice,
        lastWasNew: isNew,
        screen: "outcome",
      };
    }
    case "TRY_ANOTHER":
      return { ...state, screen: "level" };
    case "NEXT_LEVEL": {
      if (state.screen !== "outcome") return state;
      if (state.levelIndex >= TOTAL_LEVELS - 1) {
        return { ...state, screen: "victory", lastChoice: null };
      }
      return { ...state, levelIndex: state.levelIndex + 1, screen: "level", lastChoice: null };
    }
    case "RESET":
      return initialState();
    default:
      return state;
  }
}

export function countStars(state: GameState): number {
  return state.explored.reduce((sum, list) => sum + list.length, 0);
}

/** Hearts = waves cleared. A wave counts as cleared once any path in it is explored. */
export function countHearts(state: GameState): number {
  if (state.screen === "victory") return TOTAL_LEVELS;
  return state.explored.filter((list) => list.length > 0).length;
}

export function getRank(stars: number): string {
  if (stars >= MAX_STARS) return "LEGEND OF EQUALITY";
  if (stars >= 8) return "MOVEMENT BUILDER";
  if (stars >= 5) return "BRAVE ORGANISER";
  return "RISING ACTIVIST";
}
