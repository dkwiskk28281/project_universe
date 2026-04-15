import { useState, useEffect, useRef } from 'react'

/**
 * Cosmic Narration — Carl Sagan's Cosmos as a journey.
 *
 * As you drift through space, profound quotes materialize
 * like whispers from the cosmos itself. Each quote corresponds
 * to what you're experiencing visually — stars, nebulae,
 * the vastness, the silence, the connection.
 *
 * Timing: one quote every 45-90 seconds.
 * Each quote takes 4 seconds to materialize, stays 12 seconds,
 * fades over 4 seconds. Never intrusive — ethereal presence.
 *
 * Psychology: meaning-making enhances awe response (Keltner 2023).
 * Combining visual awe + narrative meaning = deepest stress reduction.
 */

// Curated journey through Cosmos themes
// Short enough for fair use, attributed to inspire further reading
const NARRATION = [
  // Chapter 1: The Shores of the Cosmic Ocean
  { text: "The cosmos is all that is,\nor ever was, or ever will be.", delay: 30 },
  // Chapter 7: The Backbone of Night
  { text: "The nitrogen in our DNA,\nthe calcium in our teeth,\nthe iron in our blood —\nwere made in the interiors\nof collapsing stars.", delay: 70 },
  // Chapter 10: The Edge of Forever
  { text: "We are a way for the cosmos\nto know itself.", delay: 55 },
  // Pale Blue Dot
  { text: "Look again at that dot.\nThat's here. That's home.\nThat's us.", delay: 65 },
  // Chapter 12: Encyclopaedia Galactica
  { text: "Somewhere, something incredible\nis waiting to be known.", delay: 50 },
  // Chapter 1
  { text: "The surface of the Earth\nis the shore of the cosmic ocean.", delay: 75 },
  // Chapter 7
  { text: "We are made of starstuff.", delay: 45 },
  // Chapter 13
  { text: "For small creatures such as we,\nthe vastness is bearable\nonly through love.", delay: 80 },
  // Contact
  { text: "The universe is a pretty big place.\nIf it's just us,\nseems like an awful waste of space.", delay: 60 },
  // Chapter 10
  { text: "We are like butterflies\nwho flutter for a day\nand think it is forever.", delay: 70 },
  // Chapter 2
  { text: "Every one of us is,\nin the cosmic perspective,\nprecious.", delay: 55 },
  // Billions and Billions
  { text: "Extinction is the rule.\nSurvival is the exception.", delay: 85 },
  // Chapter 9: The Lives of the Stars
  { text: "The cosmos is within us.\nWe are made of star stuff.\nWe are a way for the universe\nto know itself.", delay: 65 },
  // Pale Blue Dot
  { text: "There is perhaps no better\ndemonstration of the folly\nof human conceits\nthan this distant image\nof our tiny world.", delay: 75 },
  // Chapter 3: Harmony of the Worlds
  { text: "Nature uses only\nthe longest threads\nto weave her patterns.", delay: 60 },
]

export function CosmicNarration() {
  const [current, setCurrent] = useState<string | null>(null)
  const [opacity, setOpacity] = useState(0)
  const indexRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    const showNext = () => {
      const narration = NARRATION[indexRef.current % NARRATION.length]
      indexRef.current++

      // Materialize
      setCurrent(narration.text)
      setOpacity(0)

      // Fade in (4 seconds)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setOpacity(1))
      })

      // Hold for 12 seconds, then fade out
      timeoutRef.current = setTimeout(() => {
        setOpacity(0)

        // Clear after fade out (4 seconds)
        setTimeout(() => {
          setCurrent(null)

          // Schedule next
          const nextDelay = narration.delay * 1000
          timeoutRef.current = setTimeout(showNext, nextDelay)
        }, 4000)
      }, 12000)
    }

    // First quote after 20 seconds (let the warp settle)
    timeoutRef.current = setTimeout(showNext, 20000)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  if (!current) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 8,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p
        style={{
          color: 'rgba(180, 195, 230, 0.35)',
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontWeight: 300,
          fontStyle: 'italic',
          fontSize: 'clamp(0.85rem, 2.5vw, 1.3rem)',
          lineHeight: 2.2,
          letterSpacing: '0.08em',
          textAlign: 'center',
          maxWidth: '80vw',
          whiteSpace: 'pre-line',
          opacity,
          transition: 'opacity 4s ease',
          textShadow: '0 0 30px rgba(100, 130, 200, 0.1)',
        }}
      >
        {current}
      </p>
    </div>
  )
}
