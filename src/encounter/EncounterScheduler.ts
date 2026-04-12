import { ENCOUNTER } from '../utils/constants'
import { exponentialRandom } from '../utils/mathHelpers'

export class EncounterScheduler {
  private timeoutId: ReturnType<typeof setTimeout> | null = null
  private lambda: number

  constructor(private onSeek: () => void) {
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

  /** For testing: trigger an immediate seek */
  triggerNow() {
    this.stop()
    this.onSeek()
  }

  /** Adjust lambda based on actual app usage time */
  adjustForUsage(avgDailyHours: number) {
    // If user only has app open 2 hours/day, increase lambda proportionally
    const fraction = Math.max(avgDailyHours / 24, 0.01)
    this.lambda = 1 / (ENCOUNTER.averageIntervalSeconds * fraction)
  }

  private scheduleNext() {
    const waitSeconds = exponentialRandom(this.lambda)
    // Cap at 24 hours max wait
    const cappedWait = Math.min(waitSeconds, 86400)

    this.timeoutId = setTimeout(() => {
      this.onSeek()
      this.scheduleNext()
    }, cappedWait * 1000)
  }
}
