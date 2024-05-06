import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateFollowPost } from "../action/post-server";

import { supabaseClient } from "../util/supabase";

export const useFollowMutation = (id: string) => {
  const queryClient = useQueryClient();
  const client = supabaseClient();
  /** optimistic update */
  const follow = useMutation({
    mutationFn: () => {
      return updateFollowPost({
        following_id: id,
        type: "follow",
        client,
      });
    },
    onMutate() {
      const value: authUser | undefined = queryClient.getQueryData(["user"]);
      if (value) {
        const shallow: authUser = {
          ...value,
          followers: [{ following_id: id }, ...value.followers],
        };
        queryClient.setQueryData(["user"], shallow);
      }
    },
    onError() {
      const value: authUser | undefined = queryClient.getQueryData(["user"]);
      if (value) {
        const shallow: authUser = {
          ...value,
          followers: value.followers.filter(
            (value) => value.following_id === id
          ),
        };
        queryClient.setQueryData(["user"], shallow);
      }
    },
    onSettled() {},
  });
  /** optimistic update */
  const unfollow = useMutation({
    mutationFn: () => {
      return updateFollowPost({
        following_id: id,
        type: "unfollow",
        client,
      });
    },
    onMutate() {
      console.log("unfollow");
      const value: authUser | undefined = queryClient.getQueryData(["user"]);
      if (value) {
        const shallow: authUser = {
          ...value,
          followers: value.followers.filter(
            (value) => value.following_id === id
          ),
        };
        console.log(
          "shallow:",
          value.followers.filter((value) => id === value.following_id)
          // 여기부터
        );
        queryClient.setQueryData(["user"], shallow);
      }
    },
    onError() {
      console.log("error");
      const value: authUser | undefined = queryClient.getQueryData(["user"]);
      if (value) {
        const shallow: authUser = {
          ...value,
          followers: [{ following_id: id }, ...value.followers],
        };
        queryClient.setQueryData(["user"], shallow);
      }
    },
    onSettled() {},
  });
  return { follow, unfollow };
};
