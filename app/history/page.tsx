"use client"

import { useEffect, useState } from "react"
import { getProgress, UserProgress, LessonRecord } from "@/lib/storage"
import { LESSON_TOPICS } from "@/lib/lessons"
import Link from "next/link"

export default function HistoryPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null)

  useEffect(() => {
    setProgress(getProgress())
  }, [])

  if (!progress) return null

  const allLessons = LESSON_TOPICS.map((topic) => ({
    topic,
    record: progress.records[topic.day] as LessonRecord | undefined,
  }))

  const completed = allLessons.filter((l) => l.record?.completed)
  const inProgress = allLessons.filter((l) => l.record && !l.record.completed && l.record.exercises.length > 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">History</h1>
        <p style={{ color: "#94a3b8" }} className="mt-1 text-sm">
          {completed.length} lessons completed
        </p>
      </div>

      {completed.length === 0 && inProgress.length === 0 && (
        <div style={{ background: "#1e293b", borderRadius: 12, padding: 32, textAlign: "center" }}>
          <p style={{ color: "#94a3b8" }}>還沒有紀錄。去完成第一堂課吧！</p>
          <Link href="/" className="mt-4 inline-block text-sm" style={{ color: "#22c55e" }}>
            Go to Today&apos;s Lesson →
          </Link>
        </div>
      )}

      {inProgress.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold mb-2" style={{ color: "#94a3b8" }}>
            IN PROGRESS
          </h2>
          <div className="space-y-2">
            {inProgress.map(({ topic, record }) => (
              <LessonCard key={topic.day} day={topic.day} title={topic.title} chinese={topic.chineseTitle} record={record} done={false} />
            ))}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold mb-2" style={{ color: "#94a3b8" }}>
            COMPLETED
          </h2>
          <div className="space-y-2">
            {completed.reverse().map(({ topic, record }) => (
              <LessonCard key={topic.day} day={topic.day} title={topic.title} chinese={topic.chineseTitle} record={record} done={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function LessonCard({
  day,
  title,
  chinese,
  record,
  done,
}: {
  day: number
  title: string
  chinese: string
  record?: LessonRecord
  done: boolean
}) {
  const exerciseCount = record?.exercises.length || 0
  const completedAt = record?.completedAt ? new Date(record.completedAt).toLocaleDateString("zh-TW") : null

  return (
    <Link
      href={`/lesson/${day}`}
      className="flex items-center justify-between p-4 rounded-lg transition-all hover:opacity-80"
      style={{ background: "#1e293b" }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">
          Day {day}: {title}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
          {chinese}
          {exerciseCount > 0 && ` · ${exerciseCount} exercises`}
          {completedAt && ` · ${completedAt}`}
        </p>
      </div>
      <span style={{ color: done ? "#22c55e" : "#f59e0b", marginLeft: 12, fontSize: 18 }}>
        {done ? "✓" : "●"}
      </span>
    </Link>
  )
}
