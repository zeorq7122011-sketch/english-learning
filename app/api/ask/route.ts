import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  const { question, dayTopic } = await req.json()

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

  const prompt = `You are an English teacher for a Taiwanese QC worker (beginner-intermediate level).
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
