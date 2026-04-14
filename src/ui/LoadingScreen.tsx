import { useState, useEffect, useRef } from 'react'
import { AudioEngine } from '../audio/AudioEngine'

/**
 * Cinematic Loading Screen
 *
 * Phase 1 (0-2s): Pure black. Silence. Anticipation.
 * Phase 2 (2-4s): Stars begin appearing one by one.
 * Phase 3 (4-6s): "COSMOS" title materializes from starlight.
 * Phase 4 (6-8s): "touch to enter" fades in below.
 * Phase 5 (tap): Everything rushes forward (warp effect) → universe.
 *
 * The stars in the loading screen are CSS-only (no Three.js dependency)
 * so they load instantly even on slow connections.
 */

const STAR_COUNT = 120

interface Star {
  x: number; y: number; size: number; delay: number; brightness: number
}

function generateStars(): Star[] {
  const stars: Star[] = []
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.5 + Math.random() * 2,
      delay: 1.5 + Math.random() * 2.5, // Appear between 1.5s and 4s
      brightness: 0.3 + Math.random() * 0.7,
    })
  }
  return stars
}

export function LoadingScreen({ onStart }: { onStart: () => void }) {
  const [phase, setPhase] = useState(0) // 0=black, 1=stars, 2=title, 3=prompt
  const [exiting, setExiting] = useState(false)
  const [visible, setVisible] = useState(true)
  const startedRef = useRef(false)
  const starsRef = useRef(generateStars())

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800)   // Stars start
    const t2 = setTimeout(() => setPhase(2), 3000)   // Title appears
    const t3 = setTimeout(() => setPhase(3), 5000)   // Prompt appears
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  if (!visible) return null

  const handleClick = () => {
    if (startedRef.current || phase < 2) return // Don't allow before title
    startedRef.current = true

    // Init audio DIRECTLY in gesture handler
    AudioEngine.init()

    // Warp exit effect
    setExiting(true)

    // Notify app after warp animation
    setTimeout(() => {
      onStart()
      setVisible(false)
    }, 1500)
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
        cursor: phase >= 2 ? 'pointer' : 'default',
        overflow: 'hidden',
      }}
    >
      {/* Stars appearing one by one */}
      {phase >= 1 && starsRef.current.map((star, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            background: `rgba(200, 210, 255, ${star.brightness})`,
            opacity: 0,
            animation: `starAppear 2s ease-out ${star.delay}s forwards${exiting ? `, starWarp 1.5s ease-in forwards` : ''}`,
            boxShadow: star.size > 1.5
              ? `0 0 ${star.size * 3}px rgba(150, 180, 255, ${star.brightness * 0.3})`
              : 'none',
          }}
        />
      ))}

      {/* Title materializing */}
      <h1
        style={{
          color: '#fff',
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontWeight: 100,
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          letterSpacing: '0.6em',
          opacity: phase >= 2 ? 1 : 0,
          transform: `scale(${exiting ? 3 : 1}) translateY(${exiting ? '-30vh' : '0'})`,
          transition: `opacity 3s ease, transform ${exiting ? '1.5s' : '0s'} ease-in`,
          zIndex: 2,
          textShadow: '0 0 40px rgba(100, 140, 255, 0.3), 0 0 80px rgba(100, 140, 255, 0.1)',
          marginBottom: '2rem',
        }}
      >
        COSMOS
      </h1>

      {/* Prompt */}
      <p
        style={{
          color: 'rgba(255,255,255,0.35)',
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontWeight: 200,
          fontSize: 'clamp(0.6rem, 1.8vw, 0.85rem)',
          letterSpacing: '0.4em',
          opacity: phase >= 3 && !exiting ? 1 : 0,
          transition: 'opacity 2s ease',
          zIndex: 2,
        }}
      >
        TOUCH TO ENTER THE UNIVERSE
      </p>

      {/* Warp overlay — radial zoom blur effect */}
      {exiting && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, transparent 0%, rgba(100,140,255,0.03) 30%, rgba(0,0,0,0.8) 100%)',
            animation: 'warpFlash 1.5s ease-in forwards',
            zIndex: 3,
          }}
        />
      )}

      <style>{`
        @keyframes starAppear {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes starWarp {
          0% { transform: scale(1); }
          100% {
            transform: scale(0.5) translate(
              ${Math.random() > 0.5 ? '' : '-'}${50 + Math.random() * 100}vw,
              ${Math.random() > 0.5 ? '' : '-'}${50 + Math.random() * 100}vh
            );
            opacity: 0;
          }
        }
        @keyframes warpFlash {
          0% { opacity: 0; }
          70% { opacity: 0.3; }
          100% { opacity: 1; background: #000; }
        }
      `}</style>
    </div>
  )
}
