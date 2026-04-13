import { useEffect, useCallback, useRef } from 'react'
import { CosmosCanvas } from './scene/CosmosCanvas'
import { LoadingScreen } from './ui/LoadingScreen'
import { EncounterIndicator } from './ui/EncounterIndicator'
import { CosmicComm } from './ui/CosmicComm'
import { BreathingOverlay } from './ui/BreathingOverlay'
import { AudioEngine } from './audio/AudioEngine'
import { useEncounter } from './encounter/useEncounter'
import { useCosmosStore } from './store'

export default function App() {
  const started = useCosmosStore((s) => s.started)
  const setStarted = useCosmosStore((s) => s.setStarted)
  const setAudioReady = useCosmosStore((s) => s.setAudioReady)
  const audioInitRef = useRef(false)

  useEncounter()

  useEffect(() => {
    const unlockAudio = () => {
      if (audioInitRef.current) return
      audioInitRef.current = true
      AudioEngine.init()
      setAudioReady(true)
      document.removeEventListener('touchstart', unlockAudio, true)
      document.removeEventListener('touchend', unlockAudio, true)
      document.removeEventListener('click', unlockAudio, true)
    }
    document.addEventListener('touchstart', unlockAudio, true)
    document.addEventListener('touchend', unlockAudio, true)
    document.addEventListener('click', unlockAudio, true)
    return () => {
      document.removeEventListener('touchstart', unlockAudio, true)
      document.removeEventListener('touchend', unlockAudio, true)
      document.removeEventListener('click', unlockAudio, true)
    }
  }, [setAudioReady])

  const handleStart = useCallback(() => {
    if (!audioInitRef.current) {
      audioInitRef.current = true
      AudioEngine.init()
      setAudioReady(true)
    }
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
