import { create } from 'zustand'
import { type QualityLevel, QUALITY_PRESETS } from './utils/constants'
import { detectQualityLevel, setQualityLevel } from './utils/deviceProfile'

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

function loadPersistedVolume(): number {
  try {
    const stored = localStorage.getItem('cosmos-volume')
    if (stored !== null) {
      const v = parseFloat(stored)
      if (isFinite(v) && v >= 0 && v <= 1) return v
    }
  } catch {
    // localStorage unavailable
  }
  return 0.6
}

const initialQuality = detectQualityLevel()

export const useCosmosStore = create<CosmosState>((set) => ({
  quality: initialQuality,
  qualityPreset: QUALITY_PRESETS[initialQuality],
  volume: loadPersistedVolume(),
  audioReady: false,
  encounterActive: false,
  encounterProgress: 0,
  onlineCount: 0,

  setQuality: (level) => {
    setQualityLevel(level)
    set({ quality: level, qualityPreset: QUALITY_PRESETS[level] })
  },
  setVolume: (v) => {
    try {
      localStorage.setItem('cosmos-volume', String(v))
    } catch {
      // localStorage unavailable
    }
    set({ volume: v })
  },
  setAudioReady: (ready) => set({ audioReady: ready }),
  setEncounterActive: (active) => set({ encounterActive: active }),
  setEncounterProgress: (progress) => set({ encounterProgress: progress }),
  setOnlineCount: (count) => set({ onlineCount: count }),
}))
