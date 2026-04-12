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
