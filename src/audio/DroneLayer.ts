/**
 * Drone Layer — Organic Cosmic Pad (no mechanical sound)
 *
 * KEY FIX: Every oscillator has micro-pitch drift (±0.3% over 15-40s).
 * Pure sine waves at exact frequencies = test tone = "mechanical."
 * Adding slow random wobble makes it sound like a living instrument.
 *
 * Also: using triangle waves for some voices (richer harmonics than sine,
 * softer than sawtooth) and heavier filtering for warmth.
 */
export class DroneLayer {
  private nodes: AudioNode[] = []

  constructor(
    private ctx: AudioContext,
    private destination: AudioNode
  ) {}

  start() {
    const CMB = 272.5

    // Binaural pairs with organic pitch drift
    this.createOrganicBinaural(CMB, CMB + 10, 0.10, 380)
    this.createOrganicBinaural(CMB * 3 / 2, CMB * 3 / 2 + 10, 0.05, 480)

    // Warm voices — triangle waves for richer, more natural timbre
    this.createOrganicVoice(CMB / 2, 0.07, 240, 'triangle')
    this.createOrganicVoice(CMB * 5 / 4, 0.04, 420, 'triangle')

    // High shimmer — sine but with drift makes it ethereal, not electronic
    this.createOrganicVoice(CMB * 2, 0.018, 580, 'sine')
    this.createOrganicVoice(CMB * 2 + 0.3, 0.015, 580, 'sine')

    // Breathing LFO
    const breathLFO = this.ctx.createOscillator()
    breathLFO.type = 'sine'
    breathLFO.frequency.value = 0.1
    const breathDepth = this.ctx.createGain()
    breathDepth.gain.value = 0.012
    breathLFO.connect(breathDepth)
    if (this.destination instanceof GainNode) {
      breathDepth.connect((this.destination as GainNode).gain)
    }
    breathLFO.start()
    this.nodes.push(breathLFO, breathDepth)
  }

  private createOrganicBinaural(freqL: number, freqR: number, vol: number, cutoff: number) {
    // Left
    const oscL = this.ctx.createOscillator()
    oscL.type = 'sine'; oscL.frequency.value = freqL
    this.addPitchDrift(oscL, freqL)
    const fL = this.ctx.createBiquadFilter()
    fL.type = 'lowpass'; fL.frequency.value = cutoff; fL.Q.value = 0.3
    const gL = this.ctx.createGain(); gL.gain.value = vol
    const pL = this.ctx.createStereoPanner(); pL.pan.value = -1
    oscL.connect(fL); fL.connect(gL); gL.connect(pL); pL.connect(this.destination)
    oscL.start()

    // Right
    const oscR = this.ctx.createOscillator()
    oscR.type = 'sine'; oscR.frequency.value = freqR
    this.addPitchDrift(oscR, freqR)
    const fR = this.ctx.createBiquadFilter()
    fR.type = 'lowpass'; fR.frequency.value = cutoff; fR.Q.value = 0.3
    const gR = this.ctx.createGain(); gR.gain.value = vol
    const pR = this.ctx.createStereoPanner(); pR.pan.value = 1
    oscR.connect(fR); fR.connect(gR); gR.connect(pR); pR.connect(this.destination)
    oscR.start()

    this.nodes.push(oscL, fL, gL, pL, oscR, fR, gR, pR)
  }

  private createOrganicVoice(freq: number, vol: number, cutoff: number, type: OscillatorType) {
    const osc = this.ctx.createOscillator()
    osc.type = type; osc.frequency.value = freq
    this.addPitchDrift(osc, freq)

    // Double filter for extra warmth (24dB/oct rolloff)
    const f1 = this.ctx.createBiquadFilter()
    f1.type = 'lowpass'; f1.frequency.value = cutoff; f1.Q.value = 0.2
    const f2 = this.ctx.createBiquadFilter()
    f2.type = 'lowpass'; f2.frequency.value = cutoff * 0.8; f2.Q.value = 0.2

    const gain = this.ctx.createGain(); gain.gain.value = vol

    // Spatial autopanning
    const panner = this.ctx.createStereoPanner()
    const panLFO = this.ctx.createOscillator()
    panLFO.type = 'sine'
    panLFO.frequency.value = 1 / (25 + (freq % 40))
    const panDepth = this.ctx.createGain()
    panDepth.gain.value = 0.35
    panLFO.connect(panDepth)
    panDepth.connect(panner.pan)
    panLFO.start()

    osc.connect(f1); f1.connect(f2); f2.connect(gain)
    gain.connect(panner); panner.connect(this.destination)
    osc.start()

    this.nodes.push(osc, f1, f2, gain, panner, panLFO, panDepth)
  }

  /**
   * Micro-pitch drift — the secret to organic sound.
   * ±0.3% frequency wobble over 15-40 second cycles.
   * Makes sine waves sound like singing bowls instead of test tones.
   */
  private addPitchDrift(osc: OscillatorNode, baseFreq: number) {
    const driftLFO = this.ctx.createOscillator()
    driftLFO.type = 'sine'
    // Each voice drifts at a unique rate (15-40s period)
    driftLFO.frequency.value = 1 / (15 + (baseFreq % 25))
    const driftAmount = this.ctx.createGain()
    // ±0.3% of base frequency
    driftAmount.gain.value = baseFreq * 0.003
    driftLFO.connect(driftAmount)
    driftAmount.connect(osc.frequency)
    driftLFO.start()
    this.nodes.push(driftLFO, driftAmount)
  }
}
