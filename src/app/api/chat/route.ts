import { serverClient } from "@/lib/util/serverSBClient";
import { openai } from "@ai-sdk/openai";
import { SupabaseClient } from "@supabase/supabase-js";
import { convertToCoreMessages, streamText } from "ai";
import { Database } from "../../../../database.types";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const SaveChat = async ({
  session_id,
  role,
  content,
  client,
}: {
  session_id?: string;
  role: "user" | "assistant";
  content: string;
  client: SupabaseClient<Database>;
}) => {
  return await client
    .from("conversation")
    .insert({ role, content, session_id });
};

export async function POST(req: Request) {
  const { messages: content, session_id, userId } = await req.json();
  const client = serverClient();

  try {
    const {
      data: dserData,
      error: userError,
      statusText: userStatusText,
    } = await SaveChat({
      client,
      session_id,
      content,
      role: "user",
    });
    if (userError) {
      console.log(userError);
    }
    console.log(dserData);
    const result = await streamText({
      model: openai("gpt-4-turbo"),
      messages: convertToCoreMessages(content),
      async onFinish({
        finishReason,
        text,
        usage,
        rawResponse,
        toolCalls,
        toolResults,
        warnings,
      }) {
        await SaveChat({
          client,
          content: text,
          role: "assistant",
          session_id,
        });
      },
    });
    return result.toDataStreamResponse();
  } catch (error) {
    throw new Error("error!");
  }
}
