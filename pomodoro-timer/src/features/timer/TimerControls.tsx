import { Button } from "../../ui/Button";
import { usePomodoroStore } from "../../store/usePomodoroStore";

export function TimerControls() {
  const status = usePomodoroStore((s) => s.status);
  const start = usePomodoroStore((s) => s.start);
  const pause = usePomodoroStore((s) => s.pause);
  const resume = usePomodoroStore((s) => s.resume);
  const reset = usePomodoroStore((s) => s.reset);

  const primaryLabel =
    status === "running" ? "Pause" : status === "paused" ? "Resume" : "Start";

  const onPrimary =
    status === "running" ? pause : status === "paused" ? resume : start;

  return (
    <div className="grid grid-cols-2 gap-2">
      <Button onClick={onPrimary}>{primaryLabel}</Button>
      <Button variant="ghost" onClick={reset} aria-label="Reset timer">
        Reset
      </Button>
    </div>
  );
}
