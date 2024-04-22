import { Database } from "../../../database.types";
import { getPostList } from "../action/post-server";
import { SupabaseClient } from "@supabase/supabase-js";

type usePostListProps = {
  client: SupabaseClient<Database>;
  typequery?: "recommend" | "follow";
};

const usePostList = ({ client, typequery = "recommend" }: usePostListProps) => {
  const queryKey: [_1: string, _2: string] = ["post", typequery];

  const queryFn = async (queryKey: any) => {
    return getPostList({ client, pageParam: queryKey.pageParam });
  };

  return {
    queryKey,
    queryFn,
    getNextPageParam: (lastPage: any) => lastPage.at(-1)?.createdAt,
    initialPageParam: undefined,
  };
};
export default usePostList;
