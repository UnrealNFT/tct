import { Duel } from './types'

const DUELS_KEY = 'tct_duels'
const VOTES_KEY = 'tct_votes'

export function getDuels(): Duel[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(DUELS_KEY)
  return raw ? JSON.parse(raw) : []
}

export function saveDuels(duels: Duel[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(DUELS_KEY, JSON.stringify(duels))
}

export function getVotes(): Record<string, 'A' | 'B'> {
  if (typeof window === 'undefined') return {}
  const raw = localStorage.getItem(VOTES_KEY)
  return raw ? JSON.parse(raw) : {}
}

export function saveVotes(votes: Record<string, 'A' | 'B'>): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes))
}

export function createDuel(duel: Duel): void {
  const duels = getDuels()
  duels.unshift(duel)
  saveDuels(duels)
}

export function voteDuel(duelId: string, option: 'A' | 'B'): void {
  const votes = getVotes()
  const previous = votes[duelId]

  const duels = getDuels().map((d) => {
    if (d.id !== duelId) return d
    const next = { ...d }
    if (previous === 'A') next.votesA -= 1
    if (previous === 'B') next.votesB -= 1
    if (option === 'A') next.votesA += 1
    if (option === 'B') next.votesB += 1
    return next
  })

  votes[duelId] = option
  saveDuels(duels)
  saveVotes(votes)
}
