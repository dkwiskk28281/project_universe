import {
  ref,
  push,
  onChildAdded,
  query,
  orderByChild,
  get,
  type Database,
} from 'firebase/database'
import { getUserId, type CosmicMessageData, type LocalFrequencyLink } from './encounterTypes'
import { COSMIC_COMM } from '../utils/constants'
import {
  signalDelay,
  signalStrength,
  isHorizonCrossed,
  comovingDistance,
  formatDelay,
  formatDistance,
} from '../utils/cosmology'

/**
 * Cosmic Message Service
 *
 * Physics-based communication through expanding space.
 *
 * After encountering another soul, users are frequency-linked.
 * Messages travel at the speed of light through expanding space:
 *
 *   - Space expands exponentially (Hubble's law): d(t) = d₀ × e^(Ht)
 *   - Signal delay grows with expansion: delay = d(t) / c
 *   - Signal weakens with distance: strength = 1/d (inverse distance)
 *   - Beyond the observable horizon (recession > c), signals can never arrive
 *
 * Timeline:
 *   t=0:       delay ~60s, strength 100%
 *   t=1 day:   delay ~73s, strength 82%
 *   t=1 week:  delay ~4min, strength 25%
 *   t=1 month: delay ~6.7h, strength 0.25%
 *   t=~45 days: horizon crossed — communication impossible forever
 */
export class CosmicMessageService {
  private userId: string
  private listeners: (() => void)[] = []

  constructor(private db: Database) {
    this.userId = getUserId()
  }

  /** Calculate signal delay in seconds using Hubble expansion */
  calculateDelay(encounteredAt: number): number {
    const secondsSince = (Date.now() - encounteredAt) / 1000
    return signalDelay(secondsSince)
  }

  /** Calculate signal strength (0 to 1) using inverse distance law */
  calculateStrength(encounteredAt: number): number {
    const secondsSince = (Date.now() - encounteredAt) / 1000
    return signalStrength(secondsSince)
  }

  /** Current co-moving distance */
  calculateDistance(encounteredAt: number): number {
    const secondsSince = (Date.now() - encounteredAt) / 1000
    return comovingDistance(secondsSince)
  }

  /** Human-readable signal delay */
  getDelayText(encounteredAt: number): string {
    return formatDelay(this.calculateDelay(encounteredAt))
  }

  /** Human-readable distance */
  getDistanceText(encounteredAt: number): string {
    return formatDistance(this.calculateDistance(encounteredAt))
  }

  /** Check if link is still within the observable horizon */
  isLinkActive(link: LocalFrequencyLink): boolean {
    const secondsSince = (Date.now() - link.encounteredAt) / 1000
    return !isHorizonCrossed(secondsSince)
  }

  /** Send a message through a frequency link */
  async sendMessage(link: LocalFrequencyLink, text: string): Promise<void> {
    if (!this.isLinkActive(link)) return
    if (text.length === 0 || text.length > COSMIC_COMM.maxMessageLength) return

    const now = Date.now()
    const delay = this.calculateDelay(link.encounteredAt)
    const arrivesAt = now + delay * 1000

    const messagesRef = ref(this.db, `cosmic-messages/${link.linkId}`)
    await push(messagesRef, {
      linkId: link.linkId,
      from: this.userId,
      text,
      sentAt: now,
      arrivesAt,
    })
  }

  /** Listen for incoming messages on a frequency link */
  listenForMessages(
    link: LocalFrequencyLink,
    onMessage: (msg: CosmicMessageData) => void
  ): () => void {
    const messagesRef = ref(this.db, `cosmic-messages/${link.linkId}`)
    const q = query(messagesRef, orderByChild('sentAt'))

    const deliveredIds = new Set<string>()

    const unsubscribe = onChildAdded(q, (snapshot) => {
      const data = snapshot.val()
      const id = snapshot.key
      if (!data || !id) return
      if (data.from === this.userId) return
      if (deliveredIds.has(id)) return

      const msg: CosmicMessageData = { ...data, id }

      const now = Date.now()
      if (now >= msg.arrivesAt) {
        deliveredIds.add(id)
        onMessage(msg)
      } else {
        const waitMs = msg.arrivesAt - now
        setTimeout(() => {
          if (!deliveredIds.has(id)) {
            deliveredIds.add(id)
            onMessage(msg)
          }
        }, waitMs)
      }
    }) as unknown as () => void

    this.listeners.push(unsubscribe)
    return unsubscribe
  }

  /** Load message history for a link */
  async getMessageHistory(link: LocalFrequencyLink): Promise<CosmicMessageData[]> {
    const messagesRef = ref(this.db, `cosmic-messages/${link.linkId}`)
    const snapshot = await get(messagesRef)
    if (!snapshot.exists()) return []

    const now = Date.now()
    const messages: CosmicMessageData[] = []

    snapshot.forEach((child) => {
      const data = child.val()
      const id = child.key
      if (data && id && data.arrivesAt <= now) {
        messages.push({ ...data, id })
      }
    })

    return messages.sort((a, b) => a.sentAt - b.sentAt)
  }

  destroy() {
    for (const unsub of this.listeners) {
      try { unsub() } catch { /* noop */ }
    }
    this.listeners = []
  }
}
