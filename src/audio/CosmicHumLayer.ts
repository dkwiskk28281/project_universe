/**
 * Cosmic Hum — Gentle cosmic ocean using pink noise (1/f spectrum).
 *
 * Pink noise appears everywhere in nature: stellar luminosity,
 * cosmic ray flux, quasar emissions. More balanced and pleasant
 * than brown noise for extended listening.
 *
 * Filtered to 250-900 Hz warm cocoon — like floating in warm water.
 */
export class CosmicHumLayer {
  constructor(
    private ctx: AudioContext,
    private destination: AudioNode
  ) {}

  start() {
    const bufferSize = this.ctx.sampleRate * 6
    const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate)

    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch)
      // Voss-McCartney pink noise (1/f spectrum)
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        b0 = 0.99886 * b0 + white * 0.0555179
        b1 = 0.99332 * b1 + white * 0.0750759
        b2 = 0.96900 * b2 + white * 0.1538520
        b3 = 0.86650 * b3 + white * 0.3104856
        b4 = 0.55000 * b4 + white * 0.5329522
        b5 = -0.7616 * b5 - white * 0.0168980
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11
        b6 = white * 0.115926
      }
    }

    const noise = this.ctx.createBufferSource()
    noise.buffer = buffer
    noise.loop = true

    // Warm cocoon: 250-600 Hz
    const warmFilter = this.ctx.createBiquadFilter()
    warmFilter.type = 'bandpass'
    warmFilter.frequency.value = 350
    warmFilter.Q.value = 0.3

    // Soft ceiling: nothing above 900 Hz
    const ceiling = this.ctx.createBiquadFilter()
    ceiling.type = 'lowpass'
    ceiling.frequency.value = 900
    ceiling.Q.value = 0.2

    const gain = this.ctx.createGain()
    gain.gain.value = 0.18

    noise.connect(warmFilter)
    warmFilter.connect(ceiling)
    ceiling.connect(gain)
    gain.connect(this.destination)

    noise.start()
  }
}
