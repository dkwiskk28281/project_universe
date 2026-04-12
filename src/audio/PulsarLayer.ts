import { AUDIO } from '../utils/constants'
import { randomRange } from '../utils/mathHelpers'

/**
 * Pulsar Layer — Gentle cosmic bells and chimes.
 *
 * Pulsars have mathematically precise periods, but we render them
 * as soft bell tones rather than harsh ticks — pleasant for hours.
 *
 * Frequencies are overtones of the CMB root (272.5 Hz):
 *   PSR-A: 545 Hz (×2, octave) — gentle chime
 *   PSR-B: 408.75 Hz (×3/2, fifth) — deep bell
 *   PSR-C: 681.25 Hz (×5/2, major tenth) — high sparkle
 *
 * Random cosmic pings: soft, filtered, musical tones in the
 * 300-700 Hz range — warm and pleasant, never harsh.
 */

interface PulsarDef {
  period: number
  frequency: number
  pan: number
  gain: number
  decay: number // Longer decay = more bell-like
}

const CMB = 272.5

const PULSARS: PulsarDef[] = [
  { period: 1.337301, frequency: CMB * 2,     pan: -0.5, gain: 0.025, decay: 0.3 },
  { period: 3.745,    frequency: CMB * 3 / 2, pan: 0.3,  gain: 0.03,  decay: 0.5 },
  { period: 0.7142,   frequency: CMB * 5 / 2, pan: 0.7,  gain: 0.015, decay: 0.2 },
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
      const offset = Math.random() * pulsar.period * 1000
      setTimeout(() => {
        const id = setInterval(() => {
          this.playPulsarBell(pulsar)
        }, pulsar.period * 1000)
        this.pulsarIntervals.push(id)
      }, offset)
    }
  }

  private playPulsarBell(pulsar: PulsarDef) {
    const now = this.ctx.currentTime

    const osc = this.ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = pulsar.frequency

    // Soft attack, gentle bell-like decay
    const env = this.ctx.createGain()
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(pulsar.gain, now + 0.01)
    env.gain.exponentialRampToValueAtTime(0.0001, now + pulsar.decay)

    // Warm filter — remove harshness
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = pulsar.frequency * 1.5
    filter.Q.value = 0.5

    const panner = this.ctx.createStereoPanner()
    panner.pan.value = pulsar.pan

    osc.connect(filter)
    filter.connect(env)
    env.connect(panner)
    panner.connect(this.destination)

    osc.start(now)
    osc.stop(now + pulsar.decay + 0.1)
  }

  // Gentle cosmic chimes at random intervals
  private scheduleRandomPing() {
    const minInterval = this.encounterMode
      ? AUDIO.pulsarMinInterval / 2
      : AUDIO.pulsarMinInterval
    const maxInterval = this.encounterMode
      ? AUDIO.pulsarMaxInterval / 2
      : AUDIO.pulsarMaxInterval

    const delay = randomRange(minInterval, maxInterval) * 1000

    this.randomTimeoutId = setTimeout(() => {
      this.playCosmicChime()
      this.scheduleRandomPing()
    }, delay)
  }

  private playCosmicChime() {
    const now = this.ctx.currentTime

    // Musical frequencies: CMB overtones in the warm range
    const notes = [
      CMB, CMB * 5 / 4, CMB * 3 / 2, CMB * 2,
      CMB * 5 / 2, CMB * 3, CMB * 7 / 4,
    ]
    const freq = notes[Math.floor(Math.random() * notes.length)]

    const osc = this.ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    // Gentle envelope — like a distant wind chime
    const env = this.ctx.createGain()
    const vol = randomRange(0.02, 0.06)
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(vol, now + 0.05)
    env.gain.exponentialRampToValueAtTime(0.0001, now + 2.0)

    // Warm filter
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = freq * 2
    filter.Q.value = 0.3

    const panner = this.ctx.createStereoPanner()
    panner.pan.value = randomRange(-0.8, 0.8)

    osc.connect(filter)
    filter.connect(env)
    env.connect(panner)
    panner.connect(this.destination)

    osc.start(now)
    osc.stop(now + 2.5)
  }
}
