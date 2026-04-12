import { useEffect, useRef } from 'react'
import { useCosmosStore } from '../store'
import { initFirebase } from '../firebase/config'
import { EncounterOrchestrator } from './EncounterOrchestrator'
import { CosmicMessageService } from './CosmicMessageService'
import { AudioEngine } from '../audio/AudioEngine'
import { getFrequencyLinks, type LocalFrequencyLink } from './encounterTypes'
import { ENCOUNTER } from '../utils/constants'

export function useEncounter() {
  const orchestratorRef = useRef<EncounterOrchestrator | null>(null)
  const messageServiceRef = useRef<CosmicMessageService | null>(null)
  const setEncounterActive = useCosmosStore((s) => s.setEncounterActive)
  const setEncounterProgress = useCosmosStore((s) => s.setEncounterProgress)
  const setOnlineCount = useCosmosStore((s) => s.setOnlineCount)
  const setFrequencyLinks = useCosmosStore((s) => s.setFrequencyLinks)
  const addIncomingMessage = useCosmosStore((s) => s.addIncomingMessage)
  const setMaterializingMessage = useCosmosStore((s) => s.setMaterializingMessage)

  useEffect(() => {
    // Load existing frequency links from localStorage
    const existingLinks = getFrequencyLinks()
    setFrequencyLinks(existingLinks)

    const firebase = initFirebase()
    if (!firebase) {
      // No Firebase: demo mode with phantom encounters
      let phantomTimeout: ReturnType<typeof setTimeout>

      const schedulePhantom = () => {
        // Random 3-8 minute intervals in demo mode
        const delay = (180 + Math.random() * 300) * 1000
        phantomTimeout = setTimeout(() => {
          setEncounterActive(true)
          if (AudioEngine.isInitialized()) {
            AudioEngine.startEncounterAudio()
          }

          setTimeout(() => {
            setEncounterActive(false)
            setEncounterProgress(0)
            if (AudioEngine.isInitialized()) {
              AudioEngine.stopEncounterAudio()
            }
            schedulePhantom()
          }, ENCOUNTER.durationSeconds * 1000)
        }, delay)
      }

      schedulePhantom()
      return () => clearTimeout(phantomTimeout)
    }

    // Initialize message service
    const messageService = new CosmicMessageService(firebase.db)
    messageServiceRef.current = messageService

    // Listen for messages on all existing frequency links
    for (const link of existingLinks) {
      if (messageService.isLinkActive(link)) {
        messageService.listenForMessages(link, (msg) => {
          addIncomingMessage(msg)
          setMaterializingMessage(msg)
          if (AudioEngine.isInitialized()) {
            AudioEngine.playMessageReceiveSound()
          }
        })
      }
    }

    const orchestrator = new EncounterOrchestrator(firebase.db, {
      onEncounterStart: () => {
        setEncounterActive(true)
        if (AudioEngine.isInitialized()) {
          AudioEngine.startEncounterAudio()
        }
      },
      onEncounterEnd: (_peerId: string | null) => {
        setEncounterActive(false)
        setEncounterProgress(0)
        if (AudioEngine.isInitialized()) {
          AudioEngine.stopEncounterAudio()
        }
      },
      onOnlineCount: setOnlineCount,
      onFrequencyLinked: (link: LocalFrequencyLink) => {
        // Update links in store
        const updated = getFrequencyLinks()
        setFrequencyLinks(updated)

        // Start listening for messages on the new link
        messageService.listenForMessages(link, (msg) => {
          addIncomingMessage(msg)
          setMaterializingMessage(msg)
          if (AudioEngine.isInitialized()) {
            AudioEngine.playMessageReceiveSound()
          }
        })
      },
    })

    orchestrator.start()
    orchestratorRef.current = orchestrator

    return () => {
      orchestrator.stop()
      messageService.destroy()
      orchestratorRef.current = null
      messageServiceRef.current = null
    }
  }, [setEncounterActive, setEncounterProgress, setOnlineCount, setFrequencyLinks, addIncomingMessage, setMaterializingMessage])

  return { orchestratorRef, messageServiceRef }
}
