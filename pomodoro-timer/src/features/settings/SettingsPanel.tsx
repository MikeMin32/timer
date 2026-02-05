import React, { useState } from "react";
import { usePomodoroStore } from "../../store/usePomodoroStore";
import type { PomodoroSettings } from "../../domain/pomodoro/types";

// Settings panel with improved contrast and color-coded buttons
export const SettingsPanel = ({ onClose }: { onClose: () => void }) => {
  const settings = usePomodoroStore((s) => s.settings);
  const updateSettings = usePomodoroStore((s) => s.updateSettings);
  const [local, setLocal] = useState<PomodoroSettings>(settings);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLocal((prev) => ({
      ...prev,
      [name]: name === "jobName" ? value : Math.max(1, Number(value)),
    }));
  }

  function handleDurationChange(fieldName: keyof PomodoroSettings, minutes: number) {
    setLocal((prev) => ({
      ...prev,
      [fieldName]: Math.max(1, minutes * 60),
    }));
  }

  function handleSave() {
    updateSettings(local);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Settings"
      tabIndex={-1}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      onClick={onClose}
    >
      <div 
        className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col gap-6 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">⚙️ Settings</h2>
        
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-white/90">Job Name</span>
          <input
            type="text"
            name="jobName"
            value={local.jobName}
            onChange={handleChange}
            className="p-3 rounded-xl bg-black/30 text-white border border-white/30 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400/60 placeholder-white/40 transition-all"
            placeholder="Enter job name..."
            aria-label="Job name"
          />
        </label>
        
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-white/90">Work Duration (minutes)</span>
          <input
            type="number"
            name="workDuration"
            min={1}
            value={local.workDuration / 60}
            onChange={(e) => handleDurationChange("workDuration", Number(e.target.value))}
            className="p-3 rounded-xl bg-black/30 text-white border border-white/30 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400/60 transition-all"
            aria-label="Work duration"
          />
        </label>
        
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-white/90">Short Break (minutes)</span>
          <input
            type="number"
            name="shortBreakDuration"
            min={1}
            value={local.shortBreakDuration / 60}
            onChange={(e) => handleDurationChange("shortBreakDuration", Number(e.target.value))}
            className="p-3 rounded-xl bg-black/30 text-white border border-white/30 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400/60 transition-all"
            aria-label="Short break duration"
          />
        </label>
        
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-white/90">Long Break (minutes)</span>
          <input
            type="number"
            name="longBreakDuration"
            min={1}
            value={local.longBreakDuration / 60}
            onChange={(e) => handleDurationChange("longBreakDuration", Number(e.target.value))}
            className="p-3 rounded-xl bg-black/30 text-white border border-white/30 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400/60 transition-all"
            aria-label="Long break duration"
          />
        </label>
        
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-white/90">Sessions Before Long Break</span>
          <input
            type="number"
            name="sessionsBeforeLongBreak"
            min={1}
            value={local.sessionsBeforeLongBreak}
            onChange={handleChange}
            className="p-3 rounded-xl bg-black/30 text-white border border-white/30 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400/60 transition-all"
            aria-label="Sessions before long break"
          />
        </label>
        
        <div className="flex gap-3 mt-4">
          <button 
            onClick={handleSave} 
            className="flex-1 px-6 py-3 rounded-xl bg-indigo-500/40 hover:bg-indigo-500/60 text-white font-bold border border-indigo-400/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400/60 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25" 
            aria-label="Save settings"
          >
            ✓ Save
          </button>
          <button 
            onClick={onClose} 
            className="flex-1 px-6 py-3 rounded-xl bg-rose-500/30 hover:bg-rose-500/40 text-white font-semibold border border-rose-400/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-rose-400/60 transition-all duration-300 shadow-lg shadow-rose-500/20" 
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
