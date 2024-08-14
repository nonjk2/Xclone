import { SupabaseClient } from "@supabase/supabase-js";
import { QueryFunction } from "@tanstack/react-query";
import { Database } from "../../../database.types";
import { getChatSession } from "../action/server";

export const getChatSessionByUser = ({
  client,
}: {
  client: SupabaseClient<Database>;
}) => {
  const queryKey: [_1: string, _2: string] = ["users", "chatSession"];

  const queryFn: QueryFunction<any, [_1: string, _2: string]> = async ({
    queryKey,
  }) => {
    return getChatSession({
      client,
    });
  };

  return {
    queryKey,
    queryFn,
  };
};
