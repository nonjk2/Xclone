import { serverClient } from "@/lib/util/serverSBClient";
import { openai } from "@ai-sdk/openai";
import { SupabaseClient } from "@supabase/supabase-js";
import { convertToCoreMessages, StreamData, streamText } from "ai";
import { Database } from "../../../../database.types";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const LoadHistory = async ({
  session_id,
  client,
}: {
  session_id: string;
  client: SupabaseClient<Database>;
}) => {
  return await client
    .from("conversation")
    .select("content")
    .eq("session_id", session_id)
    .maybeSingle();
};

const SaveChat = async ({
  session_id,
  role,
  content,
  client,
}: {
  session_id?: string;
  client: SupabaseClient<Database>;
  role: "user" | "assistant";
  content: any;
}) => {
  return await client
    .from("conversation")
    .upsert({ role, content, session_id }, { onConflict: "session_id" })
    .select("*");
};

export async function POST(req: Request) {
  const { messages: content, sessionId: session_id, userId } = await req.json();

  const client = serverClient();
  let history: any;
  if (session_id) {
    const { data: historyData, error } = await LoadHistory({
      session_id,
      client,
    });
    if (error && !historyData) {
      console.log("Error loading history");
    }
    history = JSON.parse(historyData?.content as string);
  }

  const data = new StreamData();
  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages: convertToCoreMessages(content),
    async onFinish({ text }) {
      const { data: saveData, error } = await SaveChat({
        client,
        content: history
          ? [...history, ...content, { role: "assistant", content: text }]
          : [...content, { role: "assistant", content: text }],
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
