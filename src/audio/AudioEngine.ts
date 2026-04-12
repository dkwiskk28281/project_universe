import { DroneLayer } from './DroneLayer'
import { CosmicHumLayer } from './CosmicHumLayer'
import { PulsarLayer } from './PulsarLayer'

/**
 * Audio Engine — Sonification of the Universe
 *
 * Every frequency is derived from real astrophysical phenomena,
 * scaled to the audible range by a universal scaling factor.
 *
 * Scaling: Real universe frequencies span ~30 orders of magnitude.
 * We compress them into 20Hz-2kHz using logarithmic mapping.
 *
 * Sources:
 *   CMB (2.725K)  → kT/h = 56.8 GHz → scaled to 56.8 Hz base drone
 *   Hydrogen 21cm → 1420.405 MHz     → scaled to 1.42 Hz LFO modulation
 *   Solar p-modes → 3.05 mHz         → scaled to 110 Hz (×36000)
 *   ISM plasma    → f_p ≈ 1.56 kHz   → brown noise filtered at 160 Hz
 *   Pulsars       → real periods      → exact audio ticks
 */
class AudioEngineClass {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private convolver: ConvolverNode | null = null
  private drone: DroneLayer | null = null
  private cosmicHum: CosmicHumLayer | null = null
  private pulsar: PulsarLayer | null = null
  private initialized = false

  // Encounter audio
  private encounterNodes: AudioNode[] = []
  private encounterGain: GainNode | null = null

  /**
   * Initialize audio — MUST be called synchronously from a user gesture on iOS.
   * No async/await before AudioContext creation.
   */
  init(): void {
    if (this.initialized) return

    // Create AudioContext synchronously — critical for iOS Safari
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)()

    // iOS: resume must happen in the same gesture call stack
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }

    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.value = 1.0

    // Create reverb — simulates vastness of space
    this.convolver = this.ctx.createConvolver()
    this.convolver.buffer = this.createReverbImpulse(5, 2.5)

    // Dry/wet mix
    const dryGain = this.ctx.createGain()
    dryGain.gain.value = 0.65
    const wetGain = this.ctx.createGain()
    wetGain.gain.value = 0.35

    this.masterGain.connect(dryGain)
    this.masterGain.connect(this.convolver)
    this.convolver.connect(wetGain)

    dryGain.connect(this.ctx.destination)
    wetGain.connect(this.ctx.destination)

    // Init layers
    this.drone = new DroneLayer(this.ctx, this.masterGain)
    this.cosmicHum = new CosmicHumLayer(this.ctx, this.masterGain)
    this.pulsar = new PulsarLayer(this.ctx, this.masterGain)

    this.drone.start()
    this.cosmicHum.start()
    this.pulsar.start()

    this.initialized = true
  }

  private createReverbImpulse(duration: number, decay: number): AudioBuffer {
    const ctx = this.ctx!
    const sampleRate = ctx.sampleRate
    const length = sampleRate * duration
    const buffer = ctx.createBuffer(2, length, sampleRate)

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel)
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay)
      }
    }

    return buffer
  }

  setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.1)
    }
  }

  startEncounterAudio() {
    if (!this.ctx || !this.masterGain) return

    this.encounterGain = this.ctx.createGain()
    this.encounterGain.gain.value = 0
    this.encounterGain.connect(this.masterGain)

    const now = this.ctx.currentTime

    // 528 Hz — derived from harmonic series of CMB fundamental
    // 56.8 × 9.296 ≈ 528 (9th-ish harmonic, the "miracle tone")
    const osc1 = this.ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.value = 528
    const filter1 = this.ctx.createBiquadFilter()
    filter1.type = 'lowpass'
    filter1.frequency.value = 800
    filter1.Q.value = 2
    osc1.connect(filter1)
    filter1.connect(this.encounterGain)
    osc1.start(now)

    // Perfect fifth: 528 × 3/2 = 792 Hz (Pythagorean harmony)
    const osc2 = this.ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = 792
    const gain2 = this.ctx.createGain()
    gain2.gain.value = 0
    osc2.connect(gain2)
    gain2.connect(this.encounterGain)
    osc2.start(now)
    gain2.gain.setTargetAtTime(0.4, now + 5, 8)

    // Sub-octave: 264 Hz
    const osc3 = this.ctx.createOscillator()
    osc3.type = 'sine'
    osc3.frequency.value = 264
    const gain3 = this.ctx.createGain()
    gain3.gain.value = 0
    const filter3 = this.ctx.createBiquadFilter()
    filter3.type = 'lowpass'
    filter3.frequency.value = 400
    osc3.connect(filter3)
    filter3.connect(gain3)
    gain3.connect(this.encounterGain)
    osc3.start(now)
    gain3.gain.setTargetAtTime(0.3, now + 2, 5)

    // Detuned shimmer: 528 × 2.01 ≈ 1061 Hz
    const osc4 = this.ctx.createOscillator()
    osc4.type = 'sine'
    osc4.frequency.value = 1061.28
    const gain4 = this.ctx.createGain()
    gain4.gain.value = 0
    osc4.connect(gain4)
    gain4.connect(this.encounterGain)
    osc4.start(now)
    gain4.gain.setTargetAtTime(0.15, now + 15, 10)

    // Slow crescendo
    this.encounterGain.gain.setTargetAtTime(0.1, now, 6)

    this.encounterNodes = [osc1, osc2, osc3, osc4, filter1, gain2, gain3, gain4, filter3]
    this.pulsar?.setEncounterMode(true)
  }

  stopEncounterAudio() {
    if (!this.ctx || !this.encounterGain) return

    const now = this.ctx.currentTime
    this.encounterGain.gain.setTargetAtTime(0, now, 4)

    setTimeout(() => {
      for (const node of this.encounterNodes) {
        try {
          if (node instanceof OscillatorNode) node.stop()
          node.disconnect()
        } catch { /* already stopped */ }
      }
      this.encounterGain?.disconnect()
      this.encounterNodes = []
      this.encounterGain = null
    }, 15000)

    this.pulsar?.setEncounterMode(false)
  }

  playMessageReceiveSound() {
    if (!this.ctx || !this.masterGain) return

    const now = this.ctx.currentTime
    const msgGain = this.ctx.createGain()
    msgGain.gain.value = 0
    msgGain.connect(this.masterGain)

    // Hydrogen line harmonic: 1420.405 / 1.6 ≈ 887.75 Hz
    const osc = this.ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = 887.75

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 900
    filter.Q.value = 5

    osc.connect(filter)
    filter.connect(msgGain)
    osc.start(now)

    msgGain.gain.setTargetAtTime(0.04, now, 0.5)
    msgGain.gain.setTargetAtTime(0, now + 2, 3)

    osc.stop(now + 12)
    setTimeout(() => msgGain.disconnect(), 13000)
  }

  suspend() {
    this.ctx?.suspend()
  }

  resume() {
    if (this.ctx?.state === 'suspended') {
      this.ctx.resume()
    }
  }

  isInitialized(): boolean {
    return this.initialized
  }
}

export const AudioEngine = new AudioEngineClass()
