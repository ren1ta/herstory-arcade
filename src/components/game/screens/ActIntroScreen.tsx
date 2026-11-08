import { LEVELS, type Act } from "@/game/story";
import { useHotkeys } from "@/game/useHotkeys";
import { PixelButton } from "../PixelButton";
import { PixelWindow } from "../PixelWindow";

export function ActIntroScreen({ act, onBegin }: { act: Act; onBegin: () => void }) {
  useHotkeys((key) => key === "enter" && onBegin());
  const levels = LEVELS.filter((l) => l.act === act.number);

  return (
    <PixelWindow title={`ACT_${act.numeral}.EXE`} className="animate-pop-in mx-auto w-full max-w-4xl">
      <p className="font-pixel text-center text-xs text-lavender-deep">ACT {act.numeral}</p>
      <h1 className="font-pixel mt-3 text-center text-lg glow-pink sm:text-2xl">{act.title}</h1>
      <p className="font-pixel mt-3 text-center text-[10px] text-lavender-deep">{act.era}</p>
      <p className="font-terminal mt-4 text-center text-2xl sm:text-3xl">{act.tagline}</p>
      <ol className="mt-6 grid gap-3 sm:grid-cols-4">
        {levels.map((l) => (
          <li key={l.id} className="border-l-8 border-neon-pink bg-pastel-pink/60 px-3 py-2">
            <p className="font-pixel text-[8px] text-lavender-deep">LV {l.id} · {l.stage}</p>
            <p className="font-terminal text-xl leading-tight">
              Age {l.age} · {l.year}
              <br />
              {l.place}
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-7 flex justify-center">
        <PixelButton size="lg" variant="gold" onClick={onBegin} autoFocus>
          START ACT {act.numeral} ▶
        </PixelButton>
      </div>
    </PixelWindow>
  );
}
