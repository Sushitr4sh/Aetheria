import { VertexAI } from "@google-cloud/vertexai";

const PROJECT_ID = "calmquest-mariodaruranto";
const LOCATION = "us-central1";

const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });

export default async function generateResponse(
  prompt: string
): Promise<string> {
  const model = vertexAI.preview.getGenerativeModel({ model: "gemini-pro" });
  const request = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  };

  try {
    const result = await model.generateContent(request);
    const response = result.response;

    // Check if candidates and parts exist
    const generatedText = response?.candidates?.[0]?.content?.parts?.[0]?.text;

    // Return the generated text or a fallback if it's undefined
    return generatedText || "No response generated";
  } catch (error) {
    console.error("Error generating response:", error);
    return "Failed to generate response";
  }
}
