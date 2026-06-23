"use client"

import { useEffect, useState, use } from "react"
import { getLessonByDay, LessonTopic, getStageLabel } from "@/lib/lessons"
import { addExercise, markLessonComplete, getLessonRecord, getActiveLearner, getLearners } from "@/lib/storage"
import Link from "next/link"

interface Pattern {
  pattern: string
  explanation: string
  examples: { english: string; chinese: string }[]
}

interface Exercise {
  type: "translate" | "fill"
  instruction: string
  question: string
  hint?: string
  answer?: string
}

interface LessonData {
  intro: string
  patterns: Pattern[]
  exercises: Exercise[]
  tip: string
}

interface FeedbackData {
  isCorrect: boolean
  correction: string
  explanation: string
  betterVersion: string
  encouragement: string
}

export default function LessonPage({ params }: { params: Promise<{ day: string }> }) {
  const { day: dayStr } = use(params)
  const day = parseInt(dayStr)

  const [topic, setTopic] = useState<LessonTopic | undefined>(undefined)
  const [courseReady, setCourseReady] = useState(false)
  const [courseType, setCourseType] = useState("qc-english")
  const [learnerLevel, setLearnerLevel] = useState("intermediate")
  const [lesson, setLesson] = useState<LessonData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [answers, setAnswers] = useState<string[]>([])
  const [feedbacks, setFeedbacks] = useState<(FeedbackData | null)[]>([])
  const [submitting, setSubmitting] = useState<boolean[]>([])
  const [completed, setCompleted] = useState(false)
  const [question, setQuestion] = useState("")
  const [askAnswer, setAskAnswer] = useState("")
  const [asking, setAsking] = useState(false)

  // Load active learner's course info, then find the correct lesson topic
  useEffect(() => {
    const id = getActiveLearner()
    const learners = getLearners()
    const learner = id ? learners.find((l) => l.id === id) : null
    const ct = learner?.courseType ?? "qc-english"
    const customGoal = learner?.customGoal
    setCourseType(ct)
    setLearnerLevel(learner?.level ?? "intermediate")
    setTopic(getLessonByDay(day, ct, customGoal))
    setCourseReady(true)
  }, [day])

  useEffect(() => {
    if (!courseReady || !topic) return
    const record = getLessonRecord(day)
    if (record?.completed) setCompleted(true)
    fetchLesson()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseReady, day])

  async function fetchLesson() {
    if (!topic) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day, title: topic.title, systemPrompt: topic.systemPrompt, courseType, level: learnerLevel }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setLesson(data.lesson)
      setAnswers(new Array(data.lesson.exercises.length).fill(""))
      setFeedbacks(new Array(data.lesson.exercises.length).fill(null))
      setSubmitting(new Array(data.lesson.exercises.length).fill(false))
    } catch {
      setError("無法載入課程，請稍後再試。")
    } finally {
      setLoading(false)
    }
  }

  async function submitAnswer(index: number) {
    if (!lesson || !topic || !answers[index].trim()) return
    const newSubmitting = [...submitting]
    newSubmitting[index] = true
    setSubmitting(newSubmitting)

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: lesson.exercises[index].question,
          userAnswer: answers[index],
          exerciseType: lesson.exercises[index].type,
          dayTopic: topic.title,
          courseType,
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      const newFeedbacks = [...feedbacks]
      newFeedbacks[index] = data.feedback
      setFeedbacks(newFeedbacks)

      addExercise(
        day,
        {
          question: lesson.exercises[index].question,
          userAnswer: answers[index],
          feedback: data.feedback.explanation,
          timestamp: new Date().toISOString(),
        },
        topic.title,
        topic.week
      )
    } catch {
      alert("無法取得回饋，請稍後再試。")
    } finally {
      const newSubmitting = [...submitting]
      newSubmitting[index] = false
      setSubmitting(newSubmitting)
    }
  }

  async function handleAsk() {
    if (!question.trim() || !topic) return
    setAsking(true)
    setAskAnswer("")
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, dayTopic: topic.title, courseType }),
      })
      const data = await res.json()
      setAskAnswer(data.answer || data.error)
    } catch {
      setAskAnswer("無法取得回答，請稍後再試。")
    } finally {
      setAsking(false)
    }
  }

  function handleComplete() {
    markLessonComplete(day)
    setCompleted(true)
  }

  if (!courseReady) return null

  if (!topic) {
    return (
      <div className="text-center py-20" style={{ color: "#94a3b8" }}>
        <p>找不到 Day {day} 的課程。</p>
        <Link href="/" style={{ color: "#22c55e" }} className="mt-4 inline-block">
          回首頁
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/" style={{ color: "#94a3b8" }} className="text-sm hover:text-white transition-colors">
          ← Back
        </Link>
        {completed && (
          <span
            style={{ background: "#166534", color: "#22c55e", borderRadius: 99, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}
          >
            Completed ✓
          </span>
        )}
      </div>

      <div>
        <p className="text-xs font-medium mb-1" style={{ color: "#22c55e" }}>
          WEEK {topic.week} / {getStageLabel(topic.stage)}
        </p>
        <h1 className="text-2xl font-bold text-white">Day {day}: {topic.title}</h1>
        <p style={{ color: "#94a3b8" }} className="text-sm mt-1">{topic.chineseTitle}</p>
      </div>

      {loading && (
        <div style={{ background: "#1e293b", borderRadius: 12, padding: 32, textAlign: "center" }}>
          <div className="animate-pulse" style={{ color: "#94a3b8" }}>
            <p>AI 正在準備今天的課程...</p>
            <p className="text-xs mt-2">（約需 5-10 秒）</p>
          </div>
        </div>
      )}

      {error && (
        <div style={{ background: "#1e293b", borderRadius: 12, padding: 20, color: "#f87171" }}>
          <p>{error}</p>
          <button
            onClick={fetchLesson}
            className="mt-3 text-sm underline"
            style={{ color: "#22c55e" }}
          >
            重試
          </button>
        </div>
      )}

      {lesson && !loading && (
        <>
          {/* Intro */}
          <div style={{ background: "#1e293b", borderRadius: 12, padding: 20 }}>
            <p style={{ color: "#e2e8f0" }}>{lesson.intro}</p>
          </div>

          {/* Patterns */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold" style={{ color: "#94a3b8" }}>
              TODAY&apos;S PATTERNS
            </h2>
            {lesson.patterns.map((p, i) => (
              <div key={i} style={{ background: "#1e293b", borderRadius: 12, padding: 20 }}>
                <p className="font-mono font-bold text-lg" style={{ color: "#22c55e" }}>
                  {p.pattern}
                </p>
                <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>
                  {p.explanation}
                </p>
                <div className="mt-3 space-y-2">
                  {p.examples.map((ex, j) => (
                    <div key={j} style={{ borderLeft: "3px solid #334155", paddingLeft: 12 }}>
                      <p className="text-white">{ex.english}</p>
                      <p className="text-sm" style={{ color: "#64748b" }}>{ex.chinese}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Exercises */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold" style={{ color: "#94a3b8" }}>
              EXERCISES
            </h2>
            {lesson.exercises.map((ex, i) => (
              <div key={i} style={{ background: "#1e293b", borderRadius: 12, padding: 20 }}>
                <p className="text-xs font-medium mb-1" style={{ color: "#64748b" }}>
                  {i + 1}. {ex.instruction}
                </p>
                <p className="font-medium text-white mb-3">{ex.question}</p>
                {ex.hint && (
                  <p className="text-xs mb-3" style={{ color: "#64748b" }}>
                    Hint: {ex.hint}
                  </p>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={answers[i]}
                    onChange={(e) => {
                      const newAnswers = [...answers]
                      newAnswers[i] = e.target.value
                      setAnswers(newAnswers)
                    }}
                    onKeyDown={(e) => e.key === "Enter" && submitAnswer(i)}
                    placeholder="Type your answer..."
                    className="flex-1 rounded-lg px-4 py-2 text-sm outline-none"
                    style={{
                      background: "#0f172a",
                      border: "1px solid #334155",
                      color: "#f1f5f9",
                    }}
                  />
                  <button
                    onClick={() => submitAnswer(i)}
                    disabled={submitting[i] || !answers[i].trim()}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={{
                      background: submitting[i] ? "#166534" : "#22c55e",
                      color: "#0f172a",
                      opacity: !answers[i].trim() ? 0.5 : 1,
                    }}
                  >
                    {submitting[i] ? "..." : "Submit"}
                  </button>
                </div>

                {feedbacks[i] && (
                  <div
                    className="mt-3 p-3 rounded-lg text-sm space-y-1"
                    style={{
                      background: feedbacks[i]!.isCorrect ? "#052e16" : "#1c1917",
                      border: `1px solid ${feedbacks[i]!.isCorrect ? "#166534" : "#44403c"}`,
                    }}
                  >
                    <p style={{ color: feedbacks[i]!.isCorrect ? "#22c55e" : "#f87171" }}>
                      {feedbacks[i]!.isCorrect ? "✓ Correct!" : "✗ Not quite"}
                    </p>
                    {feedbacks[i]!.correction && (
                      <p style={{ color: "#e2e8f0" }}>
                        Answer: <span className="font-mono font-semibold">{feedbacks[i]!.correction}</span>
                      </p>
                    )}
                    <p style={{ color: "#94a3b8" }}>{feedbacks[i]!.explanation}</p>
                    {feedbacks[i]!.betterVersion && (
                      <p style={{ color: "#64748b" }}>
                        Better: <span style={{ color: "#e2e8f0" }}>{feedbacks[i]!.betterVersion}</span>
                      </p>
                    )}
                    <p style={{ color: "#4ade80" }} className="text-xs">
                      {feedbacks[i]!.encouragement}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tip */}
          <div
            style={{
              background: "#1e293b",
              borderRadius: 12,
              padding: 20,
              borderLeft: "4px solid #22c55e",
            }}
          >
            <p className="text-xs font-semibold mb-1" style={{ color: "#22c55e" }}>
              PRACTICAL TIP
            </p>
            <p className="text-sm" style={{ color: "#e2e8f0" }}>
              {lesson.tip}
            </p>
          </div>

          {/* Ask a Question */}
          <div style={{ background: "#1e293b", borderRadius: 12, padding: 20 }}>
            <h2 className="text-sm font-semibold mb-3" style={{ color: "#94a3b8" }}>
              HAVE A QUESTION?
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                placeholder="問我任何問題..."
                className="flex-1 rounded-lg px-4 py-2 text-sm outline-none"
                style={{
                  background: "#0f172a",
                  border: "1px solid #334155",
                  color: "#f1f5f9",
                }}
              />
              <button
                onClick={handleAsk}
                disabled={asking || !question.trim()}
                className="px-4 py-2 rounded-lg text-sm font-semibold"
                style={{
                  background: "#334155",
                  color: "#f1f5f9",
                  opacity: !question.trim() ? 0.5 : 1,
                }}
              >
                {asking ? "..." : "Ask"}
              </button>
            </div>
            {askAnswer && (
              <div className="mt-3 p-3 rounded-lg text-sm" style={{ background: "#0f172a", color: "#e2e8f0" }}>
                {askAnswer}
              </div>
            )}
          </div>

          {/* Complete Button */}
          {!completed && (
            <button
              onClick={handleComplete}
              className="w-full py-3 rounded-lg font-semibold text-center transition-all hover:opacity-90"
              style={{ background: "#22c55e", color: "#0f172a" }}
            >
              Mark as Complete
            </button>
          )}

          {completed && (
            <Link
              href="/"
              className="block w-full py-3 rounded-lg font-semibold text-center"
              style={{ background: "#166534", color: "#22c55e" }}
            >
              ✓ Completed — Go to Next Lesson
            </Link>
          )}
        </>
      )}
    </div>
  )
}
