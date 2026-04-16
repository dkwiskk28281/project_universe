import { useEffect, useCallback } from 'react'
import { CosmosCanvas } from './scene/CosmosCanvas'
import { LoadingScreen } from './ui/LoadingScreen'
import { BreathingOverlay } from './ui/BreathingOverlay'
import { CircadianFilter } from './ui/CircadianFilter'
import { AudioEngine } from './audio/AudioEngine'
import { useEncounter } from './encounter/useEncounter'
import { useCosmosStore } from './store'

/**
 * App — pure visual cosmos experience.
 * No text, no UI, no interruptions after entry.
 * Just infinite space, sound, and breathing.
 */
export default function App() {
  const started = useCosmosStore((s) => s.started)
  const setStarted = useCosmosStore((s) => s.setStarted)
  const setAudioReady = useCosmosStore((s) => s.setAudioReady)

  useEncounter()

  const handleStart = useCallback(() => {
    setAudioReady(true)
    setStarted(true)
  }, [setAudioReady, setStarted])

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
      <CircadianFilter />
      <LoadingScreen onStart={handleStart} />
      {started && <BreathingOverlay />}
    </>
  )
}
