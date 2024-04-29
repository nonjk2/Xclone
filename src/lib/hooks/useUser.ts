import { QueryFunction, UseSuspenseQueryOptions } from "@tanstack/react-query";
import { Database } from "../../../database.types";
import { getPostList, getSinglePost } from "../action/post-server";
import { SupabaseClient } from "@supabase/supabase-js";
import { getUserInServerSide, getUsers } from "../action/server";

type useUsersProps = {
  client: SupabaseClient<Database>;
};

const useUser = ({
  client,
}: useUsersProps): UseSuspenseQueryOptions<
  authUser,
  any,
  authUser,
  [_1: string]
> => {
  const queryKey: [_1: string] = ["user"];

  const queryFn: QueryFunction<authUser, [_1: string]> = async ({
    queryKey,
  }) => {
    return getUserInServerSide({ client });
  };

  return {
    queryKey,
    queryFn,
  };
};
export default useUser;
