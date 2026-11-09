import { nameAvatar, type Avatar, type AvatarLook } from "./avatars";
import { ACTS, LEVELS, LEVELS_PER_ACT, type ChoiceKey } from "./story";

export type Screen =
  | "title"
  | "select"
  | "cinematic"
  | "arrival"
  | "actIntro"
  | "level"
  | "cleared"
  | "gameover"
  | "home"
  | "summary"
  | "victory";

export interface GameState {
  screen: Screen;
  avatar: Avatar | null;
  /** Index into LEVELS (0..11). */
  levelIndex: number;
  /** Number of levels cleared so far (each clear = one star). */
  cleared: number;
  lastChoice: ChoiceKey | null;
  /** How many times the player hit GAME OVER and retried. */
  retries: number;
}

export type GameAction =
  | { type: "START" }
  | { type: "SELECT_AVATAR"; look: AvatarLook; name: string }
  | { type: "CINEMATIC_DONE" }
  | { type: "ARRIVAL_DONE" }
  | { type: "BEGIN_ACT" }
  | { type: "CHOOSE"; choice: ChoiceKey }
  | { type: "RETRY" }
  | { type: "CONTINUE" }
  | { type: "LEAVE_HOME" }
  | { type: "STOP_AT_HOME" }
  | { type: "RESET" };

export const TOTAL_LEVELS = LEVELS.length;
export const TOTAL_ACTS = ACTS.length;
export const MAX_STARS = TOTAL_LEVELS;

export function initialState(): GameState {
  return {
    screen: "title",
    avatar: null,
    levelIndex: 0,
    cleared: 0,
    lastChoice: null,
    retries: 0,
  };
}

export function isActFinale(levelIndex: number): boolean {
  return (levelIndex + 1) % LEVELS_PER_ACT === 0;
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START":
      return state.screen === "title" ? { ...state, screen: "select" } : state;
    case "SELECT_AVATAR":
      return state.screen === "select"
        ? { ...state, avatar: nameAvatar(action.look, action.name), screen: "cinematic" }
        : state;
    case "CINEMATIC_DONE":
      return state.screen === "cinematic" ? { ...state, screen: "arrival", levelIndex: 0 } : state;
    case "ARRIVAL_DONE":
      return state.screen === "arrival" ? { ...state, screen: "actIntro" } : state;
    case "BEGIN_ACT":
      return state.screen === "actIntro" ? { ...state, screen: "level" } : state;
    case "CHOOSE": {
      if (state.screen !== "level") return state;
      const level = LEVELS[state.levelIndex];
      const choice = level?.choices.find((c) => c.key === action.choice);
      if (!choice) return state;
      if (!choice.bold) {
        return { ...state, screen: "gameover", lastChoice: choice.key, retries: state.retries + 1 };
      }
      return {
        ...state,
        screen: "cleared",
        lastChoice: choice.key,
        cleared: Math.max(state.cleared, state.levelIndex + 1),
      };
    }
    case "RETRY":
      return state.screen === "gameover" ? { ...state, screen: "level", lastChoice: null } : state;
    case "CONTINUE": {
      if (state.screen !== "cleared") return state;
      if (state.levelIndex >= TOTAL_LEVELS - 1) return { ...state, screen: "victory" };
      if (isActFinale(state.levelIndex)) return { ...state, screen: "home" };
      return { ...state, screen: "level", levelIndex: state.levelIndex + 1, lastChoice: null };
    }
    case "LEAVE_HOME":
      return state.screen === "home"
        ? { ...state, screen: "actIntro", levelIndex: state.levelIndex + 1, lastChoice: null }
        : state;
    case "STOP_AT_HOME":
      return state.screen === "home" ? { ...state, screen: "summary" } : state;
    case "RESET":
      return initialState();
    default:
      return state;
  }
}

/** Stars = levels cleared. */
export function countStars(state: GameState): number {
  return state.cleared;
}

/** Hearts = acts (stories) fully cleared. */
export function countHearts(state: GameState): number {
  return Math.floor(state.cleared / LEVELS_PER_ACT);
}

export function getRank(retries: number): string {
  if (retries === 0) return "LEGEND OF EQUALITY";
  if (retries <= 3) return "MOVEMENT BUILDER";
  if (retries <= 8) return "BRAVE ORGANISER";
  return "UNSTOPPABLE REBEL";
}
