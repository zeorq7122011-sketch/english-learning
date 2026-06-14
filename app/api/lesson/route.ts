import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  const { day, title, systemPrompt } = await req.json()

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

  const prompt = `You are an English teacher for a Taiwanese QC (Quality Control) worker who wants to improve work English.
Their level: beginner-intermediate. They work in manufacturing, dealing with suppliers, inspections, and quality reports.

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
  "tip": "One practical tip about using this in real work situations, in Chinese"
}

Return ONLY valid JSON, no markdown, no explanation.`

  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text().trim()
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
    const lesson = JSON.parse(cleaned)
    return Response.json({ lesson })
  } catch (error) {
    console.error("Gemini error:", error)
    return Response.json({ error: "Failed to generate lesson" }, { status: 500 })
  }
}
