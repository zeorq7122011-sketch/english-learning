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

const STORAGE_KEY = "english_learning_progress"

export function getProgress(): UserProgress {
  if (typeof window === "undefined") return { currentDay: 8, records: {} }
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return { currentDay: 8, records: {} }
  return JSON.parse(raw)
}

export function saveProgress(progress: UserProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
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
  if (progress.records[day]) {
    progress.records[day].completed = true
    progress.records[day].completedAt = new Date().toISOString()
  }
  if (day === progress.currentDay) {
    progress.currentDay = day + 1
  }
  saveProgress(progress)
}

export function setCurrentDay(day: number): void {
  const progress = getProgress()
  progress.currentDay = day
  saveProgress(progress)
}
