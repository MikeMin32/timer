import * as React from "react";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold " +
  "transition active:translate-y-[1px] select-none " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-slate-900/80 hover:bg-slate-800/90 " +
    "shadow-[0_8px_24px_-8px_rgba(15,23,42,0.6)] " +
    "border border-slate-700/50 backdrop-blur-md",
  secondary:
    "text-white bg-white/20 hover:bg-white/30 " +
    "border border-white/30 backdrop-blur-md " +
    "shadow-[0_4px_16px_-4px_rgba(255,255,255,0.2)]",
  ghost:
  "text-white/90 hover:text-white bg-white/10 hover:bg-white/20 " +
  "border border-white/20 backdrop-blur-md",
  destructive:
    "text-white bg-rose-500/40 hover:bg-rose-500/60 border border-rose-400/40 backdrop-blur-md " +
    "shadow-[0_8px_24px_-8px_rgba(244,63,94,0.4)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const spinnerClass =
      variant === "primary" || variant === "destructive"
        ? "border-white/35 border-t-white/90"
        : "border-black/20 border-t-black/60";

    return (
      <button
        ref={ref}
        className={[base, variants[variant], sizes[size], className].join(" ")}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span
            className={[
              "inline-block h-4 w-4 animate-spin rounded-full border-2",
              spinnerClass,
            ].join(" ")}
            aria-hidden="true"
          />
        )}
        <span>{children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";
