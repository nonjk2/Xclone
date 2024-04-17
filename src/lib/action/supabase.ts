import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Database } from "../../../database.types";
let supabaseInstance: SupabaseClient;

export const supabaseClient = (supabaseAccessToken?: string) => {
  if (!supabaseInstance) {
    supabaseInstance = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
      {
        global: {
          headers: {
            Authorization: `Bearer ${supabaseAccessToken}`,
          },
        },
      }
    );
  }
  return supabaseInstance;
};
