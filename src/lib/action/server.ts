import { QueryFunction } from "@tanstack/react-query";
import { supabaseClient } from "./\bsupabase";

const getPostList = async (): Promise<Post[]> => {
  const res = await fetch("http://localhost:9090/api/postRecommends", {
    method: "GET",
    next: { tags: ["post", "recommend"] },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("failed");
  }
  return res.json();
};
const getPostFollowList = async (): Promise<Post[]> => {
  const res = await fetch("http://localhost:9090/api/followingPosts", {
    method: "GET",
    next: { tags: ["post", "follow"] },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("failed");
  }
  return res.json();
};
const getUsers = async (user_id: string) => {
  try {
    const supabase = supabaseClient();
    const { data, error } = await supabase
      .from("userinfo")
      .select("*")
      .eq("user_id", user_id)
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
const getUser = async (token: string) => {
  try {
    const supabase = supabaseClient(token);
    const { data, error } = await supabase.from("users").select("*").single();
    if (error) {
      console.log(error);
    }
    console.log("user : ", data);
    if (!data) {
      throw new Error("failed");
    }
    const user = await getUsers(data.id);
    console.log("getUserdataWithdata : ", user);
    // console.log("getUserdata : ", data);
    return user;
  } catch (error) {
    throw new Error("failed");
  }
};
const getUsersPosts: QueryFunction<
  Post[],
  [_1: string, _2: string, string]
> = async ({ queryKey }) => {
  const [_1, _2, username] = queryKey;
  const res = await fetch(`http://localhost:9090/api/users/${username}/posts`, {
    method: "GET",
    next: { tags: ["users", "posts", username] },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("failed");
  }
  return res.json();
};
const getSinglePost: QueryFunction<Post, [_1: string, _2: number]> = async ({
  queryKey,
}) => {
  const [_1, id] = queryKey;

  const res = await fetch(`http://localhost:9090/api/posts/${id}`, {
    method: "GET",
    next: { tags: ["users", String(id)] },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("failed");
  }
  return res.json();
};

export {
  getPostList,
  getPostFollowList,
  getUsers,
  getUser,
  getUsersPosts,
  getSinglePost,
};
