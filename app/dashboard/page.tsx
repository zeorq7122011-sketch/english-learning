"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getProgress, UserProgress, getActiveLearner, getLearners, Learner } from "@/lib/storage"
import { getLessonsForCourse, getStageLabel } from "@/lib/lessons"
import Link from "next/link"

const COURSE_LABEL: Record<string, string> = {
  "qc-english": "工廠/品質英文",
  daily: "日常對話",
  business: "商業英文",
  travel: "旅遊英文",
  custom: "自訂課程",
}

const OTHER_COURSES = [
  { id: "qc-english", label: "工廠/品質英文", emoji: "🏭" },
  { id: "daily", label: "日常對話", emoji: "💬" },
  { id: "business", label: "商業英文", emoji: "💼" },
  { id: "travel", label: "旅遊英文", emoji: "✈️" },
  { id: "custom", label: "自訂課程", emoji: "✏️" },
]

export default function Dashboard() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [learner, setLearner] = useState<Learner | null>(null)
  const router = useRouter()

  useEffect(() => {
    const id = getActiveLearner()
    if (!id) { router.replace("/"); return }
    const learners = getLearners()
    const found = learners.find((l) => l.id === id) ?? null
    setLearner(found)
    setProgress(getProgress())
  }, [router])

  if (!progress || !learner) return null

  const lessons = getLessonsForCourse(learner.courseType, learner.customGoal)
  const currentDay = progress.currentDay
  const currentLesson = lessons.find((l) => l.day === currentDay)
  const completedDays = Object.values(progress.records).filter((r) => r.completed).length
  const totalDays = lessons.length
  const streak = getStreak(progress)
  const allDone = completedDays >= totalDays

  const otherCourses = OTHER_COURSES.filter((c) => c.id !== learner.courseType)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Welcome back, {learner.name}!</h1>
        <p style={{ color: "#94a3b8" }} className="mt-1 text-sm">
          {COURSE_LABEL[learner.courseType] ?? learner.courseType}
          {learner.customGoal && (
            <span style={{ color: "#64748b" }}> — {learner.customGoal}</span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Day" value={String(currentDay)} />
        <StatCard label="Completed" value={`${completedDays}/${totalDays}`} />
        <StatCard label="Streak" value={`${streak}d`} />
      </div>

      <div style={{ background: "#1e293b", borderRadius: 12, padding: "16px 20px" }}>
        <div className="flex justify-between text-xs mb-2" style={{ color: "#94a3b8" }}>
          <span>Overall Progress</span>
          <span>{Math.round((completedDays / totalDays) * 100)}%</span>
        </div>
        <div style={{ background: "#334155", borderRadius: 99, height: 8 }}>
          <div
            style={{
              background: "#22c55e",
              borderRadius: 99,
              height: 8,
              width: `${(completedDays / totalDays) * 100}%`,
              transition: "width 0.5s ease",
            }}
          />
        </div>
      </div>

      {/* Course Completed Banner */}
      {allDone && (
        <div
          style={{
            background: "linear-gradient(135deg, #052e16, #0f4c23)",
            border: "1px solid #22c55e",
            borderRadius: 16,
            padding: "24px",
          }}
        >
          <p className="text-3xl mb-2">🎉</p>
          <h2 className="text-xl font-bold text-white mb-1">恭喜完成所有課程！</h2>
          <p className="text-sm mb-4" style={{ color: "#86efac" }}>
            你已經完成了{COURSE_LABEL[learner.courseType] ?? "這套課程"}的全部 {totalDays} 天！
          </p>
          <p className="text-xs font-semibold mb-3" style={{ color: "#4ade80" }}>繼續挑戰其他課程：</p>
          <div className="flex flex-wrap gap-2">
            {otherCourses.map((c) => (
              <Link
                key={c.id}
                href={`/setup?course=${c.id}`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
                style={{ background: "#166534", color: "#22c55e" }}
              >
                {c.emoji} {c.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Today's Lesson */}
      {!allDone && currentLesson && (
        <div
          style={{
            background: "#1e293b",
            border: "1px solid #22c55e",
            borderRadius: 12,
            padding: "20px",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium mb-1" style={{ color: "#22c55e" }}>
                TODAY — WEEK {currentLesson.week} / {getStageLabel(currentLesson.stage)}
              </p>
              <h2 className="text-xl font-bold text-white">
                Day {currentDay}: {currentLesson.title}
              </h2>
              <p style={{ color: "#94a3b8" }} className="text-sm mt-1">{currentLesson.chineseTitle}</p>
            </div>
            <span
              style={{
                background: "#166534", color: "#22c55e", borderRadius: 99,
                padding: "4px 12px", fontSize: 12, fontWeight: 600,
              }}
            >
              Today
            </span>
          </div>
          <Link
            href={`/lesson/${currentDay}`}
            className="block mt-4 text-center font-semibold py-3 rounded-lg transition-all hover:opacity-90"
            style={{ background: "#22c55e", color: "#0f172a" }}
          >
            Start Today&apos;s Lesson
          </Link>
        </div>
      )}

      {/* Recent Lessons */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "#94a3b8" }}>
          RECENT LESSONS
        </h3>
        <div className="space-y-2">
          {lessons
            .filter((l) => l.day < currentDay)
            .slice(-5)
            .reverse()
            .map((lesson) => {
              const record = progress.records[lesson.day]
              const done = record?.completed
              return (
                <Link
                  key={lesson.day}
                  href={`/lesson/${lesson.day}`}
                  className="flex items-center justify-between p-4 rounded-lg transition-all hover:opacity-80"
                  style={{ background: "#1e293b" }}
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      Day {lesson.day}: {lesson.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                      {lesson.chineseTitle}
                    </p>
                  </div>
                  <span style={{ color: done ? "#22c55e" : "#64748b", fontSize: 18 }}>
                    {done ? "✓" : "○"}
                  </span>
                </Link>
              )
            })}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: "#1e293b", borderRadius: 12, padding: "16px" }} className="text-center">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs mt-1" style={{ color: "#94a3b8" }}>{label}</p>
    </div>
  )
}

function getStreak(progress: UserProgress): number {
  const records = Object.values(progress.records).filter((r) => r.completed && r.completedAt)
  if (records.length === 0) return 0
  const dates = records
    .map((r) => new Date(r.completedAt!).toDateString())
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  let streak = 0
  const today = new Date()
  for (let i = 0; i < dates.length; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    if (dates[i] === d.toDateString()) streak++
    else break
  }
  return streak
}
