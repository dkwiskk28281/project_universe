import { useState, useEffect, useRef } from 'react'
import { AudioEngine } from '../audio/AudioEngine'

/**
 * Loading Screen — COSMOS entry point.
 *
 * Audio initialization happens DIRECTLY in this component's
 * click handler — not in App.tsx, not in a useEffect, not in
 * a document listener. This is the ONLY reliable way on iOS Safari.
 *
 * iOS requires AudioContext to be created in the DIRECT synchronous
 * call stack of a user gesture handler. Any indirection (callbacks,
 * React state updates, useEffect) can break the gesture chain.
 */
export function LoadingScreen({ onStart }: { onStart: () => void }) {
  const [opacity, setOpacity] = useState(1)
  const [visible, setVisible] = useState(true)
  const [showPrompt, setShowPrompt] = useState(false)
  const startedRef = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  // DIRECT click handler — AudioContext created RIGHT HERE
  // No indirection, no callbacks, no React state in between
  const handleClick = () => {
    if (startedRef.current) return
    startedRef.current = true

    // Step 1: Init audio DIRECTLY in gesture handler
    AudioEngine.init()

    // Step 2: Notify app
    onStart()

    // Step 3: Fade out
    setOpacity(0)
    setTimeout(() => setVisible(false), 2000)
  }

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity,
        transition: 'opacity 2s ease-out',
      }}
    >
      <h1
        style={{
          color: '#fff',
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontWeight: 100,
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          letterSpacing: '0.5em',
          marginBottom: '2rem',
          opacity: 0.9,
        }}
      >
        COSMOS
      </h1>
      <p
        style={{
          color: 'rgba(255,255,255,0.4)',
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
          letterSpacing: '0.3em',
          opacity: showPrompt ? 1 : 0,
          transition: 'opacity 1.5s ease-in',
        }}
      >
        TOUCH TO ENTER THE UNIVERSE
      </p>
    </div>
  )
}
