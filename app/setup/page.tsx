"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { saveLearner, setActiveLearner, Learner } from "@/lib/storage"

const COURSE_TYPES = [
  { id: "qc-english", label: "工廠/品質英文", desc: "QC、供應商、品質報告", emoji: "🏭" },
  { id: "daily", label: "日常對話", desc: "生活、社交、購物", emoji: "💬" },
  { id: "business", label: "商業英文", desc: "會議、簡報、談判", emoji: "💼" },
  { id: "travel", label: "旅遊英文", desc: "機場、飯店、觀光", emoji: "✈️" },
  { id: "custom", label: "自訂課程", desc: "告訴我你想學什麼", emoji: "✏️" },
]

const QUESTIONS = [
  { q: "She ___ to school every day.", opts: ["go", "goes", "going", "gone"], ans: 1 },
  { q: "We ___ the parts yesterday.", opts: ["check", "checks", "checked", "checking"], ans: 2 },
  { q: "The material ___ not ready yet.", opts: ["am", "is", "are", "be"], ans: 1 },
  { q: "___ you please send the report by Friday?", opts: ["Will", "Can", "Could", "Should"], ans: 2 },
  { q: "The parts were rejected ___ they did not meet the specification.", opts: ["so", "because", "although", "however"], ans: 1 },
  { q: "We need to follow ___ on this issue.", opts: ["in", "out", "up", "over"], ans: 2 },
  { q: "___ the customer replied to our email?", opts: ["Did", "Does", "Has", "Is"], ans: 2 },
  { q: "The report ___ submitted last week.", opts: ["is", "was", "has", "were"], ans: 1 },
  { q: "She suggested that he ___ the SOP immediately.", opts: ["updates", "updated", "update", "updating"], ans: 2 },
  { q: "Based on our findings, we ___ that the issue is a process error.", opts: ["thinks", "believe", "knows", "considers"], ans: 1 },
]

function getLevel(score: number): { level: Learner["level"]; startDay: number; label: string; desc: string; color: string } {
  if (score <= 3) return { level: "beginner", startDay: 1, label: "初學者", desc: "從基礎開始，打好英文底子", color: "#3b82f6" }
  if (score <= 7) return { level: "intermediate", startDay: 8, label: "中級", desc: "從句型練習開始，快速提升", color: "#22c55e" }
  return { level: "advanced", startDay: 15, label: "進階", desc: "直接挑戰閱讀與寫作課程", color: "#f59e0b" }
}

function generateId(name: string): string {
  const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "user"
  return `${slug}-${Date.now().toString(36)}`
}

export default function SetupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [courseType, setCourseType] = useState("qc-english")
  const [customGoal, setCustomGoal] = useState("")
  const [selections, setSelections] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null))
  const [score, setScore] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  function handleAssessmentSubmit() {
    const correct = selections.reduce<number>((acc, sel, i) => acc + (sel === QUESTIONS[i].ans ? 1 : 0), 0)
    setScore(correct)
    setSubmitted(true)
    setStep(4)
  }

  function handleFinish() {
    const result = getLevel(score)
    const learner: Learner = {
      id: generateId(name.trim()),
      name: name.trim(),
      courseType,
      level: result.level,
      startDay: result.startDay,
      assessmentScore: score,
      customGoal: courseType === "custom" ? customGoal.trim() : undefined,
      createdAt: new Date().toISOString(),
    }
    saveLearner(learner)
    setActiveLearner(learner.id)
    router.push("/dashboard")
  }

  const canProceedStep2 = courseType !== "custom" || customGoal.trim().length >= 10
  const allAnswered = selections.every((s) => s !== null)
  const result = submitted ? getLevel(score) : null

  return (
    <div className="max-w-xl mx-auto py-8 space-y-6">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              style={{
                width: 28, height: 28, borderRadius: "50%",
                background: step >= s ? "#22c55e" : "#334155",
                color: step >= s ? "#0f172a" : "#64748b",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, transition: "background 0.3s",
              }}
            >
              {s}
            </div>
            {s < 4 && (
              <div style={{ width: 32, height: 2, background: step > s ? "#22c55e" : "#334155", transition: "background 0.3s" }} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1 — Name */}
      {step === 1 && (
        <div style={{ background: "#1e293b", borderRadius: 16, padding: 32 }} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">你叫什麼名字？</h2>
            <p className="text-sm" style={{ color: "#64748b" }}>這個名字會顯示在學習者選擇畫面</p>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && name.trim() && setStep(2)}
            placeholder="輸入你的名字或暱稱..."
            autoFocus
            className="w-full rounded-lg px-4 py-3 text-sm outline-none"
            style={{ background: "#0f172a", border: "1px solid #334155", color: "#f1f5f9", fontSize: 16 }}
          />
          <button
            disabled={!name.trim()}
            onClick={() => setStep(2)}
            className="w-full py-3 rounded-lg font-semibold transition-all"
            style={{ background: "#22c55e", color: "#0f172a", opacity: !name.trim() ? 0.4 : 1 }}
          >
            繼續 →
          </button>
        </div>
      )}

      {/* Step 2 — Course Type */}
      {step === 2 && (
        <div style={{ background: "#1e293b", borderRadius: 16, padding: 32 }} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">選擇課程類型</h2>
            <p className="text-sm" style={{ color: "#64748b" }}>你想學習哪種英文？</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {COURSE_TYPES.map((ct) => (
              <button
                key={ct.id}
                onClick={() => setCourseType(ct.id)}
                className="relative text-left rounded-xl p-4 transition-all"
                style={{
                  background: courseType === ct.id ? "#0f4c23" : "#0f172a",
                  border: `2px solid ${courseType === ct.id ? "#22c55e" : "#334155"}`,
                }}
              >
                <div className="text-2xl mb-2">{ct.emoji}</div>
                <p className="font-semibold text-white text-sm">{ct.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{ct.desc}</p>
              </button>
            ))}
          </div>

          {courseType === "custom" && (
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: "#94a3b8" }}>
                描述你的學習需求（至少 10 個字）
              </p>
              <textarea
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                placeholder="例如：我想學習如何跟外國客戶討論產品設計需求，需要能用英文開會、寫信…"
                rows={4}
                className="w-full rounded-lg px-4 py-3 text-sm outline-none resize-none"
                style={{ background: "#0f172a", border: "1px solid #334155", color: "#f1f5f9" }}
              />
              <p className="text-xs mt-1" style={{ color: customGoal.trim().length >= 10 ? "#22c55e" : "#64748b" }}>
                {customGoal.trim().length} / 10 個字以上
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 rounded-lg font-semibold"
              style={{ background: "#334155", color: "#94a3b8" }}
            >
              ← 返回
            </button>
            <button
              disabled={!canProceedStep2}
              onClick={() => setStep(3)}
              className="flex-1 py-3 rounded-lg font-semibold"
              style={{ background: "#22c55e", color: "#0f172a", opacity: canProceedStep2 ? 1 : 0.4 }}
            >
              繼續 →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Assessment */}
      {step === 3 && (
        <div className="space-y-4">
          <div style={{ background: "#1e293b", borderRadius: 16, padding: "24px 28px" }}>
            <h2 className="text-2xl font-bold text-white mb-1">英文程度評估</h2>
            <p className="text-sm" style={{ color: "#64748b" }}>
              回答以下 10 題，幫助我們為你安排最適合的課程難易度
            </p>
          </div>

          {QUESTIONS.map((q, i) => (
            <div key={i} style={{ background: "#1e293b", borderRadius: 12, padding: "20px 24px" }}>
              <p className="text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
                第 {i + 1} 題 / 共 10 題
              </p>
              <p className="text-white font-medium mb-4">{q.q}</p>
              <div className="grid grid-cols-2 gap-2">
                {q.opts.map((opt, j) => (
                  <button
                    key={j}
                    onClick={() => {
                      const next = [...selections]
                      next[i] = j
                      setSelections(next)
                    }}
                    className="text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: selections[i] === j ? "#0f4c23" : "#0f172a",
                      border: `1.5px solid ${selections[i] === j ? "#22c55e" : "#334155"}`,
                      color: selections[i] === j ? "#22c55e" : "#94a3b8",
                    }}
                  >
                    {String.fromCharCode(65 + j)}. {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="py-3 px-6 rounded-lg font-semibold"
              style={{ background: "#334155", color: "#94a3b8" }}
            >
              ← 返回
            </button>
            <button
              disabled={!allAnswered}
              onClick={handleAssessmentSubmit}
              className="flex-1 py-3 rounded-lg font-semibold transition-all"
              style={{ background: "#22c55e", color: "#0f172a", opacity: allAnswered ? 1 : 0.4 }}
            >
              {allAnswered ? "提交評估" : `還有 ${selections.filter((s) => s === null).length} 題未作答`}
            </button>
          </div>
        </div>
      )}

      {/* Step 4 — Result */}
      {step === 4 && result && (
        <div style={{ background: "#1e293b", borderRadius: 16, padding: 36 }} className="text-center space-y-6">
          <div>
            <div className="text-5xl font-bold mb-3" style={{ color: result.color }}>
              {score}/10
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">你的程度：{result.label}</h2>
            <p className="text-sm" style={{ color: "#94a3b8" }}>{result.desc}</p>
          </div>

          <div
            className="rounded-xl p-5 text-left"
            style={{ background: "#0f172a", border: `1px solid ${result.color}44` }}
          >
            <p className="text-xs font-semibold mb-1" style={{ color: result.color }}>課程安排</p>
            <p className="text-white font-semibold">從 Day {result.startDay} 開始</p>
            {courseType === "custom" && customGoal && (
              <p className="text-xs mt-1" style={{ color: "#64748b" }}>
                客製化目標：{customGoal.trim()}
              </p>
            )}
          </div>

          <div style={{ background: "#0f172a", borderRadius: 12, padding: "12px 20px" }}>
            <p className="text-xs" style={{ color: "#64748b" }}>
              學習者：<span className="text-white font-semibold">{name}</span>
            </p>
          </div>

          <button
            onClick={handleFinish}
            className="w-full py-3 rounded-lg font-semibold text-lg transition-all hover:opacity-90"
            style={{ background: result.color, color: "#0f172a" }}
          >
            開始學習 →
          </button>
        </div>
      )}
    </div>
  )
}
