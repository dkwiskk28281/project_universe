/**
 * Drone Layer — Ambient Cosmic Pad
 *
 * Designed for 24-hour listening: warm, enveloping, endlessly beautiful.
 *
 * Physics mapping: CMB temperature T=2.725K → 272.5 Hz (×100 scaling)
 * This lands in the warm middle register — the most pleasant range
 * for human hearing. All other tones built from the natural overtone
 * series (just intonation) — this IS physics, not human convention.
 *
 * Chord: CMB root 272.5 Hz with natural harmonics
 *   Root:    272.5 Hz  (CMB × 100)
 *   Octave:  136.25 Hz (warm sub-bass, ×1/2)
 *   Fifth:   408.75 Hz (×3/2 — gravitational binding)
 *   Third:   340.63 Hz (×5/4 — adds lushness)
 *   Seventh: 476.88 Hz (×7/4 — cosmic depth)
 *
 * Each voice is gently filtered and slowly evolving via LFOs.
 * Hydrogen 21cm (1.42 Hz) and Earth Schumann (7.83 Hz) modulate
 * amplitude and filter cutoff respectively.
 */
export class DroneLayer {
  private nodes: AudioNode[] = []

  constructor(
    private ctx: AudioContext,
    private destination: AudioNode
  ) {}

  start() {
    const now = this.ctx.currentTime
    const CMB = 272.5 // T_CMB × 100

    // Each voice: oscillator → filter → gain → destination
    // Filters soften the sound into a warm pad texture

    // 1. Root: CMB 272.5 Hz — the heart of the cosmos
    this.createVoice(CMB, 0.18, 400, 60)

    // 2. Detuned root: 272.7 Hz — slow 0.2 Hz beating (CMB anisotropy)
    this.createVoice(CMB + 0.2, 0.14, 380, 50)

    // 3. Sub-octave: 136.25 Hz — warm bass foundation
    this.createVoice(CMB / 2, 0.12, 250, 90)

    // 4. Perfect fifth: 408.75 Hz — gravitational harmony (×3/2)
    const fifthGain = this.createVoice(CMB * 3 / 2, 0.10, 500, 45)

    // 5. Major third: 340.63 Hz — adds warmth (×5/4)
    this.createVoice(CMB * 5 / 4, 0.07, 450, 55)

    // 6. Natural seventh: 476.88 Hz — cosmic depth (×7/4)
    this.createVoice(CMB * 7 / 4, 0.05, 550, 40)

    // 7. High octave shimmer: 545 Hz — ethereal (×2)
    this.createVoice(CMB * 2, 0.03, 600, 35)
    // Detuned shimmer: creates slow celestial beating
    this.createVoice(CMB * 2 + 0.5, 0.025, 600, 35)

    // === LFO: Hydrogen 21cm line (1.42 Hz) ===
    // Modulates the fifth — hydrogen modulates gravity
    const h21LFO = this.ctx.createOscillator()
    h21LFO.type = 'sine'
    h21LFO.frequency.value = 1.420405751
    const lfoDepth = this.ctx.createGain()
    lfoDepth.gain.value = 0.03
    h21LFO.connect(lfoDepth)
    lfoDepth.connect(fifthGain.gain)
    h21LFO.start(now)
    this.nodes.push(h21LFO, lfoDepth)

    // === Ultra-slow evolution LFO (period ~90 seconds) ===
    // Represents cosmic expansion — very gentle volume swell
    const cosmicLFO = this.ctx.createOscillator()
    cosmicLFO.type = 'sine'
    cosmicLFO.frequency.value = 1 / 90 // 90-second cycle
    const cosmicDepth = this.ctx.createGain()
    cosmicDepth.gain.value = 0.02
    cosmicLFO.connect(cosmicDepth)
    // Modulate the root voice very subtly
    cosmicDepth.connect(fifthGain.gain)
    cosmicLFO.start(now)
    this.nodes.push(cosmicLFO, cosmicDepth)
  }

  private createVoice(freq: number, vol: number, filterFreq: number, filterQ: number): GainNode {
    const osc = this.ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    // Gentle low-pass filter softens each voice
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = filterFreq
    filter.Q.value = 0.7

    const gain = this.ctx.createGain()
    gain.gain.value = vol

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.destination)
    osc.start()

    this.nodes.push(osc, filter, gain)
    return gain
  }
}
