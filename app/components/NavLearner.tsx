"use client"

import { useEffect, useState } from "react"
import { getActiveLearner, getLearners } from "@/lib/storage"
import Link from "next/link"

export default function NavLearner() {
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    const id = getActiveLearner()
    if (!id) return
    const learners = getLearners()
    const learner = learners.find((l) => l.id === id)
    if (learner) setName(learner.name)
  }, [])

  if (!name) return null

  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-sm transition-colors hover:text-white"
      style={{ color: "#94a3b8", textDecoration: "none" }}
    >
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "#22c55e22",
          color: "#22c55e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {name[0].toUpperCase()}
      </span>
      <span>{name}</span>
    </Link>
  )
}
