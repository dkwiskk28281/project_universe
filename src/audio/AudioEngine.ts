import { DroneLayer } from './DroneLayer'
import { CosmicHumLayer } from './CosmicHumLayer'
import { PulsarLayer } from './PulsarLayer'

/**
 * Audio Engine — Cinematic cosmic soundscape.
 *
 * UX design:
 *   1. Entry: dramatic warp sweep sound
 *   2. Build-up: all layers fade in over 15 seconds (not instant)
 *   3. Steady state: ambient pad with spatial autopanning
 *   4. Anti-fatigue: 20-minute volume drift
 */
class AudioEngineClass {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private drone: DroneLayer | null = null
  private cosmicHum: CosmicHumLayer | null = null
  private pulsar: PulsarLayer | null = null
  private initialized = false
  private encounterNodes: AudioNode[] = []
  private encounterGain: GainNode | null = null

  init(): void {
    if (this.initialized) return

    const AC = (window as any).AudioContext || (window as any).webkitAudioContext
    if (!AC) return

    this.ctx = new AC()
    this.ctx.resume()

    // Master output — starts at ZERO, builds up over 15 seconds
    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.value = 0 // Start silent

    // === SAFETY: Volume limiter + ear fatigue prevention ===
    // WHO: 85dB+ for 8 hours = hearing damage risk
    // DynamicsCompressor acts as a limiter — prevents clipping
    // and ensures output never exceeds safe levels
    const limiter = this.ctx.createDynamicsCompressor()
    limiter.threshold.value = -6  // Start compressing at -6dB
    limiter.knee.value = 6        // Soft knee for natural sound
    limiter.ratio.value = 12      // Heavy limiting above threshold
    limiter.attack.value = 0.003  // Fast attack to catch peaks
    limiter.release.value = 0.1   // Smooth release

    // High-frequency rolloff — 2-4kHz causes ear fatigue
    // Cut everything above 2kHz gently
    const safetyFilter = this.ctx.createBiquadFilter()
    safetyFilter.type = 'lowpass'
    safetyFilter.frequency.value = 2000
    safetyFilter.Q.value = 0.2 // Very gentle slope

    this.masterGain.connect(safetyFilter)
    safetyFilter.connect(limiter)
    limiter.connect(this.ctx.destination)

    const now = this.ctx.currentTime

    // === CINEMATIC ENTRY: Warp sweep sound ===
    this.playWarpEntry(now)

    // === GRADUAL BUILD-UP: 15 seconds from silence to full ===
    this.masterGain.gain.setValueAtTime(0, now)
    this.masterGain.gain.linearRampToValueAtTime(0.3, now + 3)   // First hint of sound
    this.masterGain.gain.linearRampToValueAtTime(0.7, now + 8)   // Building
    this.masterGain.gain.linearRampToValueAtTime(1.0, now + 15)  // Full volume

    // Anti-fatigue: 20-min volume drift ±8%
    const fatigueLFO = this.ctx.createOscillator()
    fatigueLFO.type = 'sine'
    fatigueLFO.frequency.value = 1 / (20 * 60)
    const fatigueMod = this.ctx.createGain()
    fatigueMod.gain.value = 0.08
    fatigueLFO.connect(fatigueMod)
    fatigueMod.connect(this.masterGain.gain)
    fatigueLFO.start(now + 15) // Start after build-up completes

    // Start ambient layers
    this.drone = new DroneLayer(this.ctx, this.masterGain)
    this.cosmicHum = new CosmicHumLayer(this.ctx, this.masterGain)
    this.pulsar = new PulsarLayer(this.ctx, this.masterGain)

    this.drone.start()
    this.cosmicHum.start()
    // Delay pulsars — let pad establish first
    setTimeout(() => this.pulsar?.start(), 8000)

    this.addSolfeggioTone()
    this.initialized = true

    // Deferred reverb
    setTimeout(() => this.addReverb(), 500)
    setTimeout(() => this.ctx?.state === 'suspended' && this.ctx.resume(), 200)
    setTimeout(() => this.ctx?.state === 'suspended' && this.ctx.resume(), 1000)
  }

  /**
   * Cinematic warp entry — a rising sweep that feels like
   * being pulled into the cosmos. Plays during the visual warp effect.
   */
  private playWarpEntry(now: number) {
    if (!this.ctx) return

    // Layer 1: Deep rising sweep (80 Hz → 400 Hz over 2 seconds)
    const sweep = this.ctx.createOscillator()
    sweep.type = 'sine'
    sweep.frequency.setValueAtTime(80, now)
    sweep.frequency.exponentialRampToValueAtTime(400, now + 2)
    sweep.frequency.exponentialRampToValueAtTime(272.5, now + 3) // Settle on CMB root

    const sweepGain = this.ctx.createGain()
    sweepGain.gain.setValueAtTime(0, now)
    sweepGain.gain.linearRampToValueAtTime(0.25, now + 0.5)
    sweepGain.gain.linearRampToValueAtTime(0.15, now + 2)
    sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 5)

    const sweepFilter = this.ctx.createBiquadFilter()
    sweepFilter.type = 'lowpass'
    sweepFilter.frequency.setValueAtTime(200, now)
    sweepFilter.frequency.exponentialRampToValueAtTime(2000, now + 2)
    sweepFilter.frequency.exponentialRampToValueAtTime(500, now + 4)

    sweep.connect(sweepFilter)
    sweepFilter.connect(sweepGain)
    sweepGain.connect(this.ctx.destination) // Bypass masterGain (which is at 0)
    sweep.start(now)
    sweep.stop(now + 5)

    // Layer 2: Sub-bass impact (felt more than heard)
    const sub = this.ctx.createOscillator()
    sub.type = 'sine'
    sub.frequency.value = 40
    const subGain = this.ctx.createGain()
    subGain.gain.setValueAtTime(0, now)
    subGain.gain.linearRampToValueAtTime(0.3, now + 0.3)
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 3)
    sub.connect(subGain)
    subGain.connect(this.ctx.destination)
    sub.start(now)
    sub.stop(now + 3)

    // Layer 3: Harmonic shimmer (high ethereal wash)
    const shimmer = this.ctx.createOscillator()
    shimmer.type = 'sine'
    shimmer.frequency.setValueAtTime(800, now + 1)
    shimmer.frequency.exponentialRampToValueAtTime(545, now + 3) // CMB octave
    const shimmerGain = this.ctx.createGain()
    shimmerGain.gain.setValueAtTime(0, now)
    shimmerGain.gain.linearRampToValueAtTime(0.06, now + 1.5)
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 6)
    const shimmerFilter = this.ctx.createBiquadFilter()
    shimmerFilter.type = 'lowpass'
    shimmerFilter.frequency.value = 1200
    shimmer.connect(shimmerFilter)
    shimmerFilter.connect(shimmerGain)
    shimmerGain.connect(this.ctx.destination)
    shimmer.start(now + 0.5)
    shimmer.stop(now + 6)

    // Layer 4: Noise whoosh (wind-like warp rush)
    const noiseLen = this.ctx.sampleRate * 3
    const noiseBuf = this.ctx.createBuffer(2, noiseLen, this.ctx.sampleRate)
    for (let ch = 0; ch < 2; ch++) {
      const d = noiseBuf.getChannelData(ch)
      let last = 0
      for (let i = 0; i < noiseLen; i++) {
        last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02
        d[i] = last * 3
      }
    }
    const noise = this.ctx.createBufferSource()
    noise.buffer = noiseBuf
    const noiseGain = this.ctx.createGain()
    noiseGain.gain.setValueAtTime(0, now)
    noiseGain.gain.linearRampToValueAtTime(0.12, now + 0.8)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 3)
    const noiseBand = this.ctx.createBiquadFilter()
    noiseBand.type = 'bandpass'
    noiseBand.frequency.setValueAtTime(200, now)
    noiseBand.frequency.exponentialRampToValueAtTime(800, now + 1.5)
    noiseBand.frequency.exponentialRampToValueAtTime(300, now + 3)
    noiseBand.Q.value = 0.5
    noise.connect(noiseBand)
    noiseBand.connect(noiseGain)
    noiseGain.connect(this.ctx.destination)
    noise.start(now)
  }

  private addReverb() {
    if (!this.ctx || !this.masterGain) return
    try {
      const conv = this.ctx.createConvolver()
      const sr = this.ctx.sampleRate, len = sr * 6
      const buf = this.ctx.createBuffer(2, len, sr)
      for (let ch = 0; ch < 2; ch++) {
        const d = buf.getChannelData(ch)
        for (let i = 0; i < len; i++) {
          d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2) * 0.6
        }
      }
      conv.buffer = buf
      this.masterGain.disconnect()
      const dry = this.ctx.createGain(); dry.gain.value = 0.55
      const wet = this.ctx.createGain(); wet.gain.value = 0.45
      this.masterGain.connect(dry)
      this.masterGain.connect(conv)
      conv.connect(wet)
      dry.connect(this.ctx.destination)
      wet.connect(this.ctx.destination)
    } catch { /* reverb optional */ }
  }

  private addSolfeggioTone() {
    if (!this.ctx || !this.masterGain) return
    const osc = this.ctx.createOscillator()
    osc.type = 'sine'; osc.frequency.value = 528
    const f = this.ctx.createBiquadFilter()
    f.type = 'lowpass'; f.frequency.value = 600; f.Q.value = 0.3
    const g = this.ctx.createGain(); g.gain.value = 0.025
    osc.connect(f); f.connect(g); g.connect(this.masterGain); osc.start()
  }

  setVolume(v: number) {
    if (this.masterGain && this.ctx)
      this.masterGain.gain.setTargetAtTime(v, this.ctx.currentTime, 0.1)
  }

  startEncounterAudio() {
    if (!this.ctx || !this.masterGain) return
    this.encounterGain = this.ctx.createGain()
    this.encounterGain.gain.value = 0
    this.encounterGain.connect(this.masterGain)
    const now = this.ctx.currentTime

    // Solfeggio chord: 528 + 396 + 639 Hz (love + liberation + connection)
    const freqs = [528, 396, 639]
    freqs.forEach((freq, i) => {
      const o = this.ctx!.createOscillator(); o.type = 'sine'; o.frequency.value = freq
      const f = this.ctx!.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = freq * 1.3; f.Q.value = 0.3
      const g = this.ctx!.createGain(); g.gain.value = 0
      o.connect(f); f.connect(g); g.connect(this.encounterGain!); o.start(now)
      g.gain.setTargetAtTime(0.3 - i * 0.08, now + 2 + i * 3, 5)
      this.encounterNodes.push(o, f, g)
    })

    this.encounterGain.gain.setTargetAtTime(0.08, now, 5)
    this.pulsar?.setEncounterMode(true)
  }

  stopEncounterAudio() {
    if (!this.ctx || !this.encounterGain) return
    this.encounterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 4)
    setTimeout(() => {
      for (const n of this.encounterNodes) {
        try { if (n instanceof OscillatorNode) n.stop(); n.disconnect() } catch {}
      }
      this.encounterGain?.disconnect()
      this.encounterNodes = []; this.encounterGain = null
    }, 15000)
    this.pulsar?.setEncounterMode(false)
  }

  playMessageReceiveSound() {
    if (!this.ctx || !this.masterGain) return
    const now = this.ctx.currentTime
    const g = this.ctx.createGain(); g.gain.value = 0; g.connect(this.masterGain)
    const o = this.ctx.createOscillator(); o.type = 'sine'; o.frequency.value = 528
    const f = this.ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 600; f.Q.value = 0.3
    o.connect(f); f.connect(g); o.start(now)
    g.gain.setTargetAtTime(0.03, now, 0.8)
    g.gain.setTargetAtTime(0, now + 3, 4)
    o.stop(now + 15)
    setTimeout(() => g.disconnect(), 16000)
  }

  suspend() { this.ctx?.suspend() }
  resume() { if (this.ctx?.state === 'suspended') this.ctx.resume() }
  isInitialized(): boolean { return this.initialized }
}

export const AudioEngine = new AudioEngineClass()
