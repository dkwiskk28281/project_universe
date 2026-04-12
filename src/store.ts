import { create } from 'zustand'
import { type QualityLevel, QUALITY_PRESETS } from './utils/constants'
import { detectQualityLevel } from './utils/deviceProfile'

interface CosmosState {
  quality: QualityLevel
  qualityPreset: (typeof QUALITY_PRESETS)[QualityLevel]
  volume: number
  audioReady: boolean
  encounterActive: boolean
  encounterProgress: number
  onlineCount: number

  setQuality: (level: QualityLevel) => void
  setVolume: (v: number) => void
  setAudioReady: (ready: boolean) => void
  setEncounterActive: (active: boolean) => void
  setEncounterProgress: (progress: number) => void
  setOnlineCount: (count: number) => void
}

const initialQuality = detectQualityLevel()

export const useCosmosStore = create<CosmosState>((set) => ({
  quality: initialQuality,
  qualityPreset: QUALITY_PRESETS[initialQuality],
  volume: 0.6,
  audioReady: false,
  encounterActive: false,
  encounterProgress: 0,
  onlineCount: 0,

  setQuality: (level) =>
    set({ quality: level, qualityPreset: QUALITY_PRESETS[level] }),
  setVolume: (v) => set({ volume: v }),
  setAudioReady: (ready) => set({ audioReady: ready }),
  setEncounterActive: (active) => set({ encounterActive: active }),
  setEncounterProgress: (progress) => set({ encounterProgress: progress }),
  setOnlineCount: (count) => set({ onlineCount: count }),
}))
