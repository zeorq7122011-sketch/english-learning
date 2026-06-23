import { NextRequest, NextResponse } from "next/server"

function isAuthed(req: NextRequest): boolean {
  const auth = req.cookies.get("auth")?.value
  const token = `${process.env.SITE_USERNAME}:${process.env.SITE_PASSWORD}`
  return auth === token
}

async function getKV() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null
  const { kv } = await import("@vercel/kv")
  return kv
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const kv = await getKV()
  if (!kv) return NextResponse.json({ progress: null, learners: null })

  try {
    const id = req.nextUrl.searchParams.get("id") ?? "boxing"
    const [progress, learners] = await Promise.all([
      kv.get(`progress:${id}`),
      kv.get("learners"),
    ])
    return NextResponse.json({ progress, learners })
  } catch {
    return NextResponse.json({ progress: null, learners: null })
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const kv = await getKV()
  if (!kv) return NextResponse.json({ ok: true })

  try {
    const { id, progress, learners } = await req.json()
    const ops: Promise<unknown>[] = []
    if (progress !== undefined) ops.push(kv.set(`progress:${id}`, progress))
    if (learners !== undefined) ops.push(kv.set("learners", learners))
    await Promise.all(ops)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true })
  }
}
