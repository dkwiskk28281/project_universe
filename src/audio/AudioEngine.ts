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
  private encounterOsc: OscillatorNode | null = null
  private encounterGain: GainNode | null = null

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

    this.encounterOsc = this.ctx.createOscillator()
    this.encounterOsc.type = 'sine'
    this.encounterOsc.frequency.value = 528

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 800
    filter.Q.value = 2

    this.encounterOsc.connect(filter)
    filter.connect(this.encounterGain)
    this.encounterOsc.start()

    // Fade in
    this.encounterGain.gain.setTargetAtTime(0.08, this.ctx.currentTime, 3)

    // Increase pulsar rate
    this.pulsar?.setEncounterMode(true)
  }

  stopEncounterAudio() {
    if (!this.ctx || !this.encounterGain) return

    const now = this.ctx.currentTime
    this.encounterGain.gain.setTargetAtTime(0, now, 2)

    // Cleanup after fade out
    setTimeout(() => {
      this.encounterOsc?.stop()
      this.encounterOsc?.disconnect()
      this.encounterGain?.disconnect()
      this.encounterOsc = null
      this.encounterGain = null
    }, 8000)

    this.pulsar?.setEncounterMode(false)
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
