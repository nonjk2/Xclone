import { NextResponse } from "next/server";
import OpenAI from "openai";

const MY_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: MY_API_KEY || "",
});
function generatePrompt(message: string): string {
  return `Draw a beautiful Korean woman enjoying water play on a sunny beach.`;
}
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages, id } = await req.json();
    const prompt = generatePrompt(messages);
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      quality: "hd",
      n: 1,
      size: "1024x1024",
      style: "natural",
      response_format: "b64_json",
    });
    const base64Image = response.data[0].b64_json;

    return NextResponse.json({ image: base64Image });
  } catch (error) {
    console.error("Error generating image:", error);
    return new NextResponse("error", { status: 500, statusText: "error" });
  }
}
