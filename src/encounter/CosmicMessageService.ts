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

/**
 * Cosmic Message Service
 *
 * After an encounter, two users are connected via a "frequency link."
 * Messages travel with a delay that grows over time — like light crossing
 * an expanding universe. Eventually the link fades and they drift apart forever.
 *
 * Delay formula: delay = baseDelay * (1 + (hoursSince / 24) ^ exponent)
 *   - Right after encounter: ~60 seconds
 *   - After 1 day:  ~120 seconds (2 min)
 *   - After 1 week: ~20 minutes
 *   - After 1 month: ~2.75 hours
 *   - After 60 days: link expires
 */
export class CosmicMessageService {
  private userId: string
  private listeners: (() => void)[] = []

  constructor(private db: Database) {
    this.userId = getUserId()
  }

  /**
   * Calculate signal delay in seconds based on time elapsed since encounter.
   */
  calculateDelay(encounteredAt: number): number {
    const hoursSince = (Date.now() - encounteredAt) / (3600 * 1000)
    const daysSince = hoursSince / 24
    return COSMIC_COMM.baseDelaySeconds * (1 + Math.pow(daysSince, COSMIC_COMM.delayExponent))
  }

  /**
   * Calculate signal delay as a human-readable string
   */
  formatDelay(encounteredAt: number): string {
    const seconds = this.calculateDelay(encounteredAt)
    if (seconds < 60) return `${Math.round(seconds)}s`
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`
    return `${(seconds / 3600).toFixed(1)}h`
  }

  /**
   * Check if a frequency link is still active
   */
  isLinkActive(link: LocalFrequencyLink): boolean {
    return Date.now() < link.expiresAt
  }

  /**
   * Send a message through a frequency link.
   * The message will arrive at the peer after the calculated delay.
   */
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

  /**
   * Listen for incoming messages on a frequency link.
   * Only delivers messages that have "arrived" (past their delay).
   */
  listenForMessages(
    link: LocalFrequencyLink,
    onMessage: (msg: CosmicMessageData) => void
  ): () => void {
    const messagesRef = ref(this.db, `cosmic-messages/${link.linkId}`)
    const q = query(messagesRef, orderByChild('sentAt'))

    // Track delivered message IDs to avoid duplicates
    const deliveredIds = new Set<string>()

    const unsubscribe = onChildAdded(q, (snapshot) => {
      const data = snapshot.val()
      const id = snapshot.key
      if (!data || !id) return
      if (data.from === this.userId) return // Don't receive your own messages
      if (deliveredIds.has(id)) return

      const msg: CosmicMessageData = { ...data, id }

      // Check if message has arrived
      const now = Date.now()
      if (now >= msg.arrivesAt) {
        // Already arrived
        deliveredIds.add(id)
        onMessage(msg)
      } else {
        // Schedule delivery for when it "arrives"
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

  /**
   * Load message history for a link (messages already arrived).
   */
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
