import { QueryFunction } from "@tanstack/react-query";
import { Database } from "../../../database.types";
import { getPostList, getSinglePost } from "../action/post-server";
import { SupabaseClient } from "@supabase/supabase-js";

type usePostProps = {
  client: SupabaseClient<Database>;
  PostId: string;
};

const usePost = ({ client, PostId }: usePostProps) => {
  const queryKey: [_1: string, _2: string] = ["post", PostId];

  const queryFn:
    | QueryFunction<Post, [_1: string, _2: string], never>
    | undefined = async ({ queryKey }) => {
    return getSinglePost({
      queryKey,
      client,
    });
  };

  return {
    queryKey,
    queryFn,
  };
};
export default usePost;
