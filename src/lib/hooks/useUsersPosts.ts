import { QueryFunction } from "@tanstack/react-query";
import { Database } from "../../../database.types";
import {
  getPostList,
  getSinglePost,
  getUsersPosts,
} from "../action/post-server";
import { SupabaseClient } from "@supabase/supabase-js";
import { getUsers } from "../action/server";

type useUsersPostsProps = {
  client: SupabaseClient<Database>;
  username: string;
};

const usersPosts = ({ client, username }: useUsersPostsProps) => {
  const queryKey: [_1: string, _2: string, string] = [
    "users",
    "posts",
    username,
  ];

  const queryFn: QueryFunction<
    Post[],
    [_1: string, _2: string, string]
  > = async ({ queryKey }) => {
    return getUsersPosts({
      queryKey,
      client,
    });
  };

  return {
    queryKey,
    queryFn,
  };
};
export default usersPosts;
