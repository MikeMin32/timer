import { create } from "zustand";
import type { PomodoroSettings } from "../domain/pomodoro/types";
import { DEFAULT_SETTINGS } from "../shared/constants";
import { save, load } from "../shared/storage/localStorageAdapter";

export type SessionType = "work" | "short_break" | "long_break";
export type TimerStatus = "idle" | "running" | "paused";

const initialSettings = load("pomodoro_settings", DEFAULT_SETTINGS);

let timer: any = null;

function getSessionDurationSeconds(type: SessionType, s: PomodoroSettings): number {
  if (type === "work") return s.workDuration;
  if (type === "short_break") return s.shortBreakDuration;
  return s.longBreakDuration;
}

type State = {
  status: TimerStatus;
  sessionType: SessionType;
  workSessionsCompleted: number;

  // countdown
  secondsLeft: number;

  // “anti-drift”
  endAtMs: number | null;

  settings: PomodoroSettings;
  showSettings: boolean;

  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  tick: (nowMs: number) => void;
  nextSession: () => void;
  updateSettings: (patch: Partial<PomodoroSettings>) => void;
  setShowSettings: (show: boolean) => void;
};

export const usePomodoroStore = create<State>((set, get) => ({
  status: "idle",
  sessionType: "work",
  workSessionsCompleted: 0,

  secondsLeft: getSessionDurationSeconds("work", initialSettings),
  endAtMs: null,

  settings: initialSettings,
  showSettings: false,

  start: () => {
    const { settings, sessionType, secondsLeft, status } = get();
    if (status === "running") return;

    // if idle, ensure secondsLeft matches current session type
    const duration = getSessionDurationSeconds(sessionType, settings);
    const initial = status === "idle" ? duration : secondsLeft;

    const endAtMs = Date.now() + initial * 1000;

    set({
      status: "running",
      secondsLeft: initial,
      endAtMs,
    });
  },

  pause: () => {
    const { status, endAtMs } = get();
    if (status !== "running" || !endAtMs) return;

    const now = Date.now();
    const left = Math.max(0, Math.ceil((endAtMs - now) / 1000));

    set({
      status: "paused",
      secondsLeft: left,
      endAtMs: null,
    });
  },

  resume: () => {
    const { status, secondsLeft } = get();
    if (status !== "paused") return;

    set({
      status: "running",
      endAtMs: Date.now() + secondsLeft * 1000,
    });
  },

  reset: () => {
    const { settings, sessionType } = get();
    set({
      status: "idle",
      endAtMs: null,
      secondsLeft: getSessionDurationSeconds(sessionType, settings),
    });
  },

  tick: (nowMs: number) => {
    const { status, endAtMs } = get();
    if (status !== "running" || !endAtMs) return;

    const left = Math.max(0, Math.ceil((endAtMs - nowMs) / 1000));

    if (left <= 0) {
      // session ended → move to next session
      set({ secondsLeft: 0, status: "idle", endAtMs: null });
      get().nextSession();
      return;
    }

    set({ secondsLeft: left });
  },

  nextSession: () => {
    const { sessionType, workSessionsCompleted, settings } = get();

    // beep
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 880;
      g.gain.value = 0.04;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      setTimeout(() => {
        o.stop();
        ctx.close();
      }, 180);
    } catch {}

    if (sessionType === "work") {
      const nextWorkCount = workSessionsCompleted + 1;
      const goLong = nextWorkCount % settings.sessionsBeforeLongBreak === 0;
      const nextType: SessionType = goLong ? "long_break" : "short_break";

      set({
        workSessionsCompleted: nextWorkCount,
        sessionType: nextType,
        secondsLeft: getSessionDurationSeconds(nextType, settings),
        status: "idle",
        endAtMs: null,
      });
      return;
    }

    // from breaks → work
    set({
      sessionType: "work",
      secondsLeft: getSessionDurationSeconds("work", settings),
      status: "idle",
      endAtMs: null,
    });
  },

  updateSettings: (patch) => {
    const cur = get().settings;
    const next = { ...cur, ...patch };
    const { sessionType, status } = get();

    set({ settings: next });
    save("pomodoro_settings", next);

    if (status !== "running") {
      set({
        secondsLeft: getSessionDurationSeconds(sessionType, next),
        endAtMs: null,
      });
    }
  },

  setShowSettings: (show) => set({ showSettings: show }),
}));
