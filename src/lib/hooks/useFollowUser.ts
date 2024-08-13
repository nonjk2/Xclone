import { QueryFunction, UseSuspenseQueryOptions } from "@tanstack/react-query";
import { Database } from "../../../database.types";
import { getPostList, getSinglePost } from "../action/post-server";
import { SupabaseClient } from "@supabase/supabase-js";
import { checkUserId, getUserInServerSide, getUsers } from "../action/server";

type useFollowRecommendUserProps = {
  client: SupabaseClient<Database>;
};

const getUserFollowRecommend = async ({
  client,
}: {
  client: SupabaseClient<Database>;
}) => {
  try {
    const userId = await checkUserId(client);
    const { data, error } = await client
      .from("userinfo")
      .select("*")
      .neq("id", userId);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    throw new Error("failed to get userFollowRecommend");
  }
};

const followRecommendUser = ({
  client,
}: useFollowRecommendUserProps): UseSuspenseQueryOptions<
  authUser[],
  any,
  authUser[],
  [_1: string, _2: string]
> => {
  const queryKey: [_1: string, _2: string] = ["user", "follow"];

  const queryFn: QueryFunction<any, [_1: string, _2: string]> = async ({}) => {
    return getUserFollowRecommend({ client });
  };

  return {
    queryKey,
    queryFn,
  };
};
export default followRecommendUser;
