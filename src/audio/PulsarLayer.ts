import { AUDIO } from '../utils/constants'
import { randomRange } from '../utils/mathHelpers'

export class PulsarLayer {
  private timeoutId: ReturnType<typeof setTimeout> | null = null
  private encounterMode = false
  private activeNodes: { osc: OscillatorNode; nodes: AudioNode[] }[] = []
  private stopped = false

  constructor(
    private ctx: AudioContext,
    private destination: AudioNode
  ) {}

  start() {
    this.stopped = false
    this.scheduleNext()
  }

  stop() {
    this.stopped = true
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
    // Cleanup all active oscillator nodes
    for (const entry of this.activeNodes) {
      try {
        entry.osc.stop()
      } catch {
        // Already stopped
      }
      for (const node of entry.nodes) {
        node.disconnect()
      }
    }
    this.activeNodes = []
  }

  setEncounterMode(active: boolean) {
    this.encounterMode = active
  }

  private scheduleNext() {
    if (this.stopped) return

    const minInterval = this.encounterMode
      ? AUDIO.pulsarMinInterval / 3
      : AUDIO.pulsarMinInterval
    const maxInterval = this.encounterMode
      ? AUDIO.pulsarMaxInterval / 3
      : AUDIO.pulsarMaxInterval

    const delay = randomRange(minInterval, maxInterval) * 1000

    this.timeoutId = setTimeout(() => {
      this.playPing()
      this.scheduleNext()
    }, delay)
  }

  private playPing() {
    const now = this.ctx.currentTime

    // Create a short, metallic ping
    const osc = this.ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = randomRange(1200, 3000)

    // Quick frequency sweep down for metallic feel
    osc.frequency.setValueAtTime(osc.frequency.value, now)
    osc.frequency.exponentialRampToValueAtTime(osc.frequency.value * 0.5, now + 0.15)

    // Envelope
    const env = this.ctx.createGain()
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(randomRange(0.02, 0.06), now + 0.01)
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.8)

    // Stereo pan
    const panner = this.ctx.createStereoPanner()
    panner.pan.value = randomRange(-1, 1)

    // High-pass filter for clarity
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = 600

    osc.connect(filter)
    filter.connect(env)
    env.connect(panner)
    panner.connect(this.destination)

    const entry = { osc, nodes: [filter, env, panner] as AudioNode[] }
    this.activeNodes.push(entry)

    // Cleanup after the oscillator finishes
    osc.onended = () => {
      for (const node of entry.nodes) {
        node.disconnect()
      }
      osc.disconnect()
      const idx = this.activeNodes.indexOf(entry)
      if (idx !== -1) this.activeNodes.splice(idx, 1)
    }

    osc.start(now)
    osc.stop(now + 1)
  }
}
