import { AUDIO } from '../utils/constants'
import { randomRange } from '../utils/mathHelpers'

/**
 * Pulsar Layer — two types of signals:
 *
 * 1. Random cosmic pings (original) — metallic sweeps at irregular intervals
 * 2. Mathematically precise pulsars — rotating neutron stars with exact periods
 *
 * Real pulsars have extraordinarily stable periods (some rival atomic clocks).
 * We simulate 3 background pulsars with fixed periods and distinct tones.
 *
 * PSR-A: period 1.337301s, freq 1847 Hz (millisecond-class, very fast)
 * PSR-B: period 3.745s, freq 892 Hz (slow pulsar, deep)
 * PSR-C: period 0.7142s, freq 2340 Hz (fast, high-pitched)
 */

interface PulsarDef {
  period: number    // Exact period in seconds
  frequency: number // Tone frequency in Hz
  pan: number       // Stereo position
  gain: number      // Volume
}

const PULSARS: PulsarDef[] = [
  { period: 1.337301, frequency: 1847, pan: -0.6, gain: 0.008 },
  { period: 3.745,    frequency: 892,  pan: 0.4,  gain: 0.012 },
  { period: 0.7142,   frequency: 2340, pan: 0.8,  gain: 0.005 },
]

export class PulsarLayer {
  private randomTimeoutId: ReturnType<typeof setTimeout> | null = null
  private pulsarIntervals: ReturnType<typeof setInterval>[] = []
  private encounterMode = false

  constructor(
    private ctx: AudioContext,
    private destination: AudioNode
  ) {}

  start() {
    this.scheduleRandomPing()
    this.startPulsars()
  }

  setEncounterMode(active: boolean) {
    this.encounterMode = active
  }

  private startPulsars() {
    for (const pulsar of PULSARS) {
      // Use setInterval for mathematically precise timing
      // Small random offset so they don't all start aligned
      const offset = Math.random() * pulsar.period * 1000
      setTimeout(() => {
        const id = setInterval(() => {
          this.playPulsarTick(pulsar)
        }, pulsar.period * 1000)
        this.pulsarIntervals.push(id)
      }, offset)
    }
  }

  private playPulsarTick(pulsar: PulsarDef) {
    const now = this.ctx.currentTime

    const osc = this.ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = pulsar.frequency

    // Very short, sharp tick
    const env = this.ctx.createGain()
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(pulsar.gain, now + 0.001) // 1ms attack
    env.gain.exponentialRampToValueAtTime(0.0001, now + 0.04)  // 40ms decay

    const panner = this.ctx.createStereoPanner()
    panner.pan.value = pulsar.pan

    // Bandpass to give each pulsar a distinct character
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = pulsar.frequency
    filter.Q.value = 10

    osc.connect(filter)
    filter.connect(env)
    env.connect(panner)
    panner.connect(this.destination)

    osc.start(now)
    osc.stop(now + 0.1)
  }

  // --- Original random cosmic pings ---

  private scheduleRandomPing() {
    const minInterval = this.encounterMode
      ? AUDIO.pulsarMinInterval / 3
      : AUDIO.pulsarMinInterval
    const maxInterval = this.encounterMode
      ? AUDIO.pulsarMaxInterval / 3
      : AUDIO.pulsarMaxInterval

    const delay = randomRange(minInterval, maxInterval) * 1000

    this.randomTimeoutId = setTimeout(() => {
      this.playRandomPing()
      this.scheduleRandomPing()
    }, delay)
  }

  private playRandomPing() {
    const now = this.ctx.currentTime

    const osc = this.ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = randomRange(1200, 3000)

    osc.frequency.setValueAtTime(osc.frequency.value, now)
    osc.frequency.exponentialRampToValueAtTime(osc.frequency.value * 0.5, now + 0.15)

    const env = this.ctx.createGain()
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(randomRange(0.02, 0.06), now + 0.005)
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.8)

    const panner = this.ctx.createStereoPanner()
    panner.pan.value = randomRange(-1, 1)

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = 600

    osc.connect(filter)
    filter.connect(env)
    env.connect(panner)
    panner.connect(this.destination)

    osc.start(now)
    osc.stop(now + 1)
  }
}
