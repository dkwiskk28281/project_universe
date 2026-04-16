import {
  ref,
  set,
  onDisconnect,
  onValue,
  get,
  remove,
  type Database,
} from 'firebase/database'
import { getUserId, getCooldownEnd, type PresenceData } from './encounterTypes'

export class PresenceService {
  private userId: string
  private unsubscribe: (() => void) | null = null
  private destroyed = false

  constructor(private db: Database) {
    this.userId = getUserId()
  }

  async goOnline(): Promise<void> {
    const presenceRef = ref(this.db, `presence/${this.userId}`)

    const data: PresenceData = {
      status: 'online',
      lastSeen: Date.now(),
      encounterReady: Date.now() > getCooldownEnd(),
      sessionStart: Date.now(),
    }

    await set(presenceRef, data)

    // Clean up on disconnect
    onDisconnect(presenceRef).remove()
  }

  async getOnlineUsers(): Promise<string[]> {
    const presenceRef = ref(this.db, 'presence')
    const snapshot = await get(presenceRef)

    if (!snapshot.exists()) return []

    const users: string[] = []
    snapshot.forEach((child) => {
      const id = child.key
      if (id && id !== this.userId) {
        const data = child.val() as PresenceData
        if (data.encounterReady) {
          users.push(id)
        }
      }
    })

    return users
  }

  onOnlineCount(callback: (count: number) => void): void {
    const presenceRef = ref(this.db, 'presence')
    this.unsubscribe = onValue(presenceRef, (snapshot) => {
      callback(snapshot.size || 0)
    }) as unknown as () => void
  }

  setEncounterReady(ready: boolean): void {
    if (this.destroyed) return
    const presenceRef = ref(this.db, `presence/${this.userId}/encounterReady`)
    set(presenceRef, ready)
  }

  getUserId(): string {
    return this.userId
  }

  destroy(): void {
    this.destroyed = true
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
    }
    // Fire and forget — onDisconnect handler will clean up if this fails
    const presenceRef = ref(this.db, `presence/${this.userId}`)
    remove(presenceRef).catch(() => {
      // onDisconnect().remove() in goOnline() serves as fallback
    })
  }
}
