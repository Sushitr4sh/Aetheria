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

  const prompt =
    "I want you to predict the mood of the journal below based on these six emotion: happiness, sadness, disgust, fear, surprise, anger. Create an object that consist of an array called moodData that consist of number from 1-100 that is the predicted mood (Just give the number no need to add comment). The object should also consist of recommendation array that gives three thing that maybe we can do to improve your mood based on the given journal (recommendation should be specific to what the user do on the journal, don't give general recommendation, make it as specific as possible). Don't return anything else beside the object. The journal is: /n" +
    entryText;

  try {
    await connectToDB();

    console.log("Before fetching gemini api");
    const result = await model.generateContent(prompt);
    const response = result.response;
    const generatedText = response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (generatedText) {
      const journal = JSON.parse(generatedText);
      console.log("Generated Journal: ", journal);
      const newJournal = new Journal({
        creator: userId,
        entryText,
        moodData: journal.moodData,
        recommendation: journal.recommendation,
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
