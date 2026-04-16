import { useState, useEffect, useRef } from 'react'
import { useCosmosStore } from '../store'

/**
 * Cosmic Narration — Synchronized with the visual journey.
 *
 * Quotes appear in CONTEXT:
 *   - Opening: cosmic overview quotes
 *   - Ongoing: cycling through Cosmos chapter themes
 *   - During encounters: connection/love quotes
 *   - Special: Pale Blue Dot event (rare, emotional peak)
 *
 * The Pale Blue Dot is the emotional climax — a tiny blue-green
 * dot appears in 3D space, and Sagan's most famous words materialize.
 */

interface NarrationItem {
  text: string
  attribution?: string
  delay: number // seconds before next
}

// Opening sequence (first 5 minutes)
const OPENING: NarrationItem[] = [
  { text: "The cosmos is all that is,\nor ever was, or ever will be.", attribution: "Cosmos, Ch. 1", delay: 60 },
  { text: "The surface of the Earth\nis the shore of the cosmic ocean.", attribution: "Cosmos, Ch. 1", delay: 70 },
  { text: "We are made of starstuff.", attribution: "Cosmos, Ch. 7", delay: 55 },
]

// Journey quotes (loop after opening)
const JOURNEY: NarrationItem[] = [
  { text: "The nitrogen in our DNA,\nthe calcium in our teeth,\nthe iron in our blood —\nwere made in the interiors\nof collapsing stars.", attribution: "Cosmos, Ch. 7", delay: 80 },
  { text: "Somewhere, something incredible\nis waiting to be known.", attribution: "Cosmos, Ch. 12", delay: 65 },
  { text: "We are like butterflies\nwho flutter for a day\nand think it is forever.", attribution: "Cosmos, Ch. 10", delay: 75 },
  { text: "The universe is not required\nto be in perfect harmony\nwith human ambition.", attribution: "Cosmos, Ch. 10", delay: 70 },
  { text: "Every one of us is,\nin the cosmic perspective,\nprecious.", attribution: "Cosmos, Ch. 2", delay: 60 },
  { text: "Nature uses only\nthe longest threads\nto weave her patterns.", attribution: "Cosmos, Ch. 3", delay: 85 },
  { text: "The universe is a pretty big place.\nIf it's just us,\nseems like an awful waste of space.", attribution: "Contact", delay: 70 },
  { text: "For small creatures such as we,\nthe vastness is bearable\nonly through love.", attribution: "Contact", delay: 80 },
  { text: "We are a way for the cosmos\nto know itself.", attribution: "Cosmos, Ch. 1", delay: 65 },
  { text: "The cosmos is within us.\nWe are made of star stuff.\nWe are a way for the universe\nto know itself.", attribution: "Cosmos", delay: 90 },
]

// Encounter quotes (shown during encounters)
const ENCOUNTER_QUOTES: NarrationItem[] = [
  { text: "For small creatures such as we,\nthe vastness is bearable\nonly through love.", attribution: "Contact", delay: 0 },
  { text: "In all our searching,\nthe only thing we've found\nthat makes the emptiness bearable\nis each other.", attribution: "Contact", delay: 0 },
]

export function CosmicNarration() {
  const [text, setText] = useState<string | null>(null)
  const [attribution, setAttribution] = useState<string | null>(null)
  const [opacity, setOpacity] = useState(0)
  const encounterActive = useCosmosStore((s) => s.encounterActive)
  const phaseRef = useRef<'opening' | 'journey'>('opening')
  const indexRef = useRef(0)
  const journeyIndexRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const encounterShownRef = useRef(false)

  // Show a quote with fade in/out
  const showQuote = (item: NarrationItem, nextDelay: number) => {
    setText(item.text)
    setAttribution(item.attribution || null)

    // Fade in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpacity(1))
    })

    // Hold 12s, then fade out
    timeoutRef.current = setTimeout(() => {
      setOpacity(0)
      setTimeout(() => {
        setText(null)
        setAttribution(null)
        // Schedule next
        timeoutRef.current = setTimeout(() => advanceNarration(), nextDelay * 1000)
      }, 4000)
    }, 12000)
  }

  const advanceNarration = () => {
    if (phaseRef.current === 'opening') {
      if (indexRef.current < OPENING.length) {
        const item = OPENING[indexRef.current++]
        showQuote(item, item.delay)
      } else {
        phaseRef.current = 'journey'
        advanceNarration()
      }
    } else {
      const item = JOURNEY[journeyIndexRef.current % JOURNEY.length]
      journeyIndexRef.current++
      showQuote(item, item.delay)
    }
  }

  // Start narration 20 seconds after mount
  useEffect(() => {
    timeoutRef.current = setTimeout(() => advanceNarration(), 20000)
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  // Encounter override — show connection quote
  useEffect(() => {
    if (encounterActive && !encounterShownRef.current) {
      encounterShownRef.current = true
      // Clear current narration
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setOpacity(0)

      setTimeout(() => {
        const eq = ENCOUNTER_QUOTES[Math.floor(Math.random() * ENCOUNTER_QUOTES.length)]
        showQuote(eq, 60)
      }, 5000) // Show 5 seconds into encounter
    }
    if (!encounterActive) {
      encounterShownRef.current = false
    }
  }, [encounterActive])

  if (!text) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 8,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
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
        {text}
      </p>
      {attribution && (
        <p
          style={{
            color: 'rgba(140, 155, 190, 0.2)',
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 200,
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            opacity: opacity * 0.7,
            transition: 'opacity 4s ease',
          }}
        >
          — {attribution}
        </p>
      )}
    </div>
  )
}
