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
    1. Analyze the following data representing a user's emotional progress over time. The data consists of six emotions: Happiness, Sadness, Disgust, Fear, Surprise, and Anger. For each emotion, describe the general trend (e.g., increasing, decreasing, fluctuating) and identify any significant peaks, drops, or steady patterns. Highlight any correlations or notable changes that may indicate shifts in the user's emotional state.

    2. Your summary should be concise, insightful, and written in a friendly, encouraging tone. Aim for a maximum of one paragraph. 

    3. Write as if you're having a conversation with the user, providing thoughtful feedback on their emotional progress. Acknowledge their efforts and any positive changes, while also gently guiding them on areas for improvement.

    4. At the end of your response, encourage the user to take a look at their average mood to gain further insights into their emotional well-being.

    5. If the data is empty, kindly remind the user to start creating a journal to track their emotions and experiences.

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
