import { useCallback, useEffect, useReducer } from "react";
import { DEFAULT_AVATAR, type AvatarLook } from "@/game/avatars";
import { LEVELS, getAct, type ChoiceKey } from "@/game/story";
import {
  MAX_STARS,
  TOTAL_ACTS,
  TOTAL_LEVELS,
  countHearts,
  countStars,
  gameReducer,
  initialState,
  isActFinale,
} from "@/game/state";
import { preloadSounds } from "@/game/audio";
import { AudioControls } from "./AudioControls";
import { CrtOverlay } from "./CrtOverlay";
import { Hud } from "./Hud";
import { TitleScreen } from "./screens/TitleScreen";
import { AvatarSelect } from "./screens/AvatarSelect";
import { LivingRoomCinematic } from "./screens/LivingRoomCinematic";
import { ArrivalScreen } from "./screens/ArrivalScreen";
import { ActIntroScreen } from "./screens/ActIntroScreen";
import { LevelScreen } from "./screens/LevelScreen";
import { ClearedScreen } from "./screens/ClearedScreen";
import { GameOverScreen } from "./screens/GameOverScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { PixelButton } from "./PixelButton";

export function Game() {
  const [state, dispatch] = useReducer(gameReducer, undefined, initialState);
  const avatar = state.avatar ?? DEFAULT_AVATAR;
  const level = LEVELS[state.levelIndex] ?? LEVELS[0]!;
  const act = getAct(level.act);

  const start = useCallback(() => {
    preloadSounds();
    dispatch({ type: "START" });
  }, []);
  const selectAvatar = useCallback(
    (look: AvatarLook, name: string) => dispatch({ type: "SELECT_AVATAR", look, name }),
    [],
  );
  const cinematicDone = useCallback(() => dispatch({ type: "CINEMATIC_DONE" }), []);
  const arrivalDone = useCallback(() => dispatch({ type: "ARRIVAL_DONE" }), []);
  const beginAct = useCallback(() => dispatch({ type: "BEGIN_ACT" }), []);
  const choose = useCallback((choice: ChoiceKey) => dispatch({ type: "CHOOSE", choice }), []);
  const retry = useCallback(() => dispatch({ type: "RETRY" }), []);
  const next = useCallback(() => dispatch({ type: "CONTINUE" }), []);
  const leaveHome = useCallback(() => dispatch({ type: "LEAVE_HOME" }), []);
  const stopAtHome = useCallback(() => dispatch({ type: "STOP_AT_HOME" }), []);
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [state.screen, state.levelIndex]);

  const inTimeline =
    state.screen === "actIntro" ||
    state.screen === "level" ||
    state.screen === "cleared" ||
    state.screen === "gameover";

  return (
    <main className="relative min-h-screen">
      {state.screen === "title" && <TitleScreen onStart={start} />}
      {state.screen !== "title" && (
        <PixelButton
          variant="night"
          size="sm"
          className="fixed top-3 left-3 z-[100] shadow-lg"
          onClick={reset}
          aria-label="Back to home screen and reset the current game"
          title="Return to title screen and reset this run"
        >
          ◀ BACK TO HOME
        </PixelButton>
      )}
      {state.screen === "select" && <AvatarSelect onConfirm={selectAvatar} />}
      {state.screen === "cinematic" && <LivingRoomCinematic avatar={avatar} onDone={cinematicDone} />}
      {state.screen === "arrival" && <ArrivalScreen avatar={avatar} onDone={arrivalDone} />}

      {inTimeline && (
        <div className="relative isolate min-h-screen">
          <img
            key={level.background + (level.tint ?? "")}
            src={level.background}
            alt=""
            aria-hidden
            className="animate-pop-in fixed inset-0 -z-10 h-full w-full object-cover"
            style={level.tint ? { filter: level.tint } : undefined}
          />
          <div
            className="fixed inset-0 -z-10 bg-gradient-to-b from-lavender-night/40 via-lavender-night/30 to-lavender-night/80"
            aria-hidden
          />
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-3 pt-4 pb-28 sm:px-6">
            <Hud
              avatar={avatar}
              hearts={countHearts(state)}
              totalHearts={TOTAL_ACTS}
              stars={countStars(state)}
              maxStars={MAX_STARS}
              levelLabel={
                state.screen === "actIntro"
                  ? `ACT ${act.numeral} · ${act.era}`
                  : `ACT ${act.numeral} · LV ${level.id} · ${level.stage}`
              }
            />
            {state.screen === "actIntro" && <ActIntroScreen key={act.number} act={act} onBegin={beginAct} />}
            {state.screen === "level" && (
              <LevelScreen key={`${level.id}-${state.retries}`} level={level} avatar={avatar} onChoose={choose} />
            )}
            {state.screen === "cleared" && (
              <ClearedScreen
                key={level.id}
                level={level}
                actFinale={isActFinale(state.levelIndex)}
                isFinal={state.levelIndex === TOTAL_LEVELS - 1}
                onNext={next}
              />
            )}
            {state.screen === "gameover" && state.lastChoice && (
              <GameOverScreen
                key={`${level.id}-${state.retries}`}
                level={level}
                choiceKey={state.lastChoice}
                retries={state.retries}
                onRetry={retry}
              />
            )}
          </div>
        </div>
      )}

      {(state.screen === "home" || state.screen === "summary" || state.screen === "victory") && (
        <HomeScreen
          key={`home-${act.number}`}
          avatar={avatar}
          clearedAct={act}
          victory={state.screen === "victory"}
          ending={state.screen === "summary"}
          stars={countStars(state)}
          retries={state.retries}
          onLeave={leaveHome}
          onStop={stopAtHome}
          onReplay={reset}
        />
      )}

      {state.screen !== "title" && <AudioControls />}
      <CrtOverlay />
    </main>
  );
}
