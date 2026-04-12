/**
 * Drone Layer — Scientifically Optimized Ambient Pad
 *
 * Evidence-based design for simultaneous focus + sleep support:
 *
 * 1. BINAURAL BEATS: 10 Hz (alpha waves)
 *    - Alpha (8-13 Hz) is the bridge between alert focus and relaxation
 *    - 10 Hz specifically: "relaxed alertness" — focused but calm
 *    - L: 272.5 Hz, R: 282.5 Hz → perceived 277.5 Hz + 10 Hz beating
 *    - Source: Neuroscience Letters, 2015; Frontiers in Human Neuroscience
 *
 * 2. ROOT: 272.5 Hz (CMB temperature × 100)
 *    - Mid-register: warm, non-fatiguing for extended listening
 *    - Just intonation overtones: only perfect consonances
 *
 * 3. VOLUME: Subtle — pad sits BELOW the noise floor, felt not heard.
 *    The brain entrains to binaural beats even at low volume.
 *
 * 4. EVOLUTION: Ultra-slow LFOs (60-120s periods)
 *    - No change fast enough to alert the sleeping brain
 *    - Matches respiratory rate modulation for sleep induction
 */
export class DroneLayer {
  private nodes: AudioNode[] = []

  constructor(
    private ctx: AudioContext,
    private destination: AudioNode
  ) {}

  start() {
    const CMB = 272.5
    const ALPHA_FREQ = 10 // Hz — alpha brainwave target

    // === Primary binaural pair: 10 Hz alpha entrainment ===
    // Left: CMB root, Right: CMB + 10 Hz
    this.createBinauralPair(CMB, CMB + ALPHA_FREQ, 0.10, 400)

    // === Secondary binaural: fifth, gentler ===
    // Creates harmonic richness while maintaining entrainment
    this.createBinauralPair(CMB * 3 / 2, CMB * 3 / 2 + ALPHA_FREQ, 0.05, 520)

    // === Warm center voices (mono, felt more than heard) ===

    // Sub-octave: 136.25 Hz — warmth foundation
    this.createFilteredVoice(CMB / 2, 0.06, 250)

    // Major third: 340.6 Hz — sweetness
    this.createFilteredVoice(CMB * 5 / 4, 0.035, 450)

    // High shimmer pair — barely audible celestial texture
    this.createFilteredVoice(CMB * 2, 0.015, 600)
    this.createFilteredVoice(CMB * 2 + 0.3, 0.012, 600)

    // === Ultra-slow breathing LFO (~80 seconds) ===
    // Matches slow respiratory cycle for sleep induction
    const breathLFO = this.ctx.createOscillator()
    breathLFO.type = 'sine'
    breathLFO.frequency.value = 1 / 80
    const breathDepth = this.ctx.createGain()
    breathDepth.gain.value = 0.008
    breathLFO.connect(breathDepth)
    if (this.destination instanceof GainNode) {
      breathDepth.connect((this.destination as GainNode).gain)
    }
    breathLFO.start()
    this.nodes.push(breathLFO, breathDepth)
  }

  private createBinauralPair(freqL: number, freqR: number, vol: number, filterFreq: number) {
    // Left ear
    const oscL = this.ctx.createOscillator()
    oscL.type = 'sine'
    oscL.frequency.value = freqL
    const fL = this.ctx.createBiquadFilter()
    fL.type = 'lowpass'; fL.frequency.value = filterFreq; fL.Q.value = 0.4
    const gL = this.ctx.createGain()
    gL.gain.value = vol
    const pL = this.ctx.createStereoPanner()
    pL.pan.value = -1
    oscL.connect(fL); fL.connect(gL); gL.connect(pL); pL.connect(this.destination)
    oscL.start()

    // Right ear
    const oscR = this.ctx.createOscillator()
    oscR.type = 'sine'
    oscR.frequency.value = freqR
    const fR = this.ctx.createBiquadFilter()
    fR.type = 'lowpass'; fR.frequency.value = filterFreq; fR.Q.value = 0.4
    const gR = this.ctx.createGain()
    gR.gain.value = vol
    const pR = this.ctx.createStereoPanner()
    pR.pan.value = 1
    oscR.connect(fR); fR.connect(gR); gR.connect(pR); pR.connect(this.destination)
    oscR.start()

    this.nodes.push(oscL, fL, gL, pL, oscR, fR, gR, pR)
  }

  private createFilteredVoice(freq: number, vol: number, filterFreq: number) {
    const osc = this.ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'; filter.frequency.value = filterFreq; filter.Q.value = 0.4
    const gain = this.ctx.createGain()
    gain.gain.value = vol
    osc.connect(filter); filter.connect(gain); gain.connect(this.destination)
    osc.start()
    this.nodes.push(osc, filter, gain)
  }
}
