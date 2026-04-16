export class CosmicHumLayer {
  private noiseNode: AudioBufferSourceNode | null = null
  private nodes: AudioNode[] = []

  constructor(
    private ctx: AudioContext,
    private destination: AudioNode
  ) {}

  start() {
    // Generate brown noise buffer
    const bufferSize = this.ctx.sampleRate * 4 // 4 seconds, looped
    const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate)

    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch)
      let lastOut = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        // Brown noise: integrate white noise
        lastOut = (lastOut + 0.02 * white) / 1.02
        data[i] = lastOut * 3.5
      }
    }

    this.noiseNode = this.ctx.createBufferSource()
    this.noiseNode.buffer = buffer
    this.noiseNode.loop = true

    // Low pass filter
    const lowPass = this.ctx.createBiquadFilter()
    lowPass.type = 'lowpass'
    lowPass.frequency.value = 200
    lowPass.Q.value = 1.0

    // Band pass for deep rumble emphasis
    const bandPass = this.ctx.createBiquadFilter()
    bandPass.type = 'bandpass'
    bandPass.frequency.value = 80
    bandPass.Q.value = 0.5

    // Volume
    const gain = this.ctx.createGain()
    gain.gain.value = 0.15

    this.noiseNode.connect(lowPass)
    lowPass.connect(bandPass)
    bandPass.connect(gain)
    gain.connect(this.destination)

    this.nodes = [lowPass, bandPass, gain]

    this.noiseNode.start()
  }

  stop() {
    if (this.noiseNode) {
      try {
        this.noiseNode.stop()
      } catch {
        // Already stopped
      }
      this.noiseNode.disconnect()
      this.noiseNode = null
    }
    for (const node of this.nodes) {
      node.disconnect()
    }
    this.nodes = []
  }
}
