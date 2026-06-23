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
  const { question, dayTopic, courseType } = await req.json()

  const persona = COURSE_PERSONA[courseType] ?? COURSE_PERSONA["daily"]

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

  const prompt = `${persona} The student is beginner-intermediate level.
Today's lesson topic: ${dayTopic}

The student has a question: "${question}"

Answer in a helpful, clear way. Use Chinese for explanations, English for examples.
Keep it concise (2-4 sentences max). If they wrote something wrong, correct it gently.`

  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text().trim()
    return Response.json({ answer: text })
  } catch (error) {
    console.error("Gemini error:", error)
    return Response.json({ error: "Failed to get answer" }, { status: 500 })
  }
}
