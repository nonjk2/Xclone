import { QueryFunction } from "@tanstack/react-query";
import { supabaseClient } from "../util/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../database.types";

// const getPostFollowList = async (): Promise<Post[]> => {
//   const res = await fetch("http://localhost:9090/api/followingPosts", {
//     method: "GET",
//     next: { tags: ["post", "follow"] },
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error("failed");
//   }
//   return res.json();
// };
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
      .select("*")
      .eq("id", user.id)
      .maybeSingle();
    if (!data || error) {
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
      .select("*")
      .eq("nickname", username)
      .single();

    console.log(data);
    if (!data) {
      throw new Error("failed");
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

const getUser = async (token: string, id: string) => {
  try {
    const supabase = supabaseClient();
    const userId = await checkUserId(supabase);
    const { data, error } = await supabase
      .from("userinfo")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.log("getuser Error: " + error.message);
    }
    // console.log("getUser : ", data);
    if (!data) {
      throw new Error("failed");
    }
    // const user = await getUsers(data.id);
    // console.log("getUserdataWithdata : ", user);
    // console.log("getUserdata : ", data);
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
};
