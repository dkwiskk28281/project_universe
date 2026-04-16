import { ref, set, onValue, get, remove, type Database } from 'firebase/database'
import { PresenceService } from './PresenceService'
import { EncounterScheduler } from './EncounterScheduler'
import { getUserId, getCooldownEnd, setCooldownEnd } from './encounterTypes'
import { ENCOUNTER } from '../utils/constants'

interface EncounterCallbacks {
  onEncounterStart: () => void
  onEncounterEnd: () => void
  onOnlineCount: (count: number) => void
}

export class EncounterOrchestrator {
  private presence: PresenceService
  private scheduler: EncounterScheduler
  private userId: string
  private pendingListener: (() => void) | null = null
  private seekAttempts = 0
  private seekIntervalId: ReturnType<typeof setInterval> | null = null
  private activeTimeouts: Set<ReturnType<typeof setTimeout>> = new Set()
  private destroyed = false

  constructor(
    private db: Database,
    private callbacks: EncounterCallbacks
  ) {
    this.userId = getUserId()
    this.presence = new PresenceService(db)
    this.scheduler = new EncounterScheduler(() => this.startSeeking())
  }

  async start(): Promise<void> {
    await this.presence.goOnline()
    this.presence.onOnlineCount(this.callbacks.onOnlineCount)
    this.listenForIncomingEncounters()
    this.scheduler.start()
  }

  stop(): void {
    this.destroyed = true
    this.scheduler.stop()
    this.stopSeeking()
    if (this.pendingListener) this.pendingListener()
    // Clear all tracked timeouts
    for (const id of this.activeTimeouts) {
      clearTimeout(id)
    }
    this.activeTimeouts.clear()
    this.presence.destroy()
  }

  /** For testing: force trigger an encounter attempt */
  forceEncounter(): void {
    this.startSeeking()
  }

  /** Trigger a phantom (local-only) encounter */
  triggerPhantom(): void {
    if (this.destroyed) return
    this.callbacks.onEncounterStart()
    const id = setTimeout(() => {
      this.activeTimeouts.delete(id)
      if (this.destroyed) return
      this.callbacks.onEncounterEnd()
      this.applyCooldown()
    }, ENCOUNTER.durationSeconds * 1000)
    this.activeTimeouts.add(id)
  }

  private async startSeeking(): Promise<void> {
    // Guard: prevent duplicate seek intervals
    if (this.seekIntervalId) return
    if (this.destroyed) return

    // Check cooldown
    if (Date.now() < getCooldownEnd()) return

    this.seekAttempts = 0
    this.seekIntervalId = setInterval(async () => {
      if (this.destroyed) {
        this.stopSeeking()
        return
      }

      this.seekAttempts++

      const users = await this.presence.getOnlineUsers()

      if (users.length === 0) {
        // Check if we should do phantom
        const totalOnline = await this.getTotalOnlineCount()
        if (totalOnline < ENCOUNTER.phantomThreshold) {
          this.stopSeeking()
          this.triggerPhantom()
          return
        }

        if (this.seekAttempts > (ENCOUNTER.seekTimeoutMinutes * 60) / ENCOUNTER.seekCheckIntervalSeconds) {
          this.stopSeeking()
          return
        }
        return
      }

      // Pick random user
      const target = users[Math.floor(Math.random() * users.length)]
      await this.proposeEncounter(target)
      this.stopSeeking()
    }, ENCOUNTER.seekCheckIntervalSeconds * 1000)
  }

  private stopSeeking(): void {
    if (this.seekIntervalId) {
      clearInterval(this.seekIntervalId)
      this.seekIntervalId = null
    }
  }

  private async proposeEncounter(targetId: string): Promise<void> {
    const pendingRef = ref(this.db, `encounters-pending/${this.userId}`)
    await set(pendingRef, {
      initiator: this.userId,
      target: targetId,
      timestamp: Date.now(),
      status: 'proposed',
    })

    let resolved = false
    let unsubscribe: (() => void) | null = null

    const cleanup = () => {
      if (resolved) return
      resolved = true
      unsubscribe?.()
    }

    // Wait for acceptance
    unsubscribe = onValue(pendingRef, (snapshot) => {
      const data = snapshot.val()
      if (data?.status === 'accepted') {
        cleanup()
        this.executeEncounter(data.timestamp)
        // Clean up after delay
        const id = setTimeout(() => {
          this.activeTimeouts.delete(id)
          remove(pendingRef)
        }, 5000)
        this.activeTimeouts.add(id)
      }
    }) as unknown as () => void

    // Timeout after 30 seconds
    const timeoutId = setTimeout(() => {
      this.activeTimeouts.delete(timeoutId)
      cleanup()
      remove(pendingRef)
    }, 30000)
    this.activeTimeouts.add(timeoutId)
  }

  private listenForIncomingEncounters(): void {
    const pendingRef = ref(this.db, 'encounters-pending')
    this.pendingListener = onValue(pendingRef, async (snapshot) => {
      if (!snapshot.exists()) return

      snapshot.forEach((child) => {
        const data = child.val()
        if (data.target === this.userId && data.status === 'proposed') {
          // Accept
          const proposalRef = ref(this.db, `encounters-pending/${child.key}`)
          set(proposalRef, { ...data, status: 'accepted' })
          this.executeEncounter(data.timestamp)
        }
      })
    }) as unknown as () => void
  }

  private executeEncounter(timestamp: number): void {
    if (this.destroyed) return

    // Small delay for sync
    const delay = Math.max(0, timestamp + 5000 - Date.now())

    const delayId = setTimeout(() => {
      this.activeTimeouts.delete(delayId)
      if (this.destroyed) return

      this.callbacks.onEncounterStart()
      const durationId = setTimeout(() => {
        this.activeTimeouts.delete(durationId)
        if (this.destroyed) return
        this.callbacks.onEncounterEnd()
        this.applyCooldown()
      }, ENCOUNTER.durationSeconds * 1000)
      this.activeTimeouts.add(durationId)
    }, delay)
    this.activeTimeouts.add(delayId)
  }

  private applyCooldown(): void {
    const cooldownEnd = Date.now() + ENCOUNTER.minCooldownHours * 3600 * 1000
    setCooldownEnd(cooldownEnd)
    this.presence.setEncounterReady(false)

    // Re-enable after cooldown
    const id = setTimeout(() => {
      this.activeTimeouts.delete(id)
      if (this.destroyed) return
      this.presence.setEncounterReady(true)
    }, ENCOUNTER.minCooldownHours * 3600 * 1000)
    this.activeTimeouts.add(id)
  }

  private async getTotalOnlineCount(): Promise<number> {
    const presenceRef = ref(this.db, 'presence')
    const snapshot = await get(presenceRef)
    return snapshot.size || 0
  }
}
