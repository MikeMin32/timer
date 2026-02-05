export type SessionType = "work" | "short_break" | "long_break";

export interface PomodoroSettings {
  workDuration: number; // seconds
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
  jobName: string;
}

export interface PomodoroState {
  sessionType: SessionType;
  timeLeft: number;
  isRunning: boolean;
  completedSessions: number;
}

export type { PomodoroSettings, SessionType };
