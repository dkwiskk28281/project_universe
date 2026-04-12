import { AUDIO } from '../utils/constants'

export class DroneLayer {
  private oscillators: OscillatorNode[] = []
  private gains: GainNode[] = []
  private lfo: OscillatorNode | null = null

  constructor(
    private ctx: AudioContext,
    private destination: AudioNode
  ) {}

  start() {
    const [freq1, freq2, freq3, freq4] = AUDIO.droneFrequencies

    // Fundamental - deep sine
    this.createOsc(freq1, 'sine', 0.12)

    // Detuned - creates beat frequency
    this.createOsc(freq2, 'sine', 0.10)

    // Body - triangle octave
    this.createOsc(freq3, 'triangle', 0.04)

    // Fifth - modulated
    const fifthGain = this.createOsc(freq4, 'sine', 0.06)

    // LFO for the fifth
    this.lfo = this.ctx.createOscillator()
    this.lfo.type = 'sine'
    this.lfo.frequency.value = 0.016 // ~60 second cycle
    const lfoGain = this.ctx.createGain()
    lfoGain.gain.value = 0.04
    this.lfo.connect(lfoGain)
    lfoGain.connect(fifthGain.gain)
    this.lfo.start()
  }

  private createOsc(frequency: number, type: OscillatorType, volume: number): GainNode {
    const osc = this.ctx.createOscillator()
    osc.type = type
    osc.frequency.value = frequency

    const gain = this.ctx.createGain()
    gain.gain.value = volume

    osc.connect(gain)
    gain.connect(this.destination)
    osc.start()

    this.oscillators.push(osc)
    this.gains.push(gain)

    return gain
  }
}
