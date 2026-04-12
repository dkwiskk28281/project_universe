import { useEffect, useCallback, useRef } from 'react'
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
  const audioInitRef = useRef(false)

  useEncounter()

  // iOS Safari audio unlock: use a raw DOM listener on the document.
  // This is the approach used by Howler.js, Tone.js, and PixiJS.
  // React synthetic events sometimes don't count as "user gestures" on iOS.
  useEffect(() => {
    const unlockAudio = () => {
      if (audioInitRef.current) return
      audioInitRef.current = true
      AudioEngine.init()
      setAudioReady(true)
      // Remove listeners after first successful init
      document.removeEventListener('touchstart', unlockAudio, true)
      document.removeEventListener('touchend', unlockAudio, true)
      document.removeEventListener('click', unlockAudio, true)
    }

    // Capture phase listeners — fire before any React handlers
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
    // Audio already initialized by document-level listener above
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
          <EncounterIndicator />
          <CosmicComm />
        </>
      )}
    </>
  )
}
