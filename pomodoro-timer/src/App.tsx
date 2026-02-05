import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/Card";
import { TimerScreen } from "./features/timer/TimerScreen";
import { TimerControls } from "./features/timer/TimerControls";
import { TimerTicker } from "./features/timer/TimerTicker";
import { SettingsPanel } from "./features/settings/SettingsPanel";
import { usePomodoroStore } from "./store/usePomodoroStore";

export default function App() {
  const showSettings = usePomodoroStore((s) => s.showSettings);
  const setShowSettings = usePomodoroStore((s) => s.setShowSettings);

  return (
    <div className="min-h-screen app-bg grid place-items-center px-4 relative">
      <TimerTicker />
      <Card className="w-full max-w-md p-8">
        <CardHeader>
          <CardTitle>Pomodoro</CardTitle>
          <CardDescription>Minimal. Focused. Customizable.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <TimerScreen />
          <TimerControls />
          <button
            onClick={() => setShowSettings(true)}
            className="mt-6 text-white/90 hover:text-white underline decoration-white/40 hover:decoration-white/80 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg px-2 py-1"
            aria-label="Open settings"
          >
            ⚙️ Settings
          </button>
        </CardContent>
      </Card>
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  );
}
