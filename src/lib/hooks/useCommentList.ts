import { QueryFunction } from "@tanstack/react-query";
import { Database } from "../../../database.types";
import { getCommentPostList, getPostList } from "../action/post-server";
import { SupabaseClient } from "@supabase/supabase-js";

type useCommentListProps = {
  client: SupabaseClient<Database>;
  typequery: string;
};

const useCommentList = ({ client, typequery }: useCommentListProps) => {
  const queryKey: [_1: string, _2: string, _3: string] = [
    "post",
    "comment",
    typequery,
  ];

  const queryFn: QueryFunction<
    Post[],
    [_1: string, _2: string, _3: string],
    string | undefined
  > = async (queryKey) => {
    return getCommentPostList({
      client,
      pageParam: queryKey.pageParam,
      postId: queryKey.queryKey[2],
    });
  };

  return {
    queryKey,
    queryFn,
    getNextPageParam: (lastPage: any) => lastPage.at(-1)?.createdAt,
    initialPageParam: undefined,
  };
};
export default useCommentList;
