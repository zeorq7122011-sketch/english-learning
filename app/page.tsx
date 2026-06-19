"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { getLearners, saveLearner, Learner, setActiveLearner, getProgressForLearner } from "@/lib/storage"
import { getLessonsForCourse } from "@/lib/lessons"
import Link from "next/link"

const LEVEL_COLOR: Record<string, string> = {
  beginner: "#3b82f6",
  intermediate: "#22c55e",
  advanced: "#f59e0b",
}

const LEVEL_LABEL: Record<string, string> = {
  beginner: "初學者",
  intermediate: "中級",
  advanced: "進階",
}

const COURSE_LABEL: Record<string, string> = {
  "qc-english": "工廠/品質英文",
  daily: "日常對話",
  business: "商業英文",
  travel: "旅遊英文",
}

export default function LearnerSelector() {
  const [learners, setLearners] = useState<Learner[]>([])
  const [modal, setModal] = useState<Learner | null>(null)
  const [pin, setPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [error, setError] = useState("")
  const [shake, setShake] = useState(false)
  const pinRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    setLearners(getLearners())
  }, [])

  useEffect(() => {
    if (modal) setTimeout(() => pinRef.current?.focus(), 50)
  }, [modal])

  function openModal(learner: Learner) {
    setModal(learner)
    setPin("")
    setConfirmPin("")
    setError("")
  }

  function closeModal() {
    setModal(null)
    setPin("")
    setConfirmPin("")
    setError("")
  }

  function triggerShake() {
    setShake(true)
    setTimeout(() => setShake(false), 400)
  }

  function handleSetupPin() {
    if (pin.length < 4) {
      setError("密碼至少需要 4 個字元")
      triggerShake()
      return
    }
    if (pin !== confirmPin) {
      setError("兩次輸入的密碼不一致")
      setConfirmPin("")
      triggerShake()
      return
    }
    const updated = { ...modal!, pin }
    saveLearner(updated)
    setActiveLearner(updated.id)
    router.push("/dashboard")
  }

  function handleEnterPin() {
    if (pin !== modal!.pin) {
      setError("密碼錯誤，請再試一次")
      setPin("")
      triggerShake()
      pinRef.current?.focus()
      return
    }
    setActiveLearner(modal!.id)
    router.push("/dashboard")
  }

  const isSetup = modal && !modal.pin

  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ background: "#0f172a", padding: "40px 24px" }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">選擇學習者</h1>
        <p className="text-sm mb-12" style={{ color: "#64748b" }}>
          選擇你的帳號，繼續學習
        </p>

        <div className="flex flex-wrap justify-center gap-5" style={{ maxWidth: 640 }}>
          {learners.map((learner) => {
            const progress = getProgressForLearner(learner.id)
            const completed = Object.values(progress.records).filter((r) => r.completed).length
            const total = getLessonsForCourse(learner.courseType, learner.customGoal).length
            const pct = Math.round((completed / total) * 100)
            const color = LEVEL_COLOR[learner.level] ?? "#22c55e"

            return (
              <button
                key={learner.id}
                onClick={() => openModal(learner)}
                className="flex flex-col items-center rounded-xl transition-all"
                style={{
                  background: "#1e293b",
                  border: "2px solid #334155",
                  padding: "28px 24px",
                  width: 170,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = color
                  e.currentTarget.style.transform = "scale(1.04)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#334155"
                  e.currentTarget.style.transform = "scale(1)"
                }}
              >
                <div className="relative mb-3">
                  <div
                    className="flex items-center justify-center text-2xl font-bold"
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: `${color}22`,
                      color,
                    }}
                  >
                    {learner.name[0].toUpperCase()}
                  </div>
                  {learner.pin && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        fontSize: 14,
                        lineHeight: 1,
                      }}
                    >
                      🔒
                    </span>
                  )}
                </div>
                <p className="font-semibold text-white text-sm mb-0.5">{learner.name}</p>
                <p className="text-xs mb-1" style={{ color: "#64748b" }}>
                  {COURSE_LABEL[learner.courseType] ?? learner.courseType}
                </p>
                <span
                  className="text-xs px-2 py-0.5 rounded-full mb-3"
                  style={{ background: `${color}22`, color }}
                >
                  {LEVEL_LABEL[learner.level] ?? learner.level}
                </span>
                <div style={{ width: "100%", background: "#334155", borderRadius: 99, height: 4 }}>
                  <div
                    style={{ width: `${pct}%`, background: color, borderRadius: 99, height: 4, transition: "width 0.4s" }}
                  />
                </div>
                <p className="text-xs mt-1" style={{ color: "#64748b" }}>
                  {pct}% 完成
                </p>
              </button>
            )
          })}

          <Link
            href="/setup"
            className="flex flex-col items-center justify-center rounded-xl transition-all"
            style={{
              background: "#1e293b",
              border: "2px dashed #334155",
              padding: "28px 24px",
              width: 170,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#22c55e"
              e.currentTarget.style.transform = "scale(1.04)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#334155"
              e.currentTarget.style.transform = "scale(1)"
            }}
          >
            <div
              className="flex items-center justify-center text-3xl mb-3"
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#0f172a",
                color: "#64748b",
              }}
            >
              +
            </div>
            <p className="text-sm font-semibold" style={{ color: "#94a3b8" }}>
              新增學習者
            </p>
          </Link>
        </div>
      </div>

      {/* PIN Modal */}
      {modal && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", zIndex: 50 }}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div
            style={{
              background: "#1e293b",
              borderRadius: 20,
              padding: "36px 32px",
              width: "100%",
              maxWidth: 360,
              border: "1px solid #334155",
              animation: shake ? "shake 0.4s ease" : undefined,
            }}
          >
            {/* Learner avatar */}
            <div className="flex flex-col items-center mb-6">
              <div
                className="flex items-center justify-center text-2xl font-bold mb-3"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: `${LEVEL_COLOR[modal.level] ?? "#22c55e"}22`,
                  color: LEVEL_COLOR[modal.level] ?? "#22c55e",
                }}
              >
                {modal.name[0].toUpperCase()}
              </div>
              <p className="text-lg font-bold text-white">{modal.name}</p>
              <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>
                {isSetup ? "第一次進入，請設定你的通關密碼" : "請輸入通關密碼"}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold mb-1.5" style={{ color: "#64748b" }}>
                  {isSetup ? "設定密碼" : "通關密碼"}
                </p>
                <input
                  ref={pinRef}
                  type="password"
                  value={pin}
                  onChange={(e) => { setPin(e.target.value); setError("") }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") isSetup ? (confirmPin ? handleSetupPin() : document.getElementById("confirm-pin")?.focus()) : handleEnterPin()
                  }}
                  placeholder={isSetup ? "輸入密碼（至少 4 個字元）" : "輸入密碼"}
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none"
                  style={{
                    background: "#0f172a",
                    border: `1px solid ${error ? "#f87171" : "#334155"}`,
                    color: "#f1f5f9",
                    letterSpacing: pin ? "0.2em" : "normal",
                  }}
                />
              </div>

              {isSetup && (
                <div>
                  <p className="text-xs font-semibold mb-1.5" style={{ color: "#64748b" }}>
                    再次確認密碼
                  </p>
                  <input
                    id="confirm-pin"
                    type="password"
                    value={confirmPin}
                    onChange={(e) => { setConfirmPin(e.target.value); setError("") }}
                    onKeyDown={(e) => e.key === "Enter" && handleSetupPin()}
                    placeholder="再輸入一次密碼"
                    className="w-full rounded-lg px-4 py-3 text-sm outline-none"
                    style={{
                      background: "#0f172a",
                      border: `1px solid ${error ? "#f87171" : "#334155"}`,
                      color: "#f1f5f9",
                      letterSpacing: confirmPin ? "0.2em" : "normal",
                    }}
                  />
                </div>
              )}

              {error && (
                <p className="text-sm" style={{ color: "#f87171" }}>
                  {error}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-lg font-semibold text-sm"
                  style={{ background: "#334155", color: "#94a3b8" }}
                >
                  取消
                </button>
                <button
                  onClick={isSetup ? handleSetupPin : handleEnterPin}
                  disabled={!pin || (!!isSetup && !confirmPin)}
                  className="flex-1 py-3 rounded-lg font-semibold text-sm transition-all"
                  style={{
                    background: "#22c55e",
                    color: "#0f172a",
                    opacity: !pin || (!!isSetup && !confirmPin) ? 0.4 : 1,
                  }}
                >
                  {isSetup ? "設定並進入" : "進入"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </>
  )
}
