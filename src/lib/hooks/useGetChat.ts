import { QueryFunction } from "@tanstack/react-query";
import { getChatByUser } from "../action/server";
import { Database } from "../../../database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export const getChatQuery = ({
  client,
  session_id,
}: {
  client: SupabaseClient<Database>;
  session_id: string;
}) => {
  const queryKey: [_1: string, _2: string, string] = [
    "users",
    "chat",
    session_id,
  ];

  const queryFn: QueryFunction<any, [_1: string, _2: string, string]> = async ({
    queryKey,
  }) => {
    return getChatByUser({
      queryKey,
      client,
    });
  };

  return {
    queryKey,
    queryFn,
  };
};
