const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
  try {
    // Parse the incoming request data
    const { moodData } = await req.json();

    // Ensure that moodData is an array and stringify it properly for the model
    const moodDataString = JSON.stringify(moodData);

    const prompt = `
      1. Analyze the following data representing a user's emotional progress over time.
      The data consists of six emotions: Happiness, Sadness, Disgust, Fear, Surprise, and Anger.
      For each emotion, describe the general trend (e.g., increasing, decreasing, fluctuating)
      and identify any significant peaks, drops, or steady patterns.
      Provide an overall summary of the user's emotional journey, highlighting any correlations or notable changes.
      2. Ensure the summary is concise, insightful, and written in a friendly tone. Don't make it too long, maximal one paragraph.
      3. Your summary should be like you're talking to the user, and don't forget to give feedback to the user progress.
      4. At the end of the response, tell user to to take a look at their average mood.
      5. If the data is empty, please tell the user to start creating a journal.
      ${moodDataString}
    `;

    console.log("moodData received in api", moodDataString);

    // Request to the generative AI model
    const result = await model.generateContent(prompt);

    // Accessing the result from the model
    const response = result.response;
    const generatedResponse =
      response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (generatedResponse) {
      // Directly returning the generated response (no need to parse it as JSON)
      return new Response(JSON.stringify({ summary: generatedResponse }), {
        status: 200,
      });
    } else {
      throw new Error("Failed to generate response from AI");
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to give a response", { status: 500 });
  }
}
