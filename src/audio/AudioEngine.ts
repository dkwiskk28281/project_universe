import { DroneLayer } from './DroneLayer'
import { CosmicHumLayer } from './CosmicHumLayer'
import { PulsarLayer } from './PulsarLayer'

/**
 * Audio Engine — Stress-reducing cosmic soundscape.
 *
 * iOS Safari fix: all heavy work (reverb buffer) is deferred to
 * AFTER the AudioContext is running. Only the silent buffer unlock
 * and context.resume() happen in the gesture handler.
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

    try {
      const AC = (window as any).AudioContext || (window as any).webkitAudioContext
      if (!AC) return

      this.ctx = new AC()

      // iOS unlock: play silent buffer immediately
      const buf = this.ctx.createBuffer(1, 1, this.ctx.sampleRate)
      const src = this.ctx.createBufferSource()
      src.buffer = buf
      src.connect(this.ctx.destination)
      src.start(0)

      this.ctx.resume()

      // Master gain → destination (no reverb in gesture handler — too heavy)
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.value = 1.0
      this.masterGain.connect(this.ctx.destination)

      // Start audio layers immediately (they're lightweight)
      this.drone = new DroneLayer(this.ctx, this.masterGain)
      this.cosmicHum = new CosmicHumLayer(this.ctx, this.masterGain)
      this.pulsar = new PulsarLayer(this.ctx, this.masterGain)

      this.drone.start()
      this.cosmicHum.start()
      this.pulsar.start()
      this.addSolfeggioTone()

      this.initialized = true

      // Deferred: add reverb after 500ms (heavy computation off the gesture thread)
      setTimeout(() => this.addReverb(), 500)

      // Safety resume retries
      setTimeout(() => { if (this.ctx?.state === 'suspended') this.ctx.resume() }, 100)
      setTimeout(() => { if (this.ctx?.state === 'suspended') this.ctx.resume() }, 500)
      setTimeout(() => { if (this.ctx?.state === 'suspended') this.ctx.resume() }, 1500)
    } catch (e) {
      console.warn('[COSMOS] Audio init error:', e)
    }
  }

  private addReverb() {
    if (!this.ctx || !this.masterGain) return

    try {
      const convolver = this.ctx.createConvolver()
      const sampleRate = this.ctx.sampleRate
      const length = sampleRate * 6
      const buffer = this.ctx.createBuffer(2, length, sampleRate)

      for (let ch = 0; ch < 2; ch++) {
        const data = buffer.getChannelData(ch)
        for (let i = 0; i < length; i++) {
          const t = i / length
          data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 2.0) * 0.7
        }
      }

      convolver.buffer = buffer

      // Re-route: masterGain → dry + wet → destination
      this.masterGain.disconnect()

      const dryGain = this.ctx.createGain()
      dryGain.gain.value = 0.55
      const wetGain = this.ctx.createGain()
      wetGain.gain.value = 0.45

      this.masterGain.connect(dryGain)
      this.masterGain.connect(convolver)
      convolver.connect(wetGain)

      dryGain.connect(this.ctx.destination)
      wetGain.connect(this.ctx.destination)
    } catch (e) {
      // Reverb failed — audio still works without it
      console.warn('[COSMOS] Reverb init failed:', e)
    }
  }

  private addSolfeggioTone() {
    if (!this.ctx || !this.masterGain) return
    const osc = this.ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = 528
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 600
    filter.Q.value = 0.3
    const gain = this.ctx.createGain()
    gain.gain.value = 0.025
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.masterGain)
    osc.start()
  }

  setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.1)
    }
  }

  startEncounterAudio() {
    if (!this.ctx || !this.masterGain) return
    this.encounterGain = this.ctx.createGain()
    this.encounterGain.gain.value = 0
    this.encounterGain.connect(this.masterGain)
    const now = this.ctx.currentTime

    const osc1 = this.ctx.createOscillator()
    osc1.type = 'sine'; osc1.frequency.value = 528
    const f1 = this.ctx.createBiquadFilter()
    f1.type = 'lowpass'; f1.frequency.value = 700; f1.Q.value = 0.5
    osc1.connect(f1); f1.connect(this.encounterGain); osc1.start(now)

    const osc2 = this.ctx.createOscillator()
    osc2.type = 'sine'; osc2.frequency.value = 396 // Solfeggio liberation
    const g2 = this.ctx.createGain(); g2.gain.value = 0
    osc2.connect(g2); g2.connect(this.encounterGain); osc2.start(now)
    g2.gain.setTargetAtTime(0.3, now + 3, 6)

    const osc3 = this.ctx.createOscillator()
    osc3.type = 'sine'; osc3.frequency.value = 639 // Solfeggio connection
    const g3 = this.ctx.createGain(); g3.gain.value = 0
    osc3.connect(g3); g3.connect(this.encounterGain); osc3.start(now)
    g3.gain.setTargetAtTime(0.2, now + 8, 8)

    this.encounterGain.gain.setTargetAtTime(0.08, now, 5)
    this.encounterNodes = [osc1, osc2, osc3, f1, g2, g3]
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
      this.encounterNodes = []
      this.encounterGain = null
    }, 15000)
    this.pulsar?.setEncounterMode(false)
  }

  playMessageReceiveSound() {
    if (!this.ctx || !this.masterGain) return
    const now = this.ctx.currentTime
    const g = this.ctx.createGain(); g.gain.value = 0; g.connect(this.masterGain)
    const osc = this.ctx.createOscillator(); osc.type = 'sine'; osc.frequency.value = 528
    const f = this.ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 600; f.Q.value = 0.3
    osc.connect(f); f.connect(g); osc.start(now)
    g.gain.setTargetAtTime(0.03, now, 0.8)
    g.gain.setTargetAtTime(0, now + 3, 4)
    osc.stop(now + 15)
    setTimeout(() => g.disconnect(), 16000)
  }

  suspend() { this.ctx?.suspend() }
  resume() { if (this.ctx?.state === 'suspended') this.ctx.resume() }
  isInitialized(): boolean { return this.initialized }
}

export const AudioEngine = new AudioEngineClass()
