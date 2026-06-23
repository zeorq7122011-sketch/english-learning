import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const COURSE_PERSONA: Record<string, string> = {
  "qc-english": "You are an English teacher for a Taiwanese QC (Quality Control) worker in manufacturing.",
  "daily": "You are an English teacher for a Taiwanese learner improving everyday conversational English.",
  "business": "You are an English teacher for a Taiwanese professional improving business English.",
  "travel": "You are an English teacher for a Taiwanese traveler improving travel English.",
  "custom": "You are an English teacher for a Taiwanese learner.",
}

export async function POST(req: Request) {
  const { question, userAnswer, exerciseType, dayTopic, courseType } = await req.json()

  const persona = COURSE_PERSONA[courseType] ?? COURSE_PERSONA["daily"]

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

  const prompt = `${persona} The student is beginner-intermediate level.
Today's lesson topic: ${dayTopic}

Exercise (${exerciseType}): ${question}
Student's answer: ${userAnswer}

Give feedback in this EXACT JSON format:
{
  "isCorrect": true or false,
  "correction": "The correct answer (if wrong), or empty string if correct",
  "explanation": "Brief explanation in Chinese of what was wrong or why it's correct (1-2 sentences)",
  "betterVersion": "An improved or alternative version if applicable, otherwise empty string",
  "encouragement": "One short encouraging sentence in Chinese"
}

Be encouraging but accurate. If the answer is mostly right with small errors, say so.
Return ONLY valid JSON, no markdown.`

  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text().trim()
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
    const start = cleaned.indexOf("{")
    const end = cleaned.lastIndexOf("}")
    if (start === -1 || end === -1) throw new Error("No JSON found in response")
    const feedback = JSON.parse(cleaned.slice(start, end + 1))
    return Response.json({ feedback })
  } catch (error) {
    console.error("Gemini error:", error)
    return Response.json({ error: "Failed to get feedback" }, { status: 500 })
  }
}
