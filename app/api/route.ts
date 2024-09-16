import type { NextApiRequest, NextApiResponse } from "next";
import { VertexAI } from "@google-cloud/vertexai";

const PROJECT_ID = "calmquest-mariodaruranto";
const LOCATION = "us-central1";

const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });

export async function POST(req: any, res: NextApiResponse) {
  const { prompt } = await req.json();

  if (!prompt) {
    return Response.json({ error: "Prompt is required" });
  }

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

    return Response.json({
      response: generatedText || "No response generated",
    });
  } catch (error) {
    console.error("Error generating response:", error);
    return Response.json({ error: "Failed to generate response" });
  }
}
