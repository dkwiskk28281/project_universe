export interface PresenceData {
  status: 'online'
  lastSeen: number
  encounterReady: boolean
  sessionStart: number
}

export interface EncounterPending {
  initiator: string
  target: string
  timestamp: number
  status: 'proposed' | 'accepted'
}

export interface EncounterRecord {
  userA: string
  userB: string
  timestamp: number
  duration: number
}

export function getUserId(): string {
  let id = localStorage.getItem('cosmos-user-id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('cosmos-user-id', id)
  }
  return id
}

export function getCooldownEnd(): number {
  return parseInt(localStorage.getItem('cosmos-cooldown-end') || '0', 10)
}

export function setCooldownEnd(timestamp: number) {
  localStorage.setItem('cosmos-cooldown-end', String(timestamp))
}
