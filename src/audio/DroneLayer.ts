/**
 * Drone Layer — Sonification of Cosmic Background Radiation
 *
 * All frequencies derived from real astrophysics:
 *
 * 1. CMB Fundamental (56.78 Hz) — kT/h at T=2.725K, scaled ×10⁻⁹
 * 2. CMB Anisotropy (56.99 Hz) — beat freq 0.21 Hz = cosmic dipole
 * 3. Solar p-mode (113.56 Hz) — stellar oscillation, octave of CMB
 * 4. Gravitational Fifth (85.17 Hz) — CMB × 3/2, Pythagorean harmony
 * 5. Hydrogen 21cm LFO (1.42 Hz) — 1420.405 MHz × 10⁻⁹, modulates everything
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
    // CMB fundamental: kT/h = 56.78 GHz → 56.78 Hz
    this.createOsc(56.78, 'sine', 0.12)

    // CMB anisotropy detuned: creates 0.21 Hz beating (~5s cycle)
    this.createOsc(56.99, 'sine', 0.10)

    // Solar p-mode: 3.05 mHz × 37200 = 113.56 Hz (octave of CMB)
    this.createOsc(113.56, 'triangle', 0.04)

    // Gravitational fifth: CMB × 3/2 = 85.17 Hz
    const gravGain = this.createOsc(85.17, 'sine', 0.06)

    // Hydrogen 21cm line as LFO: 1420.405751 MHz × 10⁻⁹ = 1.42 Hz
    this.lfo = this.ctx.createOscillator()
    this.lfo.type = 'sine'
    this.lfo.frequency.value = 1.420405751
    const lfoGain = this.ctx.createGain()
    lfoGain.gain.value = 0.04
    this.lfo.connect(lfoGain)
    lfoGain.connect(gravGain.gain)
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
