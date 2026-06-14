import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  const { question, userAnswer, exerciseType, dayTopic } = await req.json()

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

  const prompt = `You are an English teacher for a Taiwanese QC worker (beginner-intermediate level).
Today's lesson topic: ${dayTopic}

Exercise: ${question}
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
    const feedback = JSON.parse(cleaned)
    return Response.json({ feedback })
  } catch (error) {
    console.error("Gemini error:", error)
    return Response.json({ error: "Failed to get feedback" }, { status: 500 })
  }
}
