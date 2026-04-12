/**
 * Cosmic Hum — Warm filtered noise, like distant cosmic wind.
 *
 * Designed to feel like an infinite ocean or wind through a cathedral.
 * Brown noise (Kolmogorov turbulence, 1/f²) filtered to warm 200-800 Hz.
 * Harsh frequencies above 1.2 kHz are removed.
 */
export class CosmicHumLayer {
  constructor(
    private ctx: AudioContext,
    private destination: AudioNode
  ) {}

  start() {
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

    const noise = this.ctx.createBufferSource()
    noise.buffer = buffer
    noise.loop = true

    // Warm band: 300 Hz center, wide Q
    const warmBand = this.ctx.createBiquadFilter()
    warmBand.type = 'bandpass'
    warmBand.frequency.value = 300
    warmBand.Q.value = 0.4

    // Airy presence: 800 Hz for spaciousness
    const airBand = this.ctx.createBiquadFilter()
    airBand.type = 'bandpass'
    airBand.frequency.value = 800
    airBand.Q.value = 0.6

    // Softener: cut everything above 1.2 kHz
    const softener = this.ctx.createBiquadFilter()
    softener.type = 'lowpass'
    softener.frequency.value = 1200
    softener.Q.value = 0.3

    const warmGain = this.ctx.createGain()
    warmGain.gain.value = 0.12

    const airGain = this.ctx.createGain()
    airGain.gain.value = 0.04

    noise.connect(warmBand)
    noise.connect(airBand)

    warmBand.connect(softener)
    softener.connect(warmGain)
    warmGain.connect(this.destination)

    airBand.connect(airGain)
    airGain.connect(this.destination)

    noise.start()
  }
}
