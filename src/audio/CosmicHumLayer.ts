/**
 * Cosmic Ocean — Nature-shaped pink noise.
 *
 * DUAL BENEFIT: combines two proven stress interventions:
 *
 * 1. Pink noise (1/f) — sleep + focus (Northwestern 2017)
 * 2. Nature sound characteristics — reduces sympathetic nervous
 *    system activation by 2× vs artificial sounds (Buxton, PNAS 2021)
 *
 * The trick: shape pink noise with ultra-slow amplitude modulation
 * (8-12 second cycles) to create an ocean-wave-like rhythm.
 * The brain perceives this as "natural" even though it's synthesized.
 *
 * Additional: stereo decorrelation creates spatial width — the
 * sound fills the space around you like being near the ocean.
 */
export class CosmicHumLayer {
  constructor(
    private ctx: AudioContext,
    private destination: AudioNode
  ) {}

  start() {
    // Generate two DIFFERENT pink noise buffers for L and R channels
    // (decorrelated stereo = spatial width = more immersive)
    const bufferSize = this.ctx.sampleRate * 8

    const noiseL = this.createPinkNoise(bufferSize, 42)
    const noiseR = this.createPinkNoise(bufferSize, 137)

    const sourceL = this.ctx.createBufferSource()
    sourceL.buffer = noiseL
    sourceL.loop = true

    const sourceR = this.ctx.createBufferSource()
    sourceR.buffer = noiseR
    sourceR.loop = true

    // === Wave-like amplitude modulation ===
    // 8-12 second cycles mimic ocean waves
    // This is what makes it "nature-like" (Buxton PNAS 2021)

    // Left channel wave (10s cycle)
    const waveLFO_L = this.ctx.createOscillator()
    waveLFO_L.type = 'sine'
    waveLFO_L.frequency.value = 1 / 10 // 10-second wave
    const waveDepth_L = this.ctx.createGain()
    waveDepth_L.gain.value = 0.04 // Subtle ±4% modulation

    // Right channel wave (8.3s cycle — different to avoid phase lock)
    const waveLFO_R = this.ctx.createOscillator()
    waveLFO_R.type = 'sine'
    waveLFO_R.frequency.value = 1 / 8.3
    const waveDepth_R = this.ctx.createGain()
    waveDepth_R.gain.value = 0.04

    // Warm filter
    const filterL = this.ctx.createBiquadFilter()
    filterL.type = 'bandpass'; filterL.frequency.value = 400; filterL.Q.value = 0.25
    const filterR = this.ctx.createBiquadFilter()
    filterR.type = 'bandpass'; filterR.frequency.value = 400; filterR.Q.value = 0.25

    // Ceiling
    const ceilingL = this.ctx.createBiquadFilter()
    ceilingL.type = 'lowpass'; ceilingL.frequency.value = 1000; ceilingL.Q.value = 0.2
    const ceilingR = this.ctx.createBiquadFilter()
    ceilingR.type = 'lowpass'; ceilingR.frequency.value = 1000; ceilingR.Q.value = 0.2

    // Gains with wave modulation
    const gainL = this.ctx.createGain()
    gainL.gain.value = 0.14
    const gainR = this.ctx.createGain()
    gainR.gain.value = 0.14

    // Wire wave LFOs to gain modulation
    waveLFO_L.connect(waveDepth_L)
    waveDepth_L.connect(gainL.gain)
    waveLFO_R.connect(waveDepth_R)
    waveDepth_R.connect(gainR.gain)

    // Stereo panning
    const panL = this.ctx.createStereoPanner()
    panL.pan.value = -0.7
    const panR = this.ctx.createStereoPanner()
    panR.pan.value = 0.7

    // Route
    sourceL.connect(filterL); filterL.connect(ceilingL); ceilingL.connect(gainL); gainL.connect(panL); panL.connect(this.destination)
    sourceR.connect(filterR); filterR.connect(ceilingR); ceilingR.connect(gainR); gainR.connect(panR); panR.connect(this.destination)

    sourceL.start()
    sourceR.start()
    waveLFO_L.start()
    waveLFO_R.start()
  }

  private createPinkNoise(length: number, seed: number): AudioBuffer {
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)

    // Voss-McCartney with seeded random
    let s = seed
    const rng = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff * 2 - 1 }

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
    for (let i = 0; i < length; i++) {
      const white = rng()
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      b3 = 0.86650 * b3 + white * 0.3104856
      b4 = 0.55000 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.0168980
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11
      b6 = white * 0.115926
    }

    return buffer
  }
}
