import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PixelWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  tone?: "cream" | "night";
}

/** Vintage-OS style window with a gradient title bar and stepped pixel border. */
export function PixelWindow({
  title,
  children,
  className,
  bodyClassName,
  tone = "cream",
}: PixelWindowProps) {
  return (
    <section
      className={cn(
        "pixel-frame relative",
        tone === "cream" ? "bg-cream text-ink" : "bg-lavender-night/95 text-cream",
        className,
      )}
    >
      {title && (
        <header className="titlebar flex items-center justify-between gap-3 border-b-4 border-ink px-3 py-2">
          <h2 className="font-pixel truncate text-[10px] text-cream text-pixel-shadow sm:text-xs">
            {title}
          </h2>
          <div className="flex shrink-0 gap-1.5" aria-hidden>
            <span className="h-3 w-3 bg-neon-gold shadow-[0_0_0_2px_var(--ink)]" />
            <span className="h-3 w-3 bg-neon-cyan shadow-[0_0_0_2px_var(--ink)]" />
            <span className="h-3 w-3 bg-pastel-pink shadow-[0_0_0_2px_var(--ink)]" />
          </div>
        </header>
      )}
      <div className={cn("p-4 sm:p-6", tone === "cream" && "pixel-inset", bodyClassName)}>
        {children}
      </div>
    </section>
  );
}
