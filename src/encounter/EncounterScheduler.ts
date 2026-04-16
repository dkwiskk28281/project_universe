import { ENCOUNTER } from '../utils/constants'
import { exponentialRandom } from '../utils/mathHelpers'

export class EncounterScheduler {
  private timeoutId: ReturnType<typeof setTimeout> | null = null
  private lambda: number

  constructor(private onSeek: () => void) {
    // Lambda for exponential distribution: 1 / mean
    // With 30-day mean: λ ≈ 3.86e-7 per second
    // This creates truly rare encounters:
    //   P(within 1 hour)  ≈ 0.14%  — lightning strike
    //   P(within 1 day)   ≈ 3.3%   — rare
    //   P(within 1 week)  ≈ 21%    — possible
    //   P(within 30 days) ≈ 63%    — likely but not certain
    //   P(within 90 days) ≈ 95%    — almost certain eventually
    this.lambda = 1 / ENCOUNTER.averageIntervalSeconds
  }

  start() {
    this.scheduleNext()
  }

  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }

  triggerNow() {
    this.stop()
    this.onSeek()
  }

  adjustForUsage(avgDailyHours: number) {
    const fraction = Math.max(avgDailyHours / 24, 0.01)
    this.lambda = 1 / (ENCOUNTER.averageIntervalSeconds * fraction)
  }

  private scheduleNext() {
    const waitSeconds = exponentialRandom(this.lambda)
    // No artificial cap — let the math be real.
    // Could be 5 minutes. Could be 60 days. That's what makes it feel like a miracle.
    const cappedWait = ENCOUNTER.maxWaitSeconds === Infinity
      ? waitSeconds
      : Math.min(waitSeconds, ENCOUNTER.maxWaitSeconds)

    this.timeoutId = setTimeout(() => {
      this.onSeek()
      this.scheduleNext()
    }, cappedWait * 1000)
  }
}
