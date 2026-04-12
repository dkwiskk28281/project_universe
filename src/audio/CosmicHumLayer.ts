/**
 * Cosmic Hum — Pink Noise Foundation (Primary Sound Layer)
 *
 * Pink noise is the ONLY sound scientifically proven to:
 *   1. Improve deep sleep quality (Frontiers in Human Neuroscience, 2017)
 *   2. Enhance memory consolidation during sleep (Northwestern, 2017)
 *   3. Improve sustained attention/focus (J. of Theoretical Biology, 2012)
 *
 * Physics: 1/f noise is ubiquitous in nature — stellar luminosity
 * fluctuations, neural firing patterns, heartbeat intervals,
 * ocean waves. The brain recognizes it as "natural" and calms.
 *
 * This layer is the LOUDEST — it's the blanket everything else
 * rests on. Warm filtered to 200-1000 Hz sweet spot.
 */
export class CosmicHumLayer {
  constructor(
    private ctx: AudioContext,
    private destination: AudioNode
  ) {}

  start() {
    const bufferSize = this.ctx.sampleRate * 8 // Longer buffer = less repetition
    const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate)

    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch)
      // Voss-McCartney pink noise (true 1/f spectrum)
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

    // Warm bandpass: 200-1000 Hz — the "comfort zone" of human hearing
    const warmFilter = this.ctx.createBiquadFilter()
    warmFilter.type = 'bandpass'
    warmFilter.frequency.value = 400 // Center
    warmFilter.Q.value = 0.25 // Very wide — covers 200-1000 Hz

    // Gentle rolloff above 1 kHz — nothing piercing
    const ceiling = this.ctx.createBiquadFilter()
    ceiling.type = 'lowpass'
    ceiling.frequency.value = 1000
    ceiling.Q.value = 0.2

    // This is the PRIMARY sound — louder than the drone
    const gain = this.ctx.createGain()
    gain.gain.value = 0.28

    noise.connect(warmFilter)
    warmFilter.connect(ceiling)
    ceiling.connect(gain)
    gain.connect(this.destination)

    noise.start()
  }
}
