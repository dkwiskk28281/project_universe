import { useCosmosStore } from '../store'

export function EncounterIndicator() {
  const encounterActive = useCosmosStore((s) => s.encounterActive)
  const encounterProgress = useCosmosStore((s) => s.encounterProgress)

  if (!encounterActive) return null

  // Phase-based text
  let text = ''
  let textOpacity = 0
  if (encounterProgress > 0.05 && encounterProgress < 0.2) {
    text = '\u00b7 \u00b7 \u00b7'
    textOpacity = (encounterProgress - 0.05) / 0.15
  } else if (encounterProgress >= 0.2 && encounterProgress < 0.45) {
    text = 'life detected'
    textOpacity = Math.min(1, (encounterProgress - 0.2) / 0.1)
  } else if (encounterProgress >= 0.45 && encounterProgress < 0.65) {
    text = 'you are not alone'
    textOpacity = 1
  } else if (encounterProgress >= 0.65 && encounterProgress < 0.85) {
    text = '\u00b7 \u00b7 \u00b7'
    textOpacity = Math.max(0, (0.85 - encounterProgress) / 0.2)
  }

  // Glow intensity based on encounter phase
  const glowIntensity = encounterProgress < 0.5
    ? encounterProgress * 0.16
    : (1 - encounterProgress) * 0.16

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
      {/* Screen-edge glow that breathes */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: `inset 0 0 120px rgba(100, 150, 255, ${glowIntensity})`,
          animation: 'encounterPulse 4s ease-in-out infinite',
        }}
      />

      {/* Phase text */}
      {text && (
        <p
          style={{
            position: 'absolute',
            bottom: '12%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: `rgba(180, 200, 255, ${textOpacity * 0.5})`,
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 200,
            fontSize: '0.75rem',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            transition: 'opacity 2s ease',
          }}
        >
          {text}
        </p>
      )}

      <style>{`
        @keyframes encounterPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
