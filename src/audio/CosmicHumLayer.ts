/**
 * Cosmic Hum Layer — Interstellar Medium Plasma Sonification
 *
 * The interstellar medium (ISM) has a plasma frequency determined by
 * free electron density: f_p = 9√(n_e) kHz
 *
 * Typical ISM: n_e ≈ 0.03 cm⁻³ → f_p ≈ 1.56 kHz
 * Scaled to ambient range: filtered brown noise centered at ~160 Hz
 *
 * Brown noise spectrum (-6dB/octave) represents the turbulent
 * Kolmogorov cascade of interstellar gas — energy flows from
 * large scales to small scales following a power law.
 */
export class CosmicHumLayer {
  private noiseNode: AudioBufferSourceNode | null = null

  constructor(
    private ctx: AudioContext,
    private destination: AudioNode
  ) {}

  start() {
    // Generate brown noise: integrated white noise
    // Brown noise power spectrum ∝ 1/f² — matches Kolmogorov turbulence
    const bufferSize = this.ctx.sampleRate * 4
    const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate)

    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch)
      let lastOut = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        // Leaky integrator: creates 1/f² spectrum (brown noise)
        lastOut = (lastOut + 0.02 * white) / 1.02
        data[i] = lastOut * 3.5
      }
    }

    this.noiseNode = this.ctx.createBufferSource()
    this.noiseNode.buffer = buffer
    this.noiseNode.loop = true

    // Low pass: ISM plasma frequency scaled to ambient
    // f_p = 9√(0.03) ≈ 1.56 kHz → scaled ÷10 ≈ 156 Hz
    const lowPass = this.ctx.createBiquadFilter()
    lowPass.type = 'lowpass'
    lowPass.frequency.value = 200
    lowPass.Q.value = 1.0

    // Band pass: emphasize around plasma frequency
    const bandPass = this.ctx.createBiquadFilter()
    bandPass.type = 'bandpass'
    bandPass.frequency.value = 80
    bandPass.Q.value = 0.5

    const gain = this.ctx.createGain()
    gain.gain.value = 0.15

    this.noiseNode.connect(lowPass)
    lowPass.connect(bandPass)
    bandPass.connect(gain)
    gain.connect(this.destination)

    this.noiseNode.start()
  }
}
