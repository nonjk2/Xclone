import { NextResponse } from "next/server";
import OpenAI from "openai";

const MY_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: MY_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages, id } = await req.json();

    let image_url;
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt:
        "A beautiful Korean woman taking pictures in front of Gyeongbokgung Palace",
      n: 1,
      size: "1024x1024",
      style: "vivid",
    });
    image_url = response.data[0].url;

    console.log(image_url);
    return new NextResponse(image_url);
  } catch (error) {
    console.error("Error generating image:", error);
    return new NextResponse("error", { status: 500, statusText: "error" });
  }
}
