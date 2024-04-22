import { QueryFunction } from "@tanstack/react-query";
import { Database } from "../../../database.types";
import { getPostList, getSinglePost } from "../action/post-server";
import { SupabaseClient } from "@supabase/supabase-js";
import { getUsers } from "../action/server";

type useUsersProps = {
  client: SupabaseClient<Database>;
  username: string;
};

const useUsers = ({ client, username }: useUsersProps) => {
  const queryKey: [_1: string, _2: string] = ["users", username];

  const queryFn: QueryFunction<authUser, [_1: string, string]> = async ({
    queryKey,
  }) => {
    return getUsers({
      queryKey,
      client,
    });
  };

  return {
    queryKey,
    queryFn,
  };
};
export default useUsers;
