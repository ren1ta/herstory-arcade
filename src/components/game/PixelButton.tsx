import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { playSound } from "@/game/audio";

const pixelButtonVariants = cva(
  "pixel-frame font-pixel relative inline-flex select-none items-center justify-center gap-2 uppercase transition-transform duration-75 active:translate-x-[2px] active:translate-y-[3px] active:shadow-none disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neon-cyan",
  {
    variants: {
      variant: {
        pink: "bg-neon-pink text-cream pixel-text-shadow hover:brightness-110",
        cyan: "bg-neon-cyan text-ink hover:brightness-110",
        gold: "bg-neon-gold text-ink hover:brightness-110",
        cream: "bg-cream text-ink hover:bg-pastel-pink",
        night: "bg-lavender-deep text-cream hover:bg-lavender hover:text-ink",
      },
      size: {
        sm: "px-3 py-2 text-[9px]",
        md: "px-5 py-3 text-[10px] sm:text-xs",
        lg: "px-7 py-4 text-xs sm:text-sm",
      },
    },
    defaultVariants: { variant: "pink", size: "md" },
  },
);

export interface PixelButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pixelButtonVariants> {
  silent?: boolean;
}

export const PixelButton = forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant, size, silent, onClick, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(pixelButtonVariants({ variant, size }), className)}
      onClick={(e) => {
        if (!silent) playSound("click");
        onClick?.(e);
      }}
      {...props}
    />
  ),
);
PixelButton.displayName = "PixelButton";
