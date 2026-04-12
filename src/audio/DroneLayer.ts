/**
 * Drone Layer — Healing Cosmic Pad with Binaural Relaxation
 *
 * Designed to induce deep relaxation via:
 *
 * 1. Binaural beats: L/R ears get slightly different frequencies,
 *    creating a perceived "third tone" that entrains brainwaves.
 *    Δf = 6 Hz → theta waves (4-8 Hz) = deep meditation state.
 *
 * 2. Natural overtone series: only consonant intervals from physics.
 *    Root: 272.5 Hz (CMB temperature × 100)
 *
 * 3. Very slow evolution: LFOs with 60-120 second periods.
 *    Nothing sudden — every change takes seconds to unfold.
 *
 * 4. Warm filtering: every voice passes through lowpass filters
 *    that remove all harshness. Like sound heard through water.
 */
export class DroneLayer {
  private nodes: AudioNode[] = []

  constructor(
    private ctx: AudioContext,
    private destination: AudioNode
  ) {}

  start() {
    const CMB = 272.5

    // === Binaural Pad (stereo separation for theta entrainment) ===

    // Left channel: root
    this.createBinauralPair(CMB, CMB + 6, 0.15, 450)

    // Fifth pair (gravitational harmony)
    this.createBinauralPair(CMB * 3 / 2, CMB * 3 / 2 + 4, 0.09, 550)

    // === Warm center voices (mono, both ears) ===

    // Sub-octave: 136.25 Hz — felt warmth
    this.createFilteredVoice(CMB / 2, 0.10, 280)

    // Major third: 340.6 Hz — lush sweetness
    this.createFilteredVoice(CMB * 5 / 4, 0.06, 500)

    // Natural seventh: 476.9 Hz — dreamy depth
    this.createFilteredVoice(CMB * 7 / 4, 0.04, 550)

    // High octave shimmer pair — celestial sparkle
    this.createFilteredVoice(CMB * 2, 0.025, 650)
    this.createFilteredVoice(CMB * 2 + 0.3, 0.020, 650)

    // === Ultra-slow breathing LFOs ===

    // Hydrogen 21cm modulates fifth (1.42 Hz)
    this.createLFO(1.420405751, 0.02)

    // Cosmic expansion breath (~80 second cycle)
    this.createLFO(1 / 80, 0.015)
  }

  private createBinauralPair(freqL: number, freqR: number, vol: number, filterFreq: number) {
    // Left ear
    const oscL = this.ctx.createOscillator()
    oscL.type = 'sine'
    oscL.frequency.value = freqL
    const filterL = this.ctx.createBiquadFilter()
    filterL.type = 'lowpass'
    filterL.frequency.value = filterFreq
    filterL.Q.value = 0.5
    const gainL = this.ctx.createGain()
    gainL.gain.value = vol
    const panL = this.ctx.createStereoPanner()
    panL.pan.value = -1

    oscL.connect(filterL)
    filterL.connect(gainL)
    gainL.connect(panL)
    panL.connect(this.destination)
    oscL.start()

    // Right ear
    const oscR = this.ctx.createOscillator()
    oscR.type = 'sine'
    oscR.frequency.value = freqR
    const filterR = this.ctx.createBiquadFilter()
    filterR.type = 'lowpass'
    filterR.frequency.value = filterFreq
    filterR.Q.value = 0.5
    const gainR = this.ctx.createGain()
    gainR.gain.value = vol
    const panR = this.ctx.createStereoPanner()
    panR.pan.value = 1

    oscR.connect(filterR)
    filterR.connect(gainR)
    gainR.connect(panR)
    panR.connect(this.destination)
    oscR.start()

    this.nodes.push(oscL, filterL, gainL, panL, oscR, filterR, gainR, panR)
  }

  private createFilteredVoice(freq: number, vol: number, filterFreq: number): GainNode {
    const osc = this.ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = filterFreq
    filter.Q.value = 0.5

    const gain = this.ctx.createGain()
    gain.gain.value = vol

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.destination)
    osc.start()

    this.nodes.push(osc, filter, gain)
    return gain
  }

  private createLFO(freq: number, depth: number) {
    const lfo = this.ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = freq
    const lfoGain = this.ctx.createGain()
    lfoGain.gain.value = depth

    // Modulate the master destination gain
    lfo.connect(lfoGain)
    lfoGain.connect(this.destination instanceof GainNode
      ? (this.destination as GainNode).gain
      : this.destination)
    lfo.start()

    this.nodes.push(lfo, lfoGain)
  }
}
