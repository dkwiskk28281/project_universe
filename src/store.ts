import { create } from 'zustand'
import { type QualityLevel, QUALITY_PRESETS } from './utils/constants'
import { detectQualityLevel } from './utils/deviceProfile'
import { type LocalFrequencyLink, type CosmicMessageData } from './encounter/encounterTypes'

interface CosmosState {
  quality: QualityLevel
  qualityPreset: (typeof QUALITY_PRESETS)[QualityLevel]
  volume: number
  audioReady: boolean
  started: boolean

  // Encounter
  encounterActive: boolean
  encounterProgress: number
  onlineCount: number

  // Frequency links & communication
  frequencyLinks: LocalFrequencyLink[]
  activeLink: LocalFrequencyLink | null
  incomingMessages: CosmicMessageData[]
  composeOpen: boolean
  // Message that just arrived and is materializing
  materializingMessage: CosmicMessageData | null

  setQuality: (level: QualityLevel) => void
  setVolume: (v: number) => void
  setAudioReady: (ready: boolean) => void
  setStarted: (s: boolean) => void
  setEncounterActive: (active: boolean) => void
  setEncounterProgress: (progress: number) => void
  setOnlineCount: (count: number) => void
  setFrequencyLinks: (links: LocalFrequencyLink[]) => void
  setActiveLink: (link: LocalFrequencyLink | null) => void
  addIncomingMessage: (msg: CosmicMessageData) => void
  setComposeOpen: (open: boolean) => void
  setMaterializingMessage: (msg: CosmicMessageData | null) => void
}

const initialQuality = detectQualityLevel()

export const useCosmosStore = create<CosmosState>((set) => ({
  quality: initialQuality,
  qualityPreset: QUALITY_PRESETS[initialQuality],
  volume: 0.6,
  audioReady: false,
  started: false,

  encounterActive: false,
  encounterProgress: 0,
  onlineCount: 0,

  frequencyLinks: [],
  activeLink: null,
  incomingMessages: [],
  composeOpen: false,
  materializingMessage: null,

  setQuality: (level) =>
    set({ quality: level, qualityPreset: QUALITY_PRESETS[level] }),
  setVolume: (v) => set({ volume: v }),
  setAudioReady: (ready) => set({ audioReady: ready }),
  setStarted: (s) => set({ started: s }),
  setEncounterActive: (active) => set({ encounterActive: active }),
  setEncounterProgress: (progress) => set({ encounterProgress: progress }),
  setOnlineCount: (count) => set({ onlineCount: count }),
  setFrequencyLinks: (links) => set({ frequencyLinks: links }),
  setActiveLink: (link) => set({ activeLink: link }),
  addIncomingMessage: (msg) =>
    set((s) => ({ incomingMessages: [...s.incomingMessages, msg] })),
  setComposeOpen: (open) => set({ composeOpen: open }),
  setMaterializingMessage: (msg) => set({ materializingMessage: msg }),
}))
