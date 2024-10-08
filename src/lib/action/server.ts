import { QueryFunction } from "@tanstack/react-query";
import { supabaseClient } from "../util/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../database.types";

type getUserProps = {
  queryKey: [_1: string, string];
  client: SupabaseClient<Database>;
};

const getUserInServerSide = async ({
  client,
}: {
  client: SupabaseClient<Database>;
}) => {
  try {
    const {
      data: { user },
      error: userError,
    } = await client.auth.getUser();

    if (!user || userError) {
      throw new Error("failed");
    }
    const { data, error } = await client
      .from("userinfo")
      .select("* , followers(following_id)")
      .eq("id", user.id)
      .maybeSingle();

    if (!data || error) {
      console.log(error);
      throw new Error("failed");
    }
    return data;
  } catch (error) {
    throw new Error("failed");
  }
};

const getUsers = async ({ queryKey }: getUserProps) => {
  const [_1, username] = queryKey;
  try {
    const supabase = supabaseClient();
    // const userid = await checkUserId(supabase);

    const { data, error } = await supabase
      .from("userinfo")
      .select("* , followers(following_id) , count:posts(count)")
      .eq("nickname", username)
      .single();

    if (!data) {
      throw new Error("failed");
    }

    return data;
  } catch (error) {
    throw new Error("failed");
  }
};

const getChatByUser = async ({
  queryKey,
  client,
}: {
  queryKey: [_1: string, _2: string, string];
  client: SupabaseClient<Database>;
}) => {
  const [_1, _2, session_id] = queryKey;
  try {
    const { data, error } = await client
      .from("conversation")
      .select("*")
      .eq("session_id", session_id);

    if (error) {
      throw new Error("챗 가져오기 failed");
    }
    return data;
  } catch (error) {
    throw new Error("failed");
  }
};

const getChatSession = async ({
  client,
}: {
  client: SupabaseClient<Database>;
}) => {
  try {
    const { data, error } = await client.from("conversation").select("*");

    if (error) {
      throw new Error("챗 가져오기 failed");
    }
    return data;
  } catch (error) {
    throw new Error("failed");
  }
};

const checkUserId = async (client: SupabaseClient<Database>) => {
  try {
    const {
      data: { user },
      error,
    } = await client.auth.getUser();
    if (error || !user) {
      throw new Error("CheckUser error");
    }
    return user.id;
  } catch (error) {
    throw new Error("CheckUser error");
  }
};

const getUser = async () => {
  try {
    const supabase = supabaseClient();
    const userId = await checkUserId(supabase);
    const { data, error } = await supabase
      .from("userinfo")
      .select("* , followers(following_id)")
      .eq("id", userId)
      .single();

    if (error) {
      console.log("getuser Error: " + error.message);
    }
    if (!data) {
      throw new Error("failed");
    }
    console.log("getUser :", data);
    return data;
  } catch (error) {
    throw new Error("failed");
  }
};

export {
  // getPostList,
  // getPostFollowList,
  getUserInServerSide,
  getUsers,
  getUser,
  checkUserId,
  getChatByUser,
  getChatSession,
};
