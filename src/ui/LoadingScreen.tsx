import { useState, useEffect, useRef } from 'react'

export function LoadingScreen({ onStart }: { onStart: () => void }) {
  const [opacity, setOpacity] = useState(1)
  const [visible, setVisible] = useState(true)
  const [showPrompt, setShowPrompt] = useState(false)
  const startedRef = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleStart = () => {
    // Prevent double-fire from both touch and click on mobile
    if (startedRef.current) return
    startedRef.current = true

    onStart()
    setOpacity(0)
    setTimeout(() => setVisible(false), 2000)
  }

  if (!visible) return null

  return (
    <div
      onPointerDown={handleStart}
      onTouchEnd={(e) => { e.preventDefault(); handleStart(); }}
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
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
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
