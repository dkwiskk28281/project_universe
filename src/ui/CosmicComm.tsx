import { useState, useEffect, useRef, useCallback } from 'react'
import { useCosmosStore } from '../store'
import { initFirebase } from '../firebase/config'
import { CosmicMessageService } from '../encounter/CosmicMessageService'
import { COSMIC_COMM } from '../utils/constants'

const baseFont: React.CSSProperties = {
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  fontWeight: 200,
  letterSpacing: '0.2em',
}

/**
 * Frequency link indicator & message compose/display.
 *
 * Shows a subtle "frequency linked" indicator after encounters.
 * Tap it to open a minimal message compose field.
 * Received messages materialize as ghostly text at the bottom of the screen.
 */
export function CosmicComm() {
  const frequencyLinks = useCosmosStore((s) => s.frequencyLinks)
  const materializingMessage = useCosmosStore((s) => s.materializingMessage)
  const setMaterializingMessage = useCosmosStore((s) => s.setMaterializingMessage)
  const encounterActive = useCosmosStore((s) => s.encounterActive)

  const [composeOpen, setComposeOpen] = useState(false)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [messageServiceInstance, setMessageServiceInstance] = useState<CosmicMessageService | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Materializing message animation
  const [msgVisible, setMsgVisible] = useState(false)
  const [msgText, setMsgText] = useState('')
  const msgTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    const firebase = initFirebase()
    if (firebase) {
      setMessageServiceInstance(new CosmicMessageService(firebase.db))
    }
  }, [])

  // Handle materializing messages
  useEffect(() => {
    if (!materializingMessage) return

    setMsgText(materializingMessage.text)
    setMsgVisible(true)

    if (msgTimeoutRef.current) clearTimeout(msgTimeoutRef.current)
    msgTimeoutRef.current = setTimeout(() => {
      setMsgVisible(false)
      setTimeout(() => {
        setMsgText('')
        setMaterializingMessage(null)
      }, 3000) // Extra time for fade-out
    }, COSMIC_COMM.visibleDurationMs)

    return () => {
      if (msgTimeoutRef.current) clearTimeout(msgTimeoutRef.current)
    }
  }, [materializingMessage, setMaterializingMessage])

  // Focus input when compose opens
  useEffect(() => {
    if (composeOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [composeOpen])

  const activeLinks = frequencyLinks.filter((l) => Date.now() < l.expiresAt)
  const hasLinks = activeLinks.length > 0

  const handleSend = useCallback(async () => {
    if (!messageServiceInstance || !text.trim() || activeLinks.length === 0) return

    setSending(true)
    try {
      // Send to all active frequency links
      for (const link of activeLinks) {
        await messageServiceInstance.sendMessage(link, text.trim())
      }
      setText('')
      setSent(true)
      setTimeout(() => setSent(false), 4000)
      setComposeOpen(false)
    } catch (e) {
      console.warn('[COSMOS] Send failed:', e)
    } finally {
      setSending(false)
    }
  }, [messageServiceInstance, text, activeLinks])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
    if (e.key === 'Escape') {
      setComposeOpen(false)
    }
  }

  // Get signal delay for the most recent link
  const delayText = hasLinks && messageServiceInstance
    ? messageServiceInstance.formatDelay(activeLinks[activeLinks.length - 1].encounteredAt)
    : ''

  // Don't show during encounters
  if (encounterActive) return null

  return (
    <>
      {/* Frequency link indicator — bottom left */}
      {hasLinks && (
        <button
          onClick={() => setComposeOpen(!composeOpen)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '2rem',
            zIndex: 40,
            background: 'none',
            border: '1px solid rgba(140, 170, 255, 0.12)',
            borderRadius: '20px',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            ...baseFont,
            color: 'rgba(140, 170, 255, 0.35)',
            fontSize: '0.65rem',
            transition: 'all 0.5s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(140, 170, 255, 0.3)'
            e.currentTarget.style.color = 'rgba(140, 170, 255, 0.6)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(140, 170, 255, 0.12)'
            e.currentTarget.style.color = 'rgba(140, 170, 255, 0.35)'
          }}
        >
          <span style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: 'rgba(140, 170, 255, 0.5)',
            animation: 'freqPulse 3s ease-in-out infinite',
          }} />
          <span>{activeLinks.length} FREQUENCY{activeLinks.length > 1 ? 'S' : ''} LINKED</span>
          {delayText && (
            <span style={{ opacity: 0.5 }}>SIGNAL {delayText}</span>
          )}
        </button>
      )}

      {/* Compose overlay */}
      {composeOpen && hasLinks && (
        <div style={{
          position: 'fixed',
          bottom: '5rem',
          left: '2rem',
          right: '2rem',
          maxWidth: '400px',
          zIndex: 45,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(140, 170, 255, 0.1)',
          borderRadius: '12px',
          padding: '1.2rem',
          animation: 'composeIn 0.4s ease-out',
        }}>
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, COSMIC_COMM.maxMessageLength))}
            onKeyDown={handleKeyDown}
            placeholder="transmit into the void..."
            disabled={sending}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              outline: 'none',
              ...baseFont,
              color: 'rgba(200, 210, 255, 0.7)',
              fontSize: '0.85rem',
              padding: '0.4rem 0',
              borderBottom: '1px solid rgba(140, 170, 255, 0.1)',
            }}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '0.8rem',
            ...baseFont,
            fontSize: '0.6rem',
            color: 'rgba(140, 170, 255, 0.3)',
          }}>
            <span>{text.length}/{COSMIC_COMM.maxMessageLength}</span>
            <span>
              {delayText && `arrives in ~${delayText}`}
            </span>
            <button
              onClick={handleSend}
              disabled={sending || !text.trim()}
              style={{
                background: 'none',
                border: '1px solid rgba(140, 170, 255, 0.2)',
                borderRadius: '12px',
                padding: '0.3rem 0.8rem',
                cursor: text.trim() ? 'pointer' : 'default',
                ...baseFont,
                fontSize: '0.6rem',
                color: text.trim() ? 'rgba(140, 170, 255, 0.6)' : 'rgba(140, 170, 255, 0.15)',
                transition: 'all 0.3s',
              }}
            >
              TRANSMIT
            </button>
          </div>
        </div>
      )}

      {/* Sent confirmation */}
      {sent && (
        <div style={{
          position: 'fixed',
          bottom: '5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 45,
          ...baseFont,
          fontSize: '0.65rem',
          color: 'rgba(140, 170, 255, 0.4)',
          letterSpacing: '0.4em',
          animation: 'sentFade 4s ease-out forwards',
        }}>
          SIGNAL TRANSMITTED
        </div>
      )}

      {/* Received message materializing */}
      {msgText && (
        <div style={{
          position: 'fixed',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 35,
          maxWidth: '80vw',
          textAlign: 'center',
          pointerEvents: 'none',
        }}>
          <p style={{
            ...baseFont,
            fontSize: 'clamp(0.8rem, 2vw, 1.1rem)',
            color: 'rgba(160, 180, 255, 0.5)',
            letterSpacing: '0.15em',
            lineHeight: 1.8,
            opacity: msgVisible ? 1 : 0,
            transition: `opacity ${msgVisible ? COSMIC_COMM.materializeDurationMs : 3000}ms ease`,
            textShadow: '0 0 20px rgba(100, 140, 255, 0.2)',
          }}>
            {msgText}
          </p>
          <p style={{
            ...baseFont,
            fontSize: '0.5rem',
            color: 'rgba(140, 170, 255, 0.2)',
            letterSpacing: '0.5em',
            marginTop: '0.8rem',
            opacity: msgVisible ? 1 : 0,
            transition: `opacity ${msgVisible ? COSMIC_COMM.materializeDurationMs + 2000 : 3000}ms ease`,
          }}>
            SIGNAL RECEIVED
          </p>
        </div>
      )}

      <style>{`
        @keyframes freqPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes composeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes sentFade {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </>
  )
}
