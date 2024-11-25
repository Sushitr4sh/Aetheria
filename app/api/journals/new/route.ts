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

  const prompt = `You are an empathetic AI mental health assistant trained to analyze personal journal entries with deep emotional intelligence. Your task is to carefully assess the emotional content of the journal entry and provide a nuanced, supportive response.

  Analyze the journal entry focusing on six primary emotions: happiness, sadness, disgust, fear, surprise, and anger. Return your analysis strictly in this JSON format:

  {
    "moodData": [happiness, sadness, disgust, fear, surprise, anger],
    "recommendation": ["recommendation1", "recommendation2", "recommendation3"],
    "shortSummary": "string",
    "isJournal": boolean
  }

  Provide a precise, structured response following these strict guidelines:
  1. Mood Scoring (0-100 scale):
   - Analyze the emotional tone of the journal entry
   - Assign intensity scores for each emotion based on linguistic and contextual cues
   - Ensure total emotional representation across six emotions
   - Be sensitive to subtle emotional nuances
   - Avoid extreme or unrealistic scoring
  2. RECOMMENDATION GUIDELINES:
   - Generate 3 highly personalized, actionable recommendations
   - Recommendations must directly relate to the journal's emotional context
   - Focus on constructive, supportive, and practical suggestions
   - Consider the specific challenges or experiences mentioned
   - Aim to provide compassionate, non-judgmental guidance
   - You can provide user a link to a website if you think the user can benefit from it.
  3. SUMMARY REQUIREMENTS:
   - Craft a concise, empathetic summary
   - Acknowledge the writer's emotional experience
   - Offer gentle, encouraging reflection
   - Suggest potential areas for future journaling
   - Maintain a supportive, non-clinical tone
  4. AUTHENTICITY VERIFICATION:
   - Carefully determine if the entry represents a genuine personal journal
   - Consider context, emotional depth, and personal narrative elements
   - Set "isJournal" to false if the entry appears fabricated or unrelated

  Do not include any additional text, formatting, or explanations outside the JSON object.
  The journal is: ${entryText}`;

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

      if (journal.isJournal) {
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
        throw new Error("Please enter a valid journal");
      }
    } else {
      throw new Error("Failed to give a response");
    }
  } catch (error) {
    return new Response("Failed to give a response", { status: 500 });
  }
}
