import { connectToDB } from "@/lib/database";
import Journal from "@/models/journal";

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function GET(
  req: Request,
  { params }: { params: { userId: string; journalId: string } }
) {
  const { userId, journalId } = params;

  console.log("User  ID is", userId);
  console.log("Journal ID is", journalId);

  if (!userId || !journalId) {
    return new Response("User  ID and Journal ID are required", {
      status: 400,
    });
  }

  try {
    // Connect to the database
    await connectToDB();

    // Find the specific journal created by the specified user
    const journal = await Journal.findOne({ _id: journalId, creator: userId });

    if (!journal) {
      return new Response("Journal not found.", { status: 404 });
    }

    // Return the journal as JSON
    return new Response(JSON.stringify(journal), { status: 200 });
  } catch (error) {
    console.error("Error fetching journal:", error);
    return new Response("Failed to fetch journal.", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { userId: string; journalId: string } }
) {
  const { userId, journalId } = params;
  const { entryText } = await req.json();

  if (!userId || !journalId) {
    return new Response("User ID and Journal ID are required", { status: 400 });
  }

  if (!entryText) {
    return new Response("Entry text is required", { status: 400 });
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
3. The "shortSummary" should be your respond to user journal, and don't forget to tell the user what they should write next time.
4. Do not include any additional text, formatting, json template literals, or explanations outside of the JSON object.
5. If the journal is in different language other than english, the recommendations should be in that language.
6. If you think user is not writing a daily journal or any other unrelated things, set "isJournal" value to false.

The journal is:
${entryText}
`;

  try {
    await connectToDB();

    // Get AI analysis of the updated journal
    console.log("Before fetching gemini api");
    const result = await model.generateContent(prompt);
    const response = result.response;
    let generatedResponse =
      response?.candidates?.[0]?.content?.parts?.[0]?.text;
    generatedResponse = generatedResponse.replace(/```json|```/g, "").trim();

    if (!generatedResponse) {
      throw new Error("Failed to generate AI response");
    }

    const aiAnalysis = JSON.parse(generatedResponse);
    console.log("Gemini Response", aiAnalysis);

    if (!aiAnalysis.isJournal) {
      return new Response("Please enter a valid journal", { status: 400 });
    }

    // Find and update the journal with all the new data
    const updatedJournal = await Journal.findOneAndUpdate(
      { _id: journalId, creator: userId },
      {
        entryText,
        moodData: aiAnalysis.moodData,
        recommendation: aiAnalysis.recommendation,
        shortSummary: aiAnalysis.shortSummary,
        isJournal: aiAnalysis.isJournal,
      },
      { new: true } // Return the updated document
    );

    if (!updatedJournal) {
      return new Response("Journal not found.", { status: 404 });
    }

    return new Response(JSON.stringify(updatedJournal), { status: 200 });
  } catch (error) {
    console.error("Error updating journal:", error);
    return new Response("Failed to update journal.", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string; journalId: string } }
) {
  const { userId, journalId } = params;

  if (!userId || !journalId) {
    return new Response("User ID and Journal ID are required", { status: 400 });
  }

  try {
    await connectToDB();

    // Find and delete the journal
    const deletedJournal = await Journal.findOneAndDelete({
      _id: journalId,
      creator: userId,
    });

    if (!deletedJournal) {
      return new Response("Journal not found.", { status: 404 });
    }

    return new Response(
      JSON.stringify({ message: "Journal deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting journal:", error);
    return new Response("Failed to delete journal.", { status: 500 });
  }
}
