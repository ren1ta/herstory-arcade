import type { CSSProperties, ReactNode } from "react";
import livingRoom from "@/assets/living-room.jpg";
import { cn } from "@/lib/utils";

/**
 * Key spots in the living-room picture, as % of the 16:9 scene.
 * `left` is the actor's horizontal centre, `bottom` their feet.
 */
export const ROOM = {
  door: { left: "13.5%", bottom: "40%", height: "19%" },
  floor: { left: "50%", bottom: "7%", height: "27%" },
  seat: { left: "67.9%", bottom: "33%", height: "21%" },
  tv: { left: "92.6%", bottom: "55.4%", height: "21%" },
  tvCenter: { x: 92.6, y: 44.6 },
} as const;

/** The couch's seat front + armrest, drawn over the actor so a seated sprite sinks into the cushions. */
const COUCH_FRONT_CLIP = "inset(60.8% 27.6% 14.9% 57.3%)";

interface LivingRoomStageProps {
  tvOn: boolean;
  /** The avatar layer — rendered between the room and the couch front. */
  actor?: ReactNode;
  children?: ReactNode;
  fullscreen?: boolean;
  className?: string;
}

export function actorStyle(pose: { left: string; bottom: string; height: string }, extra?: CSSProperties): CSSProperties {
  return { left: pose.left, bottom: pose.bottom, height: pose.height, ...extra };
}

/** The cosy pixel living room: couch, coffee table, plants and the big CRT TV. */
export function LivingRoomStage({ tvOn, actor, children, fullscreen = true, className }: LivingRoomStageProps) {
  const stage = (
    <div
      className={cn(
        "pixel-frame relative aspect-video w-full overflow-hidden bg-lavender-night",
        fullscreen && "max-w-[min(100%,calc((100vh-3rem)*16/9))]",
        className,
      )}
    >
      <img
        src={livingRoom}
        alt="A cosy pixel-art living room with a pink couch, coffee table, plants and a big old TV"
        width={1536}
        height={864}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* TV screen */}
      <div
        className={cn(
          "absolute transition-opacity duration-150",
          tvOn ? "tv-static opacity-90" : "opacity-0",
        )}
        style={{ left: "88.2%", top: "36.5%", width: "8.6%", height: "17%" }}
        aria-hidden
      />
      {tvOn && (
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            left: `${ROOM.tvCenter.x}%`,
            top: `${ROOM.tvCenter.y}%`,
            width: "30%",
            aspectRatio: "1",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--neon-cyan) 35%, transparent), transparent 65%)",
          }}
          aria-hidden
        />
      )}

      {actor}

      <img
        src={livingRoom}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: COUCH_FRONT_CLIP }}
      />

      {children}
    </div>
  );

  if (!fullscreen) return stage;
  return <div className="flex min-h-screen items-center justify-center bg-ink p-2 sm:p-6">{stage}</div>;
}

/** Neon vortex contained in a circle over the TV screen. */
export function TvVortex({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      className="pointer-events-none absolute overflow-hidden rounded-full"
      style={{
        left: `${ROOM.tvCenter.x}%`,
        top: `${ROOM.tvCenter.y}%`,
        width: "24%",
        aspectRatio: "1",
        transform: "translate(-50%, -50%)",
      }}
      aria-hidden
    >
      <div className={cn("vortex animate-pop-in h-full w-full", reverse && "[animation-direction:reverse]")} />
    </div>
  );
}
