import { useEffect, useRef } from 'react'
import { useCosmosStore } from '../store'
import { initFirebase } from '../firebase/config'
import { EncounterOrchestrator } from './EncounterOrchestrator'
import { AudioEngine } from '../audio/AudioEngine'

export function useEncounter() {
  const orchestratorRef = useRef<EncounterOrchestrator | null>(null)
  const setEncounterActive = useCosmosStore((s) => s.setEncounterActive)
  const setOnlineCount = useCosmosStore((s) => s.setOnlineCount)

  useEffect(() => {
    // StrictMode guard: don't create a second orchestrator
    if (orchestratorRef.current) return

    const firebase = initFirebase()
    if (!firebase) {
      // No Firebase: schedule phantom encounters every 2-5 minutes for demo
      const phantomInterval = setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance each check
          setEncounterActive(true)
          if (AudioEngine.isInitialized()) {
            AudioEngine.startEncounterAudio()
          }
        }
      }, 60000)

      return () => clearInterval(phantomInterval)
    }

    const orchestrator = new EncounterOrchestrator(firebase.db, {
      onEncounterStart: () => {
        setEncounterActive(true)
        if (AudioEngine.isInitialized()) {
          AudioEngine.startEncounterAudio()
        }
      },
      onEncounterEnd: () => {
        setEncounterActive(false)
        if (AudioEngine.isInitialized()) {
          AudioEngine.stopEncounterAudio()
        }
      },
      onOnlineCount: setOnlineCount,
    })

    orchestrator.start()
    orchestratorRef.current = orchestrator

    return () => {
      orchestrator.stop()
      orchestratorRef.current = null
    }
  }, [setEncounterActive, setOnlineCount])

  return orchestratorRef
}
