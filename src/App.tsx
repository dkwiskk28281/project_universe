import { useState, useEffect, useCallback } from 'react'
import { CosmosCanvas } from './scene/CosmosCanvas'
import { LoadingScreen } from './ui/LoadingScreen'
import { SettingsOverlay } from './ui/SettingsOverlay'
import { EncounterIndicator } from './ui/EncounterIndicator'
import { AudioEngine } from './audio/AudioEngine'
import { useEncounter } from './encounter/useEncounter'
import { useCosmosStore } from './store'

export default function App() {
  const [started, setStarted] = useState(false)
  const setAudioReady = useCosmosStore((s) => s.setAudioReady)

  // Initialize encounter system
  useEncounter()

  const handleStart = useCallback(async () => {
    try {
      await AudioEngine.init()
      setAudioReady(true)
    } catch (e) {
      console.warn('[COSMOS] Audio init failed:', e)
    }
    setStarted(true)
  }, [setAudioReady])

  // Handle visibility change for battery saving
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        AudioEngine.suspend()
      } else {
        AudioEngine.resume()
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  return (
    <>
      <CosmosCanvas />
      <LoadingScreen onStart={handleStart} />
      {started && (
        <>
          <SettingsOverlay />
          <EncounterIndicator />
        </>
      )}
    </>
  )
}
