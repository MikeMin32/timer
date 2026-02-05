import * as React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={[
        // Modern glassmorphism with elevated shadow
        "rounded-3xl border border-white/20 bg-white/10",
        "backdrop-blur-2xl backdrop-saturate-150",
        // Premium shadow system
        "shadow-[0_8px_32px_0_rgba(31,38,135,0.25)]",
        // Subtle inner glow
        "before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-50 before:pointer-events-none before:z-[-1]",
        // Focus state
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
        "relative overflow-hidden z-10",
        className,
      ].join(" ")}
      tabIndex={0}
      {...props}
    />
  );
}

export function CardHeader({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={["space-y-2 mb-6", className].join(" ")} {...props} />;
}

export function CardTitle({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={[
        "text-2xl font-bold tracking-tight text-white drop-shadow-lg",
        className,
      ].join(" ")}
      {...props}
    />
  );
}

export function CardDescription({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={[
        "text-sm text-white/70 leading-relaxed",
        className,
      ].join(" ")}
      {...props}
    />
  );
}

export function CardContent({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={["relative z-10", className].join(" ")} {...props} />;
}
