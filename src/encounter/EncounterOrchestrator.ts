import { ref, set, onValue, get, remove, type Database } from 'firebase/database'
import { PresenceService } from './PresenceService'
import { EncounterScheduler } from './EncounterScheduler'
import {
  getUserId,
  getCooldownEnd,
  setCooldownEnd,
  addFrequencyLink,
  type LocalFrequencyLink,
} from './encounterTypes'
import { ENCOUNTER, COSMIC_COMM } from '../utils/constants'

interface EncounterCallbacks {
  onEncounterStart: () => void
  onEncounterEnd: (peerId: string | null) => void
  onOnlineCount: (count: number) => void
  onFrequencyLinked: (link: LocalFrequencyLink) => void
}

export class EncounterOrchestrator {
  private presence: PresenceService
  private scheduler: EncounterScheduler
  private userId: string
  private pendingListener: (() => void) | null = null
  private seekAttempts = 0
  private seekIntervalId: ReturnType<typeof setInterval> | null = null

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
    this.scheduler.stop()
    this.stopSeeking()
    if (this.pendingListener) this.pendingListener()
    this.presence.destroy()
  }

  forceEncounter(): void {
    this.startSeeking()
  }

  triggerPhantom(): void {
    this.callbacks.onEncounterStart()
    setTimeout(() => {
      // Phantom encounters don't create frequency links (no real person)
      this.callbacks.onEncounterEnd(null)
      this.applyCooldown()
    }, ENCOUNTER.durationSeconds * 1000)
  }

  private async startSeeking(): Promise<void> {
    if (Date.now() < getCooldownEnd()) return

    this.seekAttempts = 0
    this.seekIntervalId = setInterval(async () => {
      this.seekAttempts++

      const users = await this.presence.getOnlineUsers()

      if (users.length === 0) {
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

    const unsubscribe = onValue(pendingRef, (snapshot) => {
      const data = snapshot.val()
      if (data?.status === 'accepted') {
        unsubscribe()
        this.executeEncounter(data.timestamp, targetId)
        setTimeout(() => remove(pendingRef), 5000)
      }
    })

    setTimeout(() => {
      unsubscribe()
      remove(pendingRef)
    }, 30000)
  }

  private listenForIncomingEncounters(): void {
    const pendingRef = ref(this.db, 'encounters-pending')
    this.pendingListener = onValue(pendingRef, async (snapshot) => {
      if (!snapshot.exists()) return

      snapshot.forEach((child) => {
        const data = child.val()
        if (data.target === this.userId && data.status === 'proposed') {
          const proposalRef = ref(this.db, `encounters-pending/${child.key}`)
          set(proposalRef, { ...data, status: 'accepted' })
          this.executeEncounter(data.timestamp, data.initiator)
        }
      })
    }) as unknown as () => void
  }

  private executeEncounter(timestamp: number, peerId: string): void {
    const delay = Math.max(0, timestamp + 5000 - Date.now())

    setTimeout(() => {
      this.callbacks.onEncounterStart()
      setTimeout(() => {
        // Create frequency link after encounter ends
        const link = this.createFrequencyLink(peerId)
        this.callbacks.onEncounterEnd(peerId)
        if (link) {
          this.callbacks.onFrequencyLinked(link)
        }
        this.applyCooldown()
      }, ENCOUNTER.durationSeconds * 1000)
    }, delay)
  }

  private createFrequencyLink(peerId: string): LocalFrequencyLink | null {
    const now = Date.now()
    const linkId = [this.userId, peerId].sort().join('_')
    const expiresAt = now + COSMIC_COMM.linkExpiryDays * 24 * 3600 * 1000

    // Store link in Firebase
    const linkRef = ref(this.db, `frequency-links/${linkId}`)
    set(linkRef, {
      id: linkId,
      userA: this.userId,
      userB: peerId,
      encounteredAt: now,
      expiresAt,
    })

    // Store locally
    const localLink: LocalFrequencyLink = {
      linkId,
      peerId,
      encounteredAt: now,
      expiresAt,
    }
    addFrequencyLink(localLink)

    return localLink
  }

  private applyCooldown(): void {
    const cooldownEnd = Date.now() + ENCOUNTER.minCooldownHours * 3600 * 1000
    setCooldownEnd(cooldownEnd)
    this.presence.setEncounterReady(false)

    setTimeout(() => {
      this.presence.setEncounterReady(true)
    }, ENCOUNTER.minCooldownHours * 3600 * 1000)
  }

  private async getTotalOnlineCount(): Promise<number> {
    const presenceRef = ref(this.db, 'presence')
    const snapshot = await get(presenceRef)
    return snapshot.size || 0
  }
}
