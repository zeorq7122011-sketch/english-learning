import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  if (username !== process.env.SITE_USERNAME || password !== process.env.SITE_PASSWORD) {
    return NextResponse.json({ error: "帳號或密碼錯誤" }, { status: 401 })
  }

  const token = `${process.env.SITE_USERNAME}:${process.env.SITE_PASSWORD}`
  const res = NextResponse.json({ ok: true })
  res.cookies.set("auth", token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  })
  return res
}
