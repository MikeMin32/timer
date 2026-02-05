import * as React from "react";
import { usePomodoroStore } from "../../store/usePomodoroStore";

export function TimerTicker() {
  const status = usePomodoroStore((s) => s.status);

  React.useEffect(() => {
    if (status !== "running") return;

    const id = window.setInterval(() => {
      usePomodoroStore.getState().tick(Date.now());
    }, 250);
    return () => window.clearInterval(id);
  }, [status]);

  return null;
}
