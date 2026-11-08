import { useCallback, useEffect, useReducer } from "react";
import { getAvatar, type AvatarId } from "@/game/avatars";
import { LEVELS, type ChoiceKey } from "@/game/levels";
import {
  MAX_STARS,
  STARS_PER_LEVEL,
  TOTAL_LEVELS,
  countHearts,
  countStars,
  gameReducer,
  initialState,
} from "@/game/state";
import { preloadSounds } from "@/game/audio";
import { AudioControls } from "./AudioControls";
import { CrtOverlay } from "./CrtOverlay";
import { Hud } from "./Hud";
import { TitleScreen } from "./screens/TitleScreen";
import { AvatarSelect } from "./screens/AvatarSelect";
import { LivingRoomCinematic } from "./screens/LivingRoomCinematic";
import { LevelScreen } from "./screens/LevelScreen";
import { OutcomeScreen } from "./screens/OutcomeScreen";
import { VictoryScreen } from "./screens/VictoryScreen";

export function Game() {
  const [state, dispatch] = useReducer(gameReducer, undefined, initialState);
  const avatar = getAvatar(state.avatarId);
  const level = LEVELS[state.levelIndex];
  const stars = countStars(state);

  const start = useCallback(() => {
    preloadSounds();
    dispatch({ type: "START" });
  }, []);
  const selectAvatar = useCallback(
    (avatarId: AvatarId) => dispatch({ type: "SELECT_AVATAR", avatarId }),
    [],
  );
  const cinematicDone = useCallback(() => dispatch({ type: "CINEMATIC_DONE" }), []);
  const choose = useCallback((choice: ChoiceKey) => dispatch({ type: "CHOOSE", choice }), []);
  const next = useCallback(() => dispatch({ type: "NEXT_LEVEL" }), []);
  const tryAnother = useCallback(() => dispatch({ type: "TRY_ANOTHER" }), []);
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [state.screen, state.levelIndex]);

  const inLevel = state.screen === "level" || state.screen === "outcome";

  return (
    <main className="relative min-h-screen">
      {state.screen === "title" && <TitleScreen onStart={start} />}
      {state.screen === "select" && <AvatarSelect onConfirm={selectAvatar} />}
      {state.screen === "cinematic" && (
        <LivingRoomCinematic avatar={avatar} onDone={cinematicDone} />
      )}

      {inLevel && (
        <div className="relative min-h-screen">
          <img
            key={level.background}
            src={level.background}
            alt=""
            aria-hidden
            className="animate-pop-in fixed inset-0 -z-10 h-full w-full object-cover"
          />
          <div
            className="fixed inset-0 -z-10 bg-gradient-to-b from-lavender-night/40 via-lavender-night/30 to-lavender-night/80"
            aria-hidden
          />
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-3 pt-4 pb-28 sm:px-6">
            <Hud
              avatar={avatar}
              hearts={countHearts(state)}
              totalHearts={TOTAL_LEVELS}
              stars={stars}
              maxStars={MAX_STARS}
              levelLabel={`LV ${level.number} · ${level.era}`}
            />
            {state.screen === "level" && (
              <LevelScreen
                key={level.number}
                level={level}
                avatar={avatar}
                explored={state.explored[state.levelIndex]}
                onChoose={choose}
              />
            )}
            {state.screen === "outcome" && state.lastChoice && (
              <OutcomeScreen
                key={`${level.number}-${state.lastChoice}`}
                level={level}
                choiceKey={state.lastChoice}
                earnedStar={state.lastWasNew}
                remaining={STARS_PER_LEVEL - state.explored[state.levelIndex].length}
                isFinal={state.levelIndex === TOTAL_LEVELS - 1}
                onTryAnother={tryAnother}
                onNext={next}
              />
            )}
          </div>
        </div>
      )}

      {state.screen === "victory" && (
        <VictoryScreen avatar={avatar} stars={stars} explored={state.explored} onReplay={reset} />
      )}

      <AudioControls />
      <CrtOverlay />
    </main>
  );
}
