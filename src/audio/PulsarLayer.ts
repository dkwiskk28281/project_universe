import { randomRange } from '../utils/mathHelpers'

/**
 * Pulsar Layer — Rare, gentle celestial wind chimes.
 *
 * Scientific principle: sudden sounds disrupt sleep stage N3.
 * Therefore chimes must be:
 *   - RARE (45-90 seconds apart)
 *   - SOFT (barely above the noise floor)
 *   - SLOW ATTACK (no sharp onset — 200ms fade in)
 *   - LONG DECAY (4-7 seconds — melts into the reverb)
 *
 * Pentatonic scale: mathematically cannot produce dissonance.
 * Built from CMB 272.5 Hz in just intonation.
 *
 * Background pulsars have very long periods (8-15 seconds)
 * so their repetition feels natural, not mechanical.
 */

const CMB = 272.5

const PENTATONIC = [
  CMB,             // 272.5 — root
  CMB * 9 / 8,     // 306.6 — second
  CMB * 5 / 4,     // 340.6 — third
  CMB * 3 / 2,     // 408.8 — fifth
  CMB * 15 / 8,    // 510.9 — seventh
  CMB * 2,         // 545.0 — octave
  CMB * 5 / 2,     // 681.3 — tenth
]

interface PulsarDef {
  period: number
  noteIndex: number
  pan: number
  gain: number
  decay: number
}

// Very slow, meditative pulsars
const PULSARS: PulsarDef[] = [
  { period: 8.7,   noteIndex: 0, pan: -0.3, gain: 0.018, decay: 4.0 },
  { period: 12.3,  noteIndex: 3, pan: 0.4,  gain: 0.015, decay: 5.0 },
  { period: 15.1,  noteIndex: 5, pan: -0.6, gain: 0.012, decay: 4.5 },
]

export class PulsarLayer {
  private chimeTimeoutId: ReturnType<typeof setTimeout> | null = null
  private pulsarIntervals: ReturnType<typeof setInterval>[] = []
  private encounterMode = false

  constructor(
    private ctx: AudioContext,
    private destination: AudioNode
  ) {}

  start() {
    this.scheduleChime()
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
          this.playBell(PENTATONIC[pulsar.noteIndex], pulsar.gain, pulsar.decay, pulsar.pan)
        }, pulsar.period * 1000)
        this.pulsarIntervals.push(id)
      }, offset)
    }
  }

  private playBell(freq: number, vol: number, decay: number, pan: number) {
    const now = this.ctx.currentTime

    const osc = this.ctx.createOscillator()
    // Triangle wave = warmer, more like singing bowl than test tone
    osc.type = 'triangle'
    osc.frequency.value = freq

    // Shimmer overtone with slight random detune (organic feel)
    const osc2 = this.ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = freq * (2 + Math.random() * 0.005)

    // SLOW attack (200ms) — never startles
    const env = this.ctx.createGain()
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(vol, now + 0.2)
    env.gain.exponentialRampToValueAtTime(0.00001, now + decay)

    const env2 = this.ctx.createGain()
    env2.gain.setValueAtTime(0, now)
    env2.gain.linearRampToValueAtTime(vol * 0.12, now + 0.25)
    env2.gain.exponentialRampToValueAtTime(0.00001, now + decay * 0.6)

    // Warm filter
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = freq * 2
    filter.Q.value = 0.3

    const panner = this.ctx.createStereoPanner()
    panner.pan.value = pan

    osc.connect(filter)
    osc2.connect(filter)
    filter.connect(env)
    filter.connect(env2)
    env.connect(panner)
    env2.connect(panner)
    panner.connect(this.destination)

    osc.start(now)
    osc2.start(now)
    osc.stop(now + decay + 0.3)
    osc2.stop(now + decay + 0.3)
  }

  // Rare random chimes — 45-90 second intervals
  private scheduleChime() {
    const min = this.encounterMode ? 20 : 45
    const max = this.encounterMode ? 40 : 90

    const delay = randomRange(min, max) * 1000

    this.chimeTimeoutId = setTimeout(() => {
      this.playRandomChime()
      this.scheduleChime()
    }, delay)
  }

  private playRandomChime() {
    const note = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)]
    const vol = randomRange(0.008, 0.022) // Very soft
    const decay = randomRange(4, 7)
    const pan = randomRange(-0.7, 0.7)

    this.playBell(note, vol, decay, pan)
  }
}
