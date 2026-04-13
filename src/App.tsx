import { useEffect, useCallback } from 'react'
import { CosmosCanvas } from './scene/CosmosCanvas'
import { LoadingScreen } from './ui/LoadingScreen'
import { EncounterIndicator } from './ui/EncounterIndicator'
import { CosmicComm } from './ui/CosmicComm'
import { BreathingOverlay } from './ui/BreathingOverlay'
import { AudioEngine } from './audio/AudioEngine'
import { useEncounter } from './encounter/useEncounter'
import { useCosmosStore } from './store'

/**
 * App — minimal orchestration.
 *
 * Audio init is handled ENTIRELY by LoadingScreen's onClick.
 * No document listeners, no refs, no complexity.
 */
export default function App() {
  const started = useCosmosStore((s) => s.started)
  const setStarted = useCosmosStore((s) => s.setStarted)
  const setAudioReady = useCosmosStore((s) => s.setAudioReady)

  useEncounter()

  // Called by LoadingScreen AFTER AudioEngine.init() has already run
  const handleStart = useCallback(() => {
    setAudioReady(true)
    setStarted(true)
  }, [setAudioReady, setStarted])

  // Battery saving
  useEffect(() => {
    const h = () => {
      if (document.hidden) AudioEngine.suspend()
      else AudioEngine.resume()
    }
    document.addEventListener('visibilitychange', h)
    return () => document.removeEventListener('visibilitychange', h)
  }, [])

  return (
    <>
      <CosmosCanvas />
      <LoadingScreen onStart={handleStart} />
      {started && (
        <>
          <BreathingOverlay />
          <EncounterIndicator />
          <CosmicComm />
        </>
      )}
    </>
  )
}
