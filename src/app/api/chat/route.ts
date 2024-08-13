import { serverClient } from "@/lib/util/serverSBClient";
import { openai } from "@ai-sdk/openai";
import { SupabaseClient } from "@supabase/supabase-js";
import { convertToCoreMessages, StreamData, streamText } from "ai";
import { Database } from "../../../../database.types";

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
  content: any;
  client: SupabaseClient<Database>;
}) => {
  return await client
    .from("conversation")
    .insert({ role, content, session_id })
    .select("*");
};

export async function POST(req: Request) {
  const { messages: content, session_id, userId } = await req.json();
  const client = serverClient();
  const data = new StreamData();
  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
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
      // console.log(
      //   "finishReason : ",
      //   finishReason,
      //   "text : ",
      //   text,
      //   "usage : ",
      //   usage,
      //   "rawResponse : ",
      //   rawResponse,
      //   "toolCalls : ",
      //   toolCalls,
      //   "toolResults : ",
      //   toolResults,
      //   "warnings : ",
      //   warnings
      // );

      const { data: saveData, error } = await SaveChat({
        client,
        content: [...content, { role: "assistant", content: text }],
        role: "assistant",
        session_id,
      });
      if (error) {
        console.log(error);
      }
      console.log("saveData", saveData);
      if (saveData) {
        const { session_id } = saveData[0];
        data.append(session_id);
      }
      data.close();
    },
  });
  return result.toDataStreamResponse({ data });
}
