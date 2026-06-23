export interface ExerciseRecord {
  question: string
  userAnswer: string
  feedback: string
  timestamp: string
}

export interface LessonRecord {
  day: number
  week: number
  title: string
  completed: boolean
  completedAt?: string
  exercises: ExerciseRecord[]
}

export interface UserProgress {
  currentDay: number
  records: Record<number, LessonRecord>
}

export interface Learner {
  id: string
  name: string
  courseType: string
  level: "beginner" | "intermediate" | "advanced"
  startDay: number
  assessmentScore?: number
  pin?: string
  customGoal?: string
  createdAt: string
}

const STORAGE_KEY = "english_learning_progress"
const LEARNERS_KEY = "english_learners"
const ACTIVE_LEARNER_KEY = "active_learner"

function getProgressKey(): string {
  const id = getActiveLearner()
  if (!id || id === "boxing") return STORAGE_KEY
  return `${STORAGE_KEY}_${id}`
}

function buildDefaultProgress(): UserProgress {
  const records: Record<number, LessonRecord> = {}
  for (let d = 1; d <= 7; d++) {
    records[d] = {
      day: d,
      week: 1,
      title: `Day ${d}`,
      completed: true,
      completedAt: new Date("2026-06-07").toISOString(),
      exercises: [],
    }
  }
  return { currentDay: 8, records }
}

export function getLearners(): Learner[] {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem(LEARNERS_KEY)
  if (!raw) {
    const boxing: Learner = {
      id: "boxing",
      name: "Boxing",
      courseType: "qc-english",
      level: "intermediate",
      startDay: 1,
      createdAt: new Date("2026-06-01").toISOString(),
    }
    localStorage.setItem(LEARNERS_KEY, JSON.stringify([boxing]))
    return [boxing]
  }
  return JSON.parse(raw)
}

export function saveLearner(learner: Learner): void {
  const learners = getLearners()
  const idx = learners.findIndex((l) => l.id === learner.id)
  if (idx >= 0) {
    learners[idx] = learner
  } else {
    learners.push(learner)
  }
  localStorage.setItem(LEARNERS_KEY, JSON.stringify(learners))
  syncToServer()
}

export function getActiveLearner(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(ACTIVE_LEARNER_KEY)
}

export function setActiveLearner(id: string): void {
  localStorage.setItem(ACTIVE_LEARNER_KEY, id)
}

export function getProgressForLearner(learnerId: string): UserProgress {
  if (typeof window === "undefined") return buildDefaultProgress()
  const key = learnerId === "boxing" ? STORAGE_KEY : `${STORAGE_KEY}_${learnerId}`
  const raw = localStorage.getItem(key)
  if (!raw) {
    if (learnerId === "boxing") return buildDefaultProgress()
    const learners = getLearners()
    const learner = learners.find((l) => l.id === learnerId)
    return { currentDay: learner?.startDay ?? 1, records: {} }
  }
  return JSON.parse(raw)
}

export function getProgress(): UserProgress {
  if (typeof window === "undefined") return buildDefaultProgress()
  const key = getProgressKey()
  const raw = localStorage.getItem(key)
  if (!raw) {
    const learnerId = getActiveLearner()
    let defaultProgress: UserProgress
    if (!learnerId || learnerId === "boxing") {
      defaultProgress = buildDefaultProgress()
    } else {
      const learners = getLearners()
      const learner = learners.find((l) => l.id === learnerId)
      defaultProgress = { currentDay: learner?.startDay ?? 1, records: {} }
    }
    localStorage.setItem(key, JSON.stringify(defaultProgress))
    return defaultProgress
  }
  return JSON.parse(raw)
}

export function saveProgress(progress: UserProgress): void {
  localStorage.setItem(getProgressKey(), JSON.stringify(progress))
  syncToServer()
}

function syncToServer(): void {
  if (typeof window === "undefined") return
  const id = getActiveLearner() ?? "boxing"
  const progress = getProgress()
  const learners = getLearners()
  fetch("/api/sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, progress, learners }),
  }).catch(() => {})
}

export async function hydrateFromServer(): Promise<void> {
  if (typeof window === "undefined") return
  try {
    const id = getActiveLearner() ?? "boxing"
    const res = await fetch(`/api/sync?id=${encodeURIComponent(id)}`)
    if (!res.ok) return
    const { progress, learners } = await res.json()

    if (progress) {
      const key = id === "boxing" ? STORAGE_KEY : `${STORAGE_KEY}_${id}`
      const localRaw = localStorage.getItem(key)
      const local: UserProgress | null = localRaw ? JSON.parse(localRaw) : null
      const serverBetter =
        !local ||
        progress.currentDay > local.currentDay ||
        Object.keys(progress.records).length > Object.keys(local.records).length
      if (serverBetter) localStorage.setItem(key, JSON.stringify(progress))
    }

    if (learners && Array.isArray(learners)) {
      const localRaw = localStorage.getItem(LEARNERS_KEY)
      const local: unknown[] = localRaw ? JSON.parse(localRaw) : []
      if (learners.length >= local.length) {
        localStorage.setItem(LEARNERS_KEY, JSON.stringify(learners))
      }
    }
  } catch {
    // offline — use localStorage
  }
}

export function getLessonRecord(day: number): LessonRecord | null {
  const progress = getProgress()
  return progress.records[day] || null
}

export function saveLessonRecord(day: number, record: LessonRecord): void {
  const progress = getProgress()
  progress.records[day] = record
  saveProgress(progress)
}

export function addExercise(day: number, exercise: ExerciseRecord, lessonTitle: string, week: number): void {
  const progress = getProgress()
  if (!progress.records[day]) {
    progress.records[day] = { day, week, title: lessonTitle, completed: false, exercises: [] }
  }
  progress.records[day].exercises.push(exercise)
  saveProgress(progress)
}

export function markLessonComplete(day: number): void {
  const progress = getProgress()
  if (!progress.records[day]) {
    progress.records[day] = { day, week: Math.ceil(day / 7), title: `Day ${day}`, completed: false, exercises: [] }
  }
  progress.records[day].completed = true
  progress.records[day].completedAt = new Date().toISOString()
  if (day >= progress.currentDay) {
    progress.currentDay = day + 1
  }
  saveProgress(progress)
}

export function setCurrentDay(day: number): void {
  const progress = getProgress()
  progress.currentDay = day
  saveProgress(progress)
}
