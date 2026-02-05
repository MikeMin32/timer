import type { PomodoroSettings, SessionType } from "./types";

export function getNextSession(
  current: SessionType,
  completedSessions: number,
  settings: PomodoroSettings
): SessionType {
  if (current === "work") {
    if ((completedSessions + 1) % settings.sessionsBeforeLongBreak === 0) {
      return "long_break";
    }
    return "short_break";
  }
  return "work";
}

export function getSessionDuration(
  session: SessionType,
  settings: PomodoroSettings
): number {
  switch (session) {
    case "work":
      return settings.workDuration;
    case "short_break":
      return settings.shortBreakDuration;
    case "long_break":
      return settings.longBreakDuration;
    default:
      return settings.workDuration;
  }
}
