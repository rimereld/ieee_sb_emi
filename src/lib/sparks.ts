import { useSyncExternalStore } from "react"

/**
 * "Catch the sparks" — a small treasure hunt for the shine light.
 * Sparks are hidden across the site; sweeping the light over one (or tapping it)
 * collects it. Progress lives in this browser only (localStorage) and the site
 * works the same if storage is unavailable.
 */

export const SPARKS = [
  { id: "home-hero", where: "Home · the opening" },
  { id: "home-plan", where: "Home · the plan" },
  { id: "home-network", where: "Home · the network" },
  { id: "about-crew", where: "About · meet the crew" },
  { id: "projects-launch", where: "Projects · Hult Prize" },
  { id: "footer", where: "The footer" },
] as const

export type SparkId = (typeof SPARKS)[number]["id"]
export const TOTAL_SPARKS = SPARKS.length

const KEY = "ieee-emi:sparks"
const CELEBRATED_KEY = "ieee-emi:sparks-celebrated"

function read(): SparkId[] {
  try {
    const raw = localStorage.getItem(KEY)
    const list = raw ? (JSON.parse(raw) as string[]) : []
    return SPARKS.map((s) => s.id).filter((id) => list.includes(id))
  } catch {
    return []
  }
}

let collected: SparkId[] = typeof window === "undefined" ? [] : read()
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(collected))
  } catch {
    /* private mode etc. — the game still works for this visit */
  }
}

export function collectSpark(id: SparkId) {
  if (collected.includes(id)) return
  collected = [...collected, id]
  save()
  emit()
  window.dispatchEvent(new CustomEvent("spark:collected", { detail: { id, count: collected.length } }))
}

export function resetSparks() {
  collected = []
  try {
    localStorage.removeItem(KEY)
    localStorage.removeItem(CELEBRATED_KEY)
  } catch {
    /* ignore */
  }
  emit()
}

export function wasCelebrated(): boolean {
  try {
    return localStorage.getItem(CELEBRATED_KEY) === "1"
  } catch {
    return false
  }
}

export function markCelebrated() {
  try {
    localStorage.setItem(CELEBRATED_KEY, "1")
  } catch {
    /* ignore */
  }
}

const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useSparks() {
  return useSyncExternalStore(subscribe, () => collected, () => collected)
}
