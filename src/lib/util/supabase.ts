// let supabaseInstance: SupabaseClient;

import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../database.types";
import { createBrowserClient } from "@supabase/ssr";

let cachedSupabaseInstance: SupabaseClient<Database> | null = null;

export const supabaseClient = (
  supabaseAccessToken?: string
): SupabaseClient<Database> => {
  if (!cachedSupabaseInstance) {
    cachedSupabaseInstance = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
      {
        auth: {},
        global: {
          headers: {
            Authorization: `Bearer ${supabaseAccessToken}`,
          },
        },
      }
    );
  }
  return cachedSupabaseInstance;
};
