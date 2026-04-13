import { DroneLayer } from './DroneLayer'
import { CosmicHumLayer } from './CosmicHumLayer'
import { PulsarLayer } from './PulsarLayer'

/**
 * Audio Engine — simplified for reliability.
 *
 * MUST be called from LoadingScreen's onClick handler DIRECTLY.
 * No indirection. onClick → init() → new AudioContext().
 *
 * iOS Safari rules:
 *   1. AudioContext must be created in user gesture call stack
 *   2. resume() must be called in same call stack
 *   3. No async/await before these calls
 *   4. The physical mute switch overrides everything (hardware)
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

    // Create AudioContext — MUST be synchronous, no try/catch wrapping the constructor
    const AC = (window as any).AudioContext || (window as any).webkitAudioContext
    if (!AC) return

    this.ctx = new AC()
    this.ctx.resume() // Must be in same call stack as user gesture

    // Master output
    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.value = 1.0
    this.masterGain.connect(this.ctx.destination)

    // Ultra-slow master volume drift (20 min cycle)
    // Prevents listener fatigue from constant volume.
    // Research: continuous same-level sound causes auditory adaptation.
    // Gentle ±8% variation keeps the brain engaged without alerting.
    const fatigueLFO = this.ctx.createOscillator()
    fatigueLFO.type = 'sine'
    fatigueLFO.frequency.value = 1 / (20 * 60) // 20 minute cycle
    const fatigueMod = this.ctx.createGain()
    fatigueMod.gain.value = 0.08
    fatigueLFO.connect(fatigueMod)
    fatigueMod.connect(this.masterGain.gain)
    fatigueLFO.start()

    // Start layers immediately
    this.drone = new DroneLayer(this.ctx, this.masterGain)
    this.cosmicHum = new CosmicHumLayer(this.ctx, this.masterGain)
    this.pulsar = new PulsarLayer(this.ctx, this.masterGain)

    this.drone.start()
    this.cosmicHum.start()
    this.pulsar.start()
    this.addSolfeggioTone()

    this.initialized = true

    // Reverb added after a delay (heavy computation)
    setTimeout(() => this.addReverb(), 500)

    // Resume retries for edge cases
    setTimeout(() => this.ctx?.state === 'suspended' && this.ctx.resume(), 200)
    setTimeout(() => this.ctx?.state === 'suspended' && this.ctx.resume(), 1000)
  }

  private addReverb() {
    if (!this.ctx || !this.masterGain) return
    try {
      const conv = this.ctx.createConvolver()
      const sr = this.ctx.sampleRate
      const len = sr * 6
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

    const o1 = this.ctx.createOscillator(); o1.type = 'sine'; o1.frequency.value = 528
    const f1 = this.ctx.createBiquadFilter(); f1.type = 'lowpass'; f1.frequency.value = 700; f1.Q.value = 0.5
    o1.connect(f1); f1.connect(this.encounterGain); o1.start(now)

    const o2 = this.ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = 396
    const g2 = this.ctx.createGain(); g2.gain.value = 0
    o2.connect(g2); g2.connect(this.encounterGain); o2.start(now)
    g2.gain.setTargetAtTime(0.3, now + 3, 6)

    this.encounterGain.gain.setTargetAtTime(0.08, now, 5)
    this.encounterNodes = [o1, o2, f1, g2]
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
