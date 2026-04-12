import { useState } from 'react'
import { useCosmosStore } from '../store'
import { AudioEngine } from '../audio/AudioEngine'
import { setQualityLevel } from '../utils/deviceProfile'
import { type QualityLevel } from '../utils/constants'

export function SettingsOverlay() {
  const [open, setOpen] = useState(false)
  const { quality, volume, onlineCount, setQuality, setVolume } = useCosmosStore()

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    AudioEngine.setVolume(v)
  }

  const handleQuality = (level: QualityLevel) => {
    setQuality(level)
    setQualityLevel(level)
  }

  const baseStyle: React.CSSProperties = {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontWeight: 300,
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
  }

  return (
    <>
      {/* Settings toggle button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 50,
          background: 'none',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...baseStyle,
          fontSize: '1rem',
          transition: 'border-color 0.3s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
      >
        {open ? '\u00d7' : '\u2699'}
      </button>

      {/* Online count */}
      {onlineCount > 0 && (
        <div
          style={{
            position: 'fixed',
            top: '1.5rem',
            left: '1.5rem',
            zIndex: 50,
            ...baseStyle,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'rgba(100, 200, 150, 0.6)',
              display: 'inline-block',
            }}
          />
          {onlineCount} in the universe
        </div>
      )}

      {/* Settings panel */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: '4.5rem',
            right: '1.5rem',
            zIndex: 50,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '1.5rem',
            minWidth: '200px',
            ...baseStyle,
          }}
        >
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              Volume
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              style={{ width: '100%', accentColor: 'rgba(100,150,255,0.6)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              Quality
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['low', 'medium', 'high'] as QualityLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => handleQuality(level)}
                  style={{
                    flex: 1,
                    background: quality === level ? 'rgba(100,150,255,0.2)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${quality === level ? 'rgba(100,150,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '6px',
                    padding: '0.4rem',
                    cursor: 'pointer',
                    ...baseStyle,
                    textTransform: 'uppercase',
                  }}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
