import { VertexAI } from "@google-cloud/vertexai";

const PROJECT_ID = "calmquest-mariodaruranto";
const LOCATION = "us-central1";

const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt) {
    return Response.json({ error: "Prompt is required" });
  }

  const editedPrommpt =
    "I want you to predict the mood of the journal below based on these six emotion: happiness, sadness, disgust, fear, surprise, anger. Create an object that consist of an array called moodData that consist of number from 1-100 that is the predicted mood. The object should also consist of recommendation array that gives three thing that maybe we can do to improve your mood based on the given journal (recommendation should be specific to what the user do on the journal, don't give general recommendation, make it as specific as possible). Don't return anything else beside the object. The journal is: /n" +
    prompt;

  try {
    const model = vertexAI.preview.getGenerativeModel({
      model: "gemini-pro",
    });
    const request = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    };

    const result = await model.generateContent(request);
    const response = result.response;
    const generatedText = response?.candidates?.[0]?.content?.parts?.[0]?.text;

    return new Response(JSON.stringify(generatedText), { status: 200 });
  } catch (error) {
    console.error("Error generating response:", error);
    return new Response("Failed to predict journal's mood", { status: 500 });
  }
}
