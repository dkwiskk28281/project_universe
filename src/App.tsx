import { useState, useEffect, useCallback } from 'react'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { SplashScreen } from '@capacitor/splash-screen'
import { Haptics, ImpactStyle } from '@capacitor/haptics'
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

  // Native platform setup
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Dark }).catch(() => {})
      StatusBar.setBackgroundColor({ color: '#000000' }).catch(() => {})
    }
  }, [])

  const handleStart = useCallback(async () => {
    try {
      await AudioEngine.init()
      setAudioReady(true)
    } catch (e) {
      console.warn('[COSMOS] Audio init failed:', e)
    }
    setStarted(true)

    // Hide native splash screen after app is ready
    if (Capacitor.isNativePlatform()) {
      SplashScreen.hide({ fadeOutDuration: 500 }).catch(() => {})
      Haptics.impact({ style: ImpactStyle.Light }).catch(() => {})
    }
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
