/**
 * Drone Layer — Sonification of Cosmic Background Radiation
 *
 * Physics-derived frequencies with mobile-audible harmonics.
 *
 * Phone speakers can't reproduce below ~200 Hz, so we add
 * upper harmonics of each astrophysical frequency that ARE audible.
 * The mathematical relationship is preserved — they're exact
 * integer multiples (overtone series) of the base frequencies.
 *
 * Base frequencies (inaudible on phones, audible on speakers/headphones):
 *   1. CMB Fundamental: 56.78 Hz (kT/h at 2.725K)
 *   2. CMB Anisotropy: 56.99 Hz (cosmic dipole beating)
 *   3. Solar p-mode: 113.56 Hz
 *   4. Gravitational fifth: 85.17 Hz
 *
 * Mobile-audible harmonics (always present):
 *   5. CMB 4th harmonic: 227.12 Hz (56.78 × 4)
 *   6. CMB 8th harmonic: 454.24 Hz (56.78 × 8) — warm mid tone
 *   7. Solar 4th harmonic: 454.24 Hz (merged with above)
 *   8. Gravitational 3rd harmonic: 255.51 Hz (85.17 × 3)
 *   9. CMB 16th harmonic: 908.48 Hz — ethereal high shimmer
 *
 * LFO: Hydrogen 21cm line: 1.42 Hz
 */
export class DroneLayer {
  private oscillators: OscillatorNode[] = []
  private gains: GainNode[] = []
  private lfo: OscillatorNode | null = null

  constructor(
    private ctx: AudioContext,
    private destination: AudioNode
  ) {}

  start() {
    // === Sub-bass (audible on headphones/speakers) ===

    // CMB fundamental: 56.78 Hz
    this.createOsc(56.78, 'sine', 0.25)
    // CMB anisotropy: 56.99 Hz (0.21 Hz beating)
    this.createOsc(56.99, 'sine', 0.20)
    // Gravitational fifth: 85.17 Hz
    this.createOsc(85.17, 'sine', 0.12)
    // Solar p-mode: 113.56 Hz
    this.createOsc(113.56, 'triangle', 0.08)

    // === Mobile-audible harmonics (200+ Hz) ===
    // These are exact mathematical overtones of the base frequencies

    // CMB 4th harmonic: 227.12 Hz — warm bass on any speaker
    this.createOsc(56.78 * 4, 'sine', 0.18)
    // CMB 4th + anisotropy: 227.96 Hz — beating in audible range too
    this.createOsc(56.99 * 4, 'sine', 0.14)

    // Gravitational 3rd harmonic: 255.51 Hz
    const gravHarmonicGain = this.createOsc(85.17 * 3, 'sine', 0.12)

    // CMB 8th harmonic: 454.24 Hz — clear mid tone
    this.createOsc(56.78 * 8, 'sine', 0.08)

    // CMB 16th harmonic: 908.48 Hz — ethereal high shimmer
    this.createOsc(56.78 * 16, 'sine', 0.03)
    // Detuned shimmer: 908.48 × 1.003 — slow beating at high freq
    this.createOsc(56.78 * 16 * 1.003, 'sine', 0.025)

    // === Hydrogen 21cm LFO: 1.42 Hz ===
    this.lfo = this.ctx.createOscillator()
    this.lfo.type = 'sine'
    this.lfo.frequency.value = 1.420405751
    const lfoGain = this.ctx.createGain()
    lfoGain.gain.value = 0.06
    this.lfo.connect(lfoGain)
    lfoGain.connect(gravHarmonicGain.gain)
    this.lfo.start()
  }

  private createOsc(frequency: number, type: OscillatorType, volume: number): GainNode {
    const osc = this.ctx.createOscillator()
    osc.type = type
    osc.frequency.value = frequency

    const gain = this.ctx.createGain()
    gain.gain.value = volume

    osc.connect(gain)
    gain.connect(this.destination)
    osc.start()

    this.oscillators.push(osc)
    this.gains.push(gain)

    return gain
  }
}
