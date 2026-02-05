import { usePomodoroStore } from "../../store/usePomodoroStore";

function formatMMSS(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function accentClasses(type: string) {
  if (type === "work") {
    return "bg-indigo-500/30 text-white ring-indigo-400/50";
  }
  if (type === "short_break") {
    return "bg-emerald-500/30 text-white ring-emerald-400/50";
  }
  return "bg-rose-500/30 text-white ring-rose-400/50";
}

export function TimerScreen() {
  const secondsLeft = usePomodoroStore((s) => s.secondsLeft);
  const sessionType = usePomodoroStore((s) => s.sessionType);
  const workDone = usePomodoroStore((s) => s.workSessionsCompleted);
  const every = usePomodoroStore((s) => s.settings.sessionsBeforeLongBreak);
  const status = usePomodoroStore((s) => s.status);
  const settings = usePomodoroStore((s) => s.settings);

  const sessionIndex = Math.min((workDone % every) + 1, every);

  const sessionLabel = settings.jobName || (
    sessionType === "work"
      ? "Work"
      : sessionType === "short_break"
      ? "Short Break"
      : "Long Break"
  );

  return (
    <section
      className="grid place-items-center gap-6 py-8"
      aria-label="Pomodoro timer"
    >
      {/* session pills */}
      <div className="flex items-center gap-3">
        <span
          className={[
            "inline-flex items-center rounded-full px-4 py-2 text-sm font-bold",
            "ring-2 ring-white/30",
            "backdrop-blur-md",
            "transition-all duration-300",
            accentClasses(sessionType),
          ].join(" ")}
        >
          {sessionLabel}
        </span>

        <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white ring-2 ring-white/30 backdrop-blur-md">
          Session {sessionIndex}/{every}
        </span>
      </div>

      {/* time - with pulse animation when running */}
      <div
        className={[
          "tabular-nums text-8xl font-black tracking-tighter text-white leading-none",
          "drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
          status === "running" ? "animate-pulse-subtle" : "",
        ].join(" ")}
        style={{
          animation: status === "running" ? "pulse-subtle 2s ease-in-out infinite" : "none",
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {formatMMSS(secondsLeft)}
      </div>

      {/* hint */}
      <div className="h-6 text-sm text-white/80 font-medium">
        {status === "idle" && (
          <>
            Press{" "}
            <span className="font-bold text-white">Start</span> to begin.
          </>
        )}
        {status === "running" && (
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
            Timer running...
          </span>
        )}
        {status === "paused" && (
          <span className="text-yellow-300">
            Timer paused
          </span>
        )}
      </div>
    </section>
  );
}
