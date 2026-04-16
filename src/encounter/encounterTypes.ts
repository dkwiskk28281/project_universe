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

// --- Frequency Link & Communication ---

export interface FrequencyLinkData {
  id: string
  userA: string
  userB: string
  encounteredAt: number
  expiresAt: number
}

export interface CosmicMessageData {
  id: string
  linkId: string
  from: string
  text: string
  sentAt: number
  // Calculated delivery time based on light-speed delay
  arrivesAt: number
}

export interface LocalFrequencyLink {
  linkId: string
  peerId: string
  encounteredAt: number
  expiresAt: number
}

// --- localStorage helpers ---

function generateUUID(): string {
  // Fallback for non-secure contexts (HTTP dev server on iOS Safari)
  // crypto.randomUUID() requires HTTPS on iOS Safari
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    try {
      return crypto.randomUUID()
    } catch { /* fall through */ }
  }
  // Fallback using crypto.getRandomValues (works on HTTP)
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  bytes[6] = (bytes[6] & 0x0f) | 0x40 // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80 // variant 1
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`
}

export function getUserId(): string {
  let id = localStorage.getItem('cosmos-user-id')
  if (!id) {
    id = generateUUID()
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

export function getFrequencyLinks(): LocalFrequencyLink[] {
  try {
    const raw = localStorage.getItem('cosmos-frequency-links')
    if (!raw) return []
    const links: LocalFrequencyLink[] = JSON.parse(raw)
    // Filter out expired links
    const now = Date.now()
    return links.filter((l) => l.expiresAt > now)
  } catch {
    return []
  }
}

export function saveFrequencyLinks(links: LocalFrequencyLink[]) {
  localStorage.setItem('cosmos-frequency-links', JSON.stringify(links))
}

export function addFrequencyLink(link: LocalFrequencyLink) {
  const links = getFrequencyLinks()
  // Avoid duplicates
  if (links.some((l) => l.linkId === link.linkId)) return
  links.push(link)
  saveFrequencyLinks(links)
}
