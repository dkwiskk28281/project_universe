import { useCosmosStore } from '../store'

export function EncounterIndicator() {
  const encounterActive = useCosmosStore((s) => s.encounterActive)
  const encounterProgress = useCosmosStore((s) => s.encounterProgress)

  if (!encounterActive) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      {/* Subtle pulsing ring at screen edges */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          border: '1px solid rgba(100, 150, 255, 0.1)',
          borderRadius: '0',
          animation: 'encounterPulse 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      {/* Small indicator text - appears faintly, safe-area aware */}
      {encounterProgress > 0.15 && encounterProgress < 0.85 && (
        <p
          style={{
            position: 'fixed',
            bottom: 'max(10%, env(safe-area-inset-bottom, 0px))',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(180, 200, 255, 0.3)',
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 200,
            fontSize: '0.75rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            animation: 'encounterTextFade 2s ease-in-out',
          }}
        >
          life detected
        </p>
      )}
      <style>{`
        @keyframes encounterPulse {
          0%, 100% { box-shadow: inset 0 0 60px rgba(100, 150, 255, 0.03); }
          50% { box-shadow: inset 0 0 80px rgba(100, 150, 255, 0.08); }
        }
        @keyframes encounterTextFade {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
