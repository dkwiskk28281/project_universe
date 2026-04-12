import { DroneLayer } from './DroneLayer'
import { CosmicHumLayer } from './CosmicHumLayer'
import { PulsarLayer } from './PulsarLayer'

class AudioEngineClass {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private convolver: ConvolverNode | null = null
  private drone: DroneLayer | null = null
  private cosmicHum: CosmicHumLayer | null = null
  private pulsar: PulsarLayer | null = null
  private initialized = false

  // Encounter audio — multi-layered
  private encounterNodes: AudioNode[] = []
  private encounterGain: GainNode | null = null

  // Message receive audio
  private messageGain: GainNode | null = null

  async init(): Promise<void> {
    if (this.initialized) return

    this.ctx = new AudioContext()
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume()
    }

    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.value = 0.6

    // Create reverb
    this.convolver = this.ctx.createConvolver()
    this.convolver.buffer = this.createReverbImpulse(4, 3)

    // Dry/wet mix for reverb
    const dryGain = this.ctx.createGain()
    dryGain.gain.value = 0.7
    const wetGain = this.ctx.createGain()
    wetGain.gain.value = 0.3

    this.masterGain.connect(dryGain)
    this.masterGain.connect(this.convolver)
    this.convolver.connect(wetGain)

    dryGain.connect(this.ctx.destination)
    wetGain.connect(this.ctx.destination)

    // Init layers
    this.drone = new DroneLayer(this.ctx, this.masterGain)
    this.cosmicHum = new CosmicHumLayer(this.ctx, this.masterGain)
    this.pulsar = new PulsarLayer(this.ctx, this.masterGain)

    this.drone.start()
    this.cosmicHum.start()
    this.pulsar.start()

    this.initialized = true
  }

  private createReverbImpulse(duration: number, decay: number): AudioBuffer {
    const ctx = this.ctx!
    const sampleRate = ctx.sampleRate
    const length = sampleRate * duration
    const buffer = ctx.createBuffer(2, length, sampleRate)

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel)
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay)
      }
    }

    return buffer
  }

  setVolume(volume: number) {
    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(volume, this.ctx!.currentTime, 0.1)
    }
  }

  startEncounterAudio() {
    if (!this.ctx || !this.masterGain) return

    this.encounterGain = this.ctx.createGain()
    this.encounterGain.gain.value = 0
    this.encounterGain.connect(this.masterGain)

    const now = this.ctx.currentTime

    // Layer 1: Deep fundamental tone (528 Hz — "miracle" frequency)
    const osc1 = this.ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.value = 528
    const filter1 = this.ctx.createBiquadFilter()
    filter1.type = 'lowpass'
    filter1.frequency.value = 800
    filter1.Q.value = 2
    osc1.connect(filter1)
    filter1.connect(this.encounterGain)
    osc1.start(now)

    // Layer 2: Perfect fifth above — creates harmonic richness
    const osc2 = this.ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = 528 * 1.5 // 792 Hz
    const gain2 = this.ctx.createGain()
    gain2.gain.value = 0
    osc2.connect(gain2)
    gain2.connect(this.encounterGain)
    osc2.start(now)
    // Fade in the fifth slowly for dramatic build
    gain2.gain.setTargetAtTime(0.4, now + 5, 8)

    // Layer 3: Sub-octave — felt more than heard
    const osc3 = this.ctx.createOscillator()
    osc3.type = 'sine'
    osc3.frequency.value = 264 // octave below
    const gain3 = this.ctx.createGain()
    gain3.gain.value = 0
    const filter3 = this.ctx.createBiquadFilter()
    filter3.type = 'lowpass'
    filter3.frequency.value = 400
    osc3.connect(filter3)
    filter3.connect(gain3)
    gain3.connect(this.encounterGain)
    osc3.start(now)
    gain3.gain.setTargetAtTime(0.3, now + 2, 5)

    // Layer 4: Very slow shimmer — detuned high harmonic
    const osc4 = this.ctx.createOscillator()
    osc4.type = 'sine'
    osc4.frequency.value = 528 * 2.01 // Slightly detuned octave creates shimmer
    const gain4 = this.ctx.createGain()
    gain4.gain.value = 0
    osc4.connect(gain4)
    gain4.connect(this.encounterGain)
    osc4.start(now)
    gain4.gain.setTargetAtTime(0.15, now + 15, 10)

    // Master encounter fade in — very slow crescendo
    this.encounterGain.gain.setTargetAtTime(0.1, now, 6)

    this.encounterNodes = [osc1, osc2, osc3, osc4, filter1, gain2, gain3, gain4, filter3]

    // Increase pulsar rate
    this.pulsar?.setEncounterMode(true)
  }

  stopEncounterAudio() {
    if (!this.ctx || !this.encounterGain) return

    const now = this.ctx.currentTime

    // Very slow fade out — melancholic departure
    this.encounterGain.gain.setTargetAtTime(0, now, 4)

    // Cleanup after fade
    setTimeout(() => {
      for (const node of this.encounterNodes) {
        try {
          if (node instanceof OscillatorNode) node.stop()
          node.disconnect()
        } catch { /* already stopped */ }
      }
      this.encounterGain?.disconnect()
      this.encounterNodes = []
      this.encounterGain = null
    }, 15000)

    this.pulsar?.setEncounterMode(false)
  }

  /** Play a subtle tone when a cosmic message materializes */
  playMessageReceiveSound() {
    if (!this.ctx || !this.masterGain) return

    const now = this.ctx.currentTime

    this.messageGain = this.ctx.createGain()
    this.messageGain.gain.value = 0
    this.messageGain.connect(this.masterGain)

    // Gentle bell-like tone
    const osc = this.ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = 880

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 900
    filter.Q.value = 5

    osc.connect(filter)
    filter.connect(this.messageGain)
    osc.start(now)

    // Quick swell and long decay
    this.messageGain.gain.setTargetAtTime(0.04, now, 0.5)
    this.messageGain.gain.setTargetAtTime(0, now + 2, 3)

    osc.stop(now + 12)
    setTimeout(() => {
      this.messageGain?.disconnect()
      this.messageGain = null
    }, 13000)
  }

  suspend() {
    this.ctx?.suspend()
  }

  resume() {
    this.ctx?.resume()
  }

  isInitialized(): boolean {
    return this.initialized
  }
}

export const AudioEngine = new AudioEngineClass()
