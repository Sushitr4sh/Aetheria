import { connectToDB } from "@/lib/database";
import Journal from "@/models/journal";

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
  const { userId, entryText } = await req.json();

  if (!entryText) {
    return new Response("Entry text is required!", { status: 500 });
  }

  const prompt = `
I want you to predict the mood of the journal below based on these six emotions: happiness, sadness, disgust, fear, surprise, and anger. Return an object in this exact JSON format:

{
  "moodData": [happiness, sadness, disgust, fear, surprise, anger],
  "recommendation": ["recommendation1", "recommendation2", "recommendation3"],
  "shortSummary": "string",
  "isJournal": boolean
}

1. The "moodData" array must always contain six numbers, each corresponding to one of the six emotions (happiness, sadness, disgust, fear, surprise, anger), in the same order as listed above. These numbers must range from 1 to 100.
2. The "recommendation" array must always contain exactly three actionable recommendations. These recommendations should be highly specific and directly related to the actions or thoughts described in the journal. Avoid generic suggestions.
3. The "shortSummary" should be your respond to user journal.
4. Do not include any additional text, formatting, json template literals, or explanations outside of the JSON object.
5. If the journal is in different language other than english, the recommendations should be in that language.
6. If you think user is not writing a daily journal or any other unrelated things, set "isJournal" value to false.

The journal is:
${entryText}
`;

  try {
    await connectToDB();

    console.log("Before fetching gemini api");
    const result = await model.generateContent(prompt);
    const response = result.response;
    let generatedResponse =
      response?.candidates?.[0]?.content?.parts?.[0]?.text;
    generatedResponse = generatedResponse.replace(/```json|```/g, "").trim();

    if (generatedResponse) {
      const journal = JSON.parse(generatedResponse);
      console.log("Gemini Response", journal);
      const newJournal = new Journal({
        creator: userId,
        entryText,
        moodData: journal.moodData,
        recommendation: journal.recommendation,
        shortSummary: journal.shortSummary,
        isJournal: journal.isJournal,
      });

      await newJournal.save();
      return new Response(JSON.stringify(newJournal), { status: 200 });
    } else {
      throw new Error("Failed to give a response");
    }
  } catch (error) {
    return new Response("Failed to give a response", { status: 500 });
  }
}
