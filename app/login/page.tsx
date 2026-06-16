"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push("/")
      router.refresh()
    } else {
      setError("密碼錯誤，請再試一次。")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f172a" }}>
      <div style={{ background: "#1e293b", borderRadius: 16, padding: 40, width: "100%", maxWidth: 360 }}>
        <h1 className="text-2xl font-bold text-white mb-2">English Learning</h1>
        <p className="text-sm mb-8" style={{ color: "#94a3b8" }}>請輸入密碼繼續</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="密碼"
            autoFocus
            className="w-full rounded-lg px-4 py-3 text-sm outline-none"
            style={{ background: "#0f172a", border: "1px solid #334155", color: "#f1f5f9" }}
          />
          {error && <p className="text-sm" style={{ color: "#f87171" }}>{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90"
            style={{ background: "#22c55e", color: "#0f172a", opacity: !password ? 0.5 : 1 }}
          >
            {loading ? "驗證中..." : "進入"}
          </button>
        </form>
      </div>
    </div>
  )
}
