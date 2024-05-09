import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { Database } from "../../../database.types";
import { getPostList } from "../action/post-server";
import { SupabaseClient } from "@supabase/supabase-js";

type usePostListProps = {
  client: SupabaseClient<Database>;
  typequery?: "recommend" | "follow";
  queryClient?: QueryClient;
};

const usePostList = ({
  client,
  typequery = "recommend",
  queryClient,
}: usePostListProps) => {
  const queryKey: [_1: string, _2: string] = ["post", typequery];

  const queryFn = async (queryKey: any) => {
    return getPostList({ client, pageParam: queryKey.pageParam, queryClient });
  };

  return {
    queryKey,
    queryFn,
    getNextPageParam: (lastPage: any) => lastPage.at(-1)?.createdAt,
    initialPageParam: undefined,
  };
};
export default usePostList;
