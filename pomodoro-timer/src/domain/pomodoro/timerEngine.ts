export type TimerEngineOptions = {
  duration: number;
  onTick: (secondsLeft: number) => void;
  onEnd: () => void;
};

export class TimerEngine {
  private duration: number;
  private onTick: (secondsLeft: number) => void;
  private onEnd: () => void;
  private startTime: number = 0;
  private endTime: number = 0;
  private timerId: number | null = null;
  private running: boolean = false;

  constructor({ duration, onTick, onEnd }: TimerEngineOptions) {
    this.duration = duration;
    this.onTick = onTick;
    this.onEnd = onEnd;
  }

  start() {
    this.startTime = Date.now();
    this.endTime = this.startTime + this.duration * 1000;
    this.running = true;
    this.tick();
  }

  private tick = () => {
    if (!this.running) return;
    const now = Date.now();
    const secondsLeft = Math.max(0, Math.round((this.endTime - now) / 1000));
    this.onTick(secondsLeft);
    if (secondsLeft <= 0) {
      this.running = false;
      this.onEnd();
      return;
    }
    this.timerId = window.setTimeout(this.tick, 250);
  };

  pause() {
    if (!this.running) return;
    this.running = false;
    if (this.timerId) clearTimeout(this.timerId);
    this.duration = Math.max(0, Math.round((this.endTime - Date.now()) / 1000));
  }

  resume() {
    if (this.running || this.duration <= 0) return;
    this.running = true;
    this.startTime = Date.now();
    this.endTime = this.startTime + this.duration * 1000;
    this.tick();
  }

  reset(duration: number) {
    if (this.timerId) clearTimeout(this.timerId);
    this.duration = duration;
    this.running = false;
    this.onTick(duration);
  }
}
