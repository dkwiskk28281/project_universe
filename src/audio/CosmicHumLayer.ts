/**
 * Cosmic Hum Layer — Interstellar Medium Plasma Sonification
 *
 * Brown noise (Kolmogorov turbulence cascade, power ∝ 1/f²)
 * filtered through two parallel bands:
 *
 *   Band 1: Deep rumble (80 Hz, for headphones/speakers)
 *   Band 2: Mid presence (300 Hz, audible on all devices including phones)
 *
 * Plus a subtle high-frequency hiss (1.56 kHz — actual ISM plasma frequency)
 * representing the thin ionized gas of interstellar space.
 */
export class CosmicHumLayer {
  constructor(
    private ctx: AudioContext,
    private destination: AudioNode
  ) {}

  start() {
    // Brown noise buffer
    const bufferSize = this.ctx.sampleRate * 4
    const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate)

    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch)
      let lastOut = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        lastOut = (lastOut + 0.02 * white) / 1.02
        data[i] = lastOut * 3.5
      }
    }

    const noiseNode = this.ctx.createBufferSource()
    noiseNode.buffer = buffer
    noiseNode.loop = true

    // === Band 1: Deep rumble (headphones/speakers) ===
    const deepBand = this.ctx.createBiquadFilter()
    deepBand.type = 'bandpass'
    deepBand.frequency.value = 80
    deepBand.Q.value = 0.5
    const deepGain = this.ctx.createGain()
    deepGain.gain.value = 0.3

    // === Band 2: Mid presence (audible on phone speakers) ===
    const midBand = this.ctx.createBiquadFilter()
    midBand.type = 'bandpass'
    midBand.frequency.value = 300
    midBand.Q.value = 0.8
    const midGain = this.ctx.createGain()
    midGain.gain.value = 0.25

    // === Band 3: ISM plasma hiss (1.56 kHz) ===
    const plasmaBand = this.ctx.createBiquadFilter()
    plasmaBand.type = 'bandpass'
    plasmaBand.frequency.value = 1560
    plasmaBand.Q.value = 3
    const plasmaGain = this.ctx.createGain()
    plasmaGain.gain.value = 0.04

    // Route noise to all three bands in parallel
    noiseNode.connect(deepBand)
    noiseNode.connect(midBand)
    noiseNode.connect(plasmaBand)

    deepBand.connect(deepGain)
    midBand.connect(midGain)
    plasmaBand.connect(plasmaGain)

    deepGain.connect(this.destination)
    midGain.connect(this.destination)
    plasmaGain.connect(this.destination)

    noiseNode.start()
  }
}
