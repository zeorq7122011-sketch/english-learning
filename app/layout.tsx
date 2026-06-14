import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "English Learning",
  description: "Personal English learning platform",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className="min-h-screen" style={{ background: "#0f172a", color: "#f1f5f9" }}>
        <nav style={{ background: "#1e293b", borderBottom: "1px solid #334155" }} className="px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <a href="/" className="text-lg font-bold" style={{ color: "#22c55e" }}>
              English Learning
            </a>
            <div className="flex gap-6 text-sm">
              <a href="/" style={{ color: "#94a3b8" }} className="hover:text-white transition-colors">
                Today
              </a>
              <a href="/history" style={{ color: "#94a3b8" }} className="hover:text-white transition-colors">
                History
              </a>
            </div>
          </div>
        </nav>
        <main className="max-w-3xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  )
}
