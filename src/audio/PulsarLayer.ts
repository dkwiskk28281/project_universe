import { AUDIO } from '../utils/constants'
import { randomRange } from '../utils/mathHelpers'

/**
 * Pulsar Layer — Celestial wind chimes.
 *
 * Pentatonic scale: mathematically impossible to create dissonance.
 * Every random combination of these notes sounds beautiful.
 * Built from CMB root 272.5 Hz using just intonation ratios.
 *
 * Pentatonic: 1, 9/8, 5/4, 3/2, 15/8 (major pentatonic)
 * = 272.5, 306.6, 340.6, 408.8, 510.9 Hz and their octaves
 *
 * Each chime has a long, singing decay (3-5 seconds) with
 * gentle attack, creating an endless wind-chime garden.
 */

const CMB = 272.5

// Major pentatonic in just intonation — always consonant
const PENTATONIC = [
  CMB * 1,         // 272.5 — root
  CMB * 9 / 8,     // 306.6 — major second
  CMB * 5 / 4,     // 340.6 — major third
  CMB * 3 / 2,     // 408.8 — perfect fifth
  CMB * 15 / 8,    // 510.9 — major seventh
  CMB * 2,         // 545.0 — octave
  CMB * 9 / 4,     // 613.1 — ninth
  CMB * 5 / 2,     // 681.3 — tenth
  CMB * 3,         // 817.5 — twelfth
]

interface PulsarDef {
  period: number
  noteIndex: number
  pan: number
  gain: number
  decay: number
}

const PULSARS: PulsarDef[] = [
  { period: 3.745,    noteIndex: 0, pan: -0.4, gain: 0.035, decay: 2.5 },
  { period: 5.891,    noteIndex: 4, pan: 0.3,  gain: 0.025, decay: 3.0 },
  { period: 8.234,    noteIndex: 2, pan: 0.6,  gain: 0.030, decay: 3.5 },
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

    // Fundamental
    const osc = this.ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    // Soft harmonic overtone for richness
    const osc2 = this.ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = freq * 2.003 // Slightly detuned octave = shimmer

    // Gentle envelope — slow attack, long singing decay
    const env = this.ctx.createGain()
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(vol, now + 0.08)
    env.gain.exponentialRampToValueAtTime(0.0001, now + decay)

    const env2 = this.ctx.createGain()
    env2.gain.setValueAtTime(0, now)
    env2.gain.linearRampToValueAtTime(vol * 0.2, now + 0.1)
    env2.gain.exponentialRampToValueAtTime(0.0001, now + decay * 0.7)

    // Warm filter
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = freq * 2.5
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
    osc.stop(now + decay + 0.2)
    osc2.stop(now + decay + 0.2)
  }

  private scheduleChime() {
    const min = this.encounterMode ? 6 : AUDIO.pulsarMinInterval
    const max = this.encounterMode ? 12 : AUDIO.pulsarMaxInterval

    const delay = randomRange(min, max) * 1000

    this.randomTimeoutId = setTimeout(() => {
      this.playRandomChime()
      this.scheduleChime()
    }, delay)
  }

  private playRandomChime() {
    const note = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)]
    const vol = randomRange(0.015, 0.04)
    const decay = randomRange(2.5, 5.0)
    const pan = randomRange(-0.8, 0.8)

    this.playBell(note, vol, decay, pan)
  }
}
