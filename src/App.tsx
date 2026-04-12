import { useEffect, useCallback } from 'react'
import { CosmosCanvas } from './scene/CosmosCanvas'
import { LoadingScreen } from './ui/LoadingScreen'
import { EncounterIndicator } from './ui/EncounterIndicator'
import { CosmicComm } from './ui/CosmicComm'
import { AudioEngine } from './audio/AudioEngine'
import { useEncounter } from './encounter/useEncounter'
import { useCosmosStore } from './store'

export default function App() {
  const started = useCosmosStore((s) => s.started)
  const setStarted = useCosmosStore((s) => s.setStarted)
  const setAudioReady = useCosmosStore((s) => s.setAudioReady)

  useEncounter()

  const handleStart = useCallback(() => {
    // Synchronous — iOS requires AudioContext in gesture call stack
    AudioEngine.init()
    setAudioReady(true)
    setStarted(true)
  }, [setAudioReady, setStarted])

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
          <EncounterIndicator />
          <CosmicComm />
        </>
      )}
    </>
  )
}
