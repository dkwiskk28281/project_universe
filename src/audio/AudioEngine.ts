import { DroneLayer } from './DroneLayer'
import { CosmicHumLayer } from './CosmicHumLayer'
import { PulsarLayer } from './PulsarLayer'

/**
 * Audio Engine — iOS-proof cosmic soundscape.
 *
 * Uses THREE unlock methods simultaneously:
 *   1. HTML5 <audio> element with silent data URI (forces iOS playback mode)
 *   2. Web Audio silent buffer trick
 *   3. AudioContext.resume()
 *
 * The HTML5 <audio> trick is what makes iOS work even in silent mode
 * on some versions — it switches the audio session to "playback" category.
 */

// Tiny silent MP3 as base64 data URI — plays via HTML5 <audio> to unlock iOS
const SILENT_MP3 = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABhgC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAAYYoRwMHAAAAAAD/+1DEAAAHAAGf9AAAIiSAM/8xIRBAEAwD4Pg+BAMBgfB9/ygIAgGD7/lAQBAEAQfB8HwfB8HwfB9/ygfB8H3/KAgCAIPg+D4Pg+D7/8oCAIBg+/5QEAQBAEHwfB8HwfB8H3/5QPg+D4Pv+UBAEAwfB8HwfB8H3/KAgCAYP/+1DEMoAQAAGf+AAAAAANIN/8AAAB8HwfB8HwfB8H3/KB8HwfB9/ygIAgGD4Pg+D4Pg+D7/8oHwfB8H3/KAgCAYPg+D4Pg+D4Pv/ygIAgGD7/lAQBAEAQfB8HwfB8HwfB9/+UBAMAwff8oCAIAgCD4Pg+D4Pg+D7/lA+D4Pg+/5QEAQDB8HwfB8Hwff/lA'

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
      // === Method 1: HTML5 <audio> element unlock ===
      // This forces iOS into "playback" audio session mode
      const audio = document.createElement('audio')
      audio.src = SILENT_MP3
      audio.preload = 'auto'
      audio.setAttribute('playsinline', '')
      audio.play().catch(() => {})

      // === Method 2: Web Audio API ===
      const AC = (window as any).AudioContext || (window as any).webkitAudioContext
      if (!AC) return

      this.ctx = new AC()

      // Method 3: silent buffer
      const buf = this.ctx.createBuffer(1, 1, this.ctx.sampleRate)
      const src = this.ctx.createBufferSource()
      src.buffer = buf
      src.connect(this.ctx.destination)
      src.start(0)

      // Method 4: explicit resume
      this.ctx.resume()

      // Master output
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.value = 1.0
      this.masterGain.connect(this.ctx.destination)

      // Start audio layers
      this.drone = new DroneLayer(this.ctx, this.masterGain)
      this.cosmicHum = new CosmicHumLayer(this.ctx, this.masterGain)
      this.pulsar = new PulsarLayer(this.ctx, this.masterGain)

      this.drone.start()
      this.cosmicHum.start()
      this.pulsar.start()
      this.addSolfeggioTone()

      this.initialized = true

      // Deferred reverb (heavy computation off gesture thread)
      setTimeout(() => this.addReverb(), 500)

      // Aggressive resume retries
      const retryResume = () => {
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume()
        }
      }
      setTimeout(retryResume, 100)
      setTimeout(retryResume, 300)
      setTimeout(retryResume, 800)
      setTimeout(retryResume, 2000)
    } catch (e) {
      console.warn('[COSMOS] Audio error:', e)
    }
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
    } catch {}
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

    const o3 = this.ctx.createOscillator(); o3.type = 'sine'; o3.frequency.value = 639
    const g3 = this.ctx.createGain(); g3.gain.value = 0
    o3.connect(g3); g3.connect(this.encounterGain); o3.start(now)
    g3.gain.setTargetAtTime(0.2, now + 8, 8)

    this.encounterGain.gain.setTargetAtTime(0.08, now, 5)
    this.encounterNodes = [o1, o2, o3, f1, g2, g3]
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
