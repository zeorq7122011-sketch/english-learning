import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const COURSE_PERSONA: Record<string, string> = {
  "qc-english": "You are an English teacher for a Taiwanese QC (Quality Control) worker in manufacturing. They deal with suppliers, inspections, defects, and quality reports.",
  "daily": "You are an English teacher for a Taiwanese learner who wants to improve everyday conversational English for daily life situations.",
  "business": "You are an English teacher for a Taiwanese professional who wants to improve business English for meetings, emails, presentations, and negotiations.",
  "travel": "You are an English teacher for a Taiwanese traveler who wants to communicate effectively while traveling abroad.",
  "custom": "You are an English teacher for a Taiwanese learner with a specific personal learning goal.",
}

export async function POST(req: Request) {
  const { day, title, systemPrompt, courseType, level } = await req.json()

  const persona = COURSE_PERSONA[courseType] ?? COURSE_PERSONA["daily"]
  const levelLabel = level === "beginner" ? "beginner" : level === "advanced" ? "advanced" : "beginner-intermediate"

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

  const prompt = `${persona}
Student level: ${levelLabel}.

Today is Day ${day}: "${title}"
Teaching focus: ${systemPrompt}

Generate a structured lesson in this EXACT JSON format:
{
  "intro": "Brief 1-2 sentence intro of today's topic in Chinese",
  "patterns": [
    {
      "pattern": "The sentence pattern",
      "explanation": "Short explanation in Chinese",
      "examples": [
        { "english": "English example", "chinese": "中文翻譯" },
        { "english": "English example 2", "chinese": "中文翻譯 2" }
      ]
    }
  ],
  "exercises": [
    {
      "type": "translate",
      "instruction": "把以下中文翻譯成英文：",
      "question": "中文句子",
      "hint": "optional grammar hint"
    },
    {
      "type": "translate",
      "instruction": "把以下中文翻譯成英文：",
      "question": "另一個中文句子",
      "hint": "optional hint"
    },
    {
      "type": "fill",
      "instruction": "填入正確的單字：",
      "question": "We will follow ___ on this issue.",
      "hint": "追蹤問題用這個介系詞",
      "answer": "up"
    },
    {
      "type": "translate",
      "instruction": "把以下中文翻譯成英文：",
      "question": "第三個練習句",
      "hint": "hint"
    }
  ],
  "tip": "One practical tip about using this in real situations, in Chinese"
}

Return ONLY valid JSON, no markdown, no explanation.`

  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text().trim()
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
    const start = cleaned.indexOf("{")
    const end = cleaned.lastIndexOf("}")
    if (start === -1 || end === -1) throw new Error("No JSON found in response")
    const lesson = JSON.parse(cleaned.slice(start, end + 1))
    return Response.json({ lesson })
  } catch (error) {
    console.error("Gemini error:", error)
    return Response.json({ error: "Failed to generate lesson" }, { status: 500 })
  }
}
