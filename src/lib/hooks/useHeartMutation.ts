import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateHeartPost } from "../action/post-server";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { supabaseClient } from "../util/supabase";

export const useHeartMutation = (data: Session | null, id: string) => {
  const queryClient = useQueryClient();
  const session = useSession();
  const supabaseAccessToken = session.data?.supabaseAccessToken ?? "";
  const client = supabaseClient(supabaseAccessToken);
  /** optimistic update */
  const heart = useMutation({
    mutationFn: () => {
      return updateHeartPost({
        post_id: id,
        type: "like",
        client,
      });
    },
    onMutate() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);

      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "post") {
          const value: Post | InfiniteData<Post[]> | undefined =
            queryClient.getQueryData(queryKey);
          if (value && "pages" in value) {
            const obj = value.pages.flat().find((v) => v.id === id);
            if (obj) {
              const pageIndex = value.pages.findIndex((page) =>
                page.includes(obj)
              );
              const index = value.pages[pageIndex].findIndex(
                (v) => v.id === id
              );
              const shallow: InfiniteData<Post[]> = { ...value };
              value.pages = { ...value.pages };
              value.pages[pageIndex] = [...value.pages[pageIndex]];
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Heart: [{ user_id: data?.user.id as string }],
                HeartLiked: !shallow.pages[pageIndex][index].HeartLiked,
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Hearts: shallow.pages[pageIndex][index]._count.Hearts + 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            if (value.id === id) {
              const shallow: Post = {
                ...value,
                HeartLiked: !value.HeartLiked,
                Heart: [{ user_id: data?.user?.id as string }],
                _count: {
                  ...value._count,
                  Hearts: value._count.Hearts + 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
    onError() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "post") {
          const value: Post | InfiniteData<Post[]> | undefined =
            queryClient.getQueryData(queryKey);
          if (value && "pages" in value) {
            // console.log("array", value);
            const obj = value.pages.flat().find((v) => v.id === id);
            if (obj) {
              // 존재는 하는지
              const pageIndex = value.pages.findIndex((page) =>
                page.includes(obj)
              );
              const index = value.pages[pageIndex].findIndex(
                (v) => v.id === id
              );
              //   console.log("found index", index);
              const shallow: InfiniteData<Post[]> = { ...value };
              value.pages = { ...value.pages };
              value.pages[pageIndex] = [...value.pages[pageIndex]];
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Heart: shallow.pages[pageIndex][index].Heart.filter(
                  (v) => v.user_id !== data?.user?.id
                ),
                HeartLiked: !shallow.pages[pageIndex][index].HeartLiked,
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Hearts: shallow.pages[pageIndex][index]._count.Hearts - 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            // 싱글 포스트인 경우
            if (value.id === id) {
              const shallow: Post = {
                ...value,
                Heart: value.Heart.filter((v) => v.user_id !== data?.user?.id),
                HeartLiked: !value.HeartLiked,
                _count: {
                  ...value._count,
                  Hearts: value._count.Hearts - 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
    onSettled() {},
  });
  /** optimistic update */
  const unheart = useMutation({
    mutationFn: () => {
      return updateHeartPost({
        post_id: id,
        type: "unlike",
        client,
      });
    },
    onMutate() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      //   console.log("queryKeys", queryKeys);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "post") {
          const value: Post | InfiniteData<Post[]> | undefined =
            queryClient.getQueryData(queryKey);
          if (value && "pages" in value) {
            const obj = value.pages.flat().find((v) => v.id === id);
            if (obj) {
              // 존재는 하는지
              const pageIndex = value.pages.findIndex((page) =>
                page.includes(obj)
              );
              const index = value.pages[pageIndex].findIndex(
                (v) => v.id === id
              );
              const shallow: InfiniteData<Post[]> = { ...value };
              value.pages = { ...value.pages };
              value.pages[pageIndex] = [...value.pages[pageIndex]];
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                HeartLiked: !shallow.pages[pageIndex][index].HeartLiked,
                Heart: shallow.pages[pageIndex][index].Heart.filter(
                  (v) => v.user_id !== data?.user?.id
                ),
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Hearts: shallow.pages[pageIndex][index]._count.Hearts - 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            // 싱글 포스트인 경우
            if (value.id === id) {
              const shallow: Post = {
                ...value,
                Heart: value.Heart.filter((v) => v.user_id !== data?.user?.id),
                HeartLiked: !value.HeartLiked,
                _count: {
                  ...value._count,
                  Hearts: value._count.Hearts - 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
    onError() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      //   console.log("queryKeys", queryKeys);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "post") {
          //   console.log(queryKey[0]);
          const value: Post | InfiniteData<Post[]> | undefined =
            queryClient.getQueryData(queryKey);
          if (value && "pages" in value) {
            // console.log("array", value);
            const obj = value.pages.flat().find((v) => v.id === id);
            if (obj) {
              // 존재는 하는지
              const pageIndex = value.pages.findIndex((page) =>
                page.includes(obj)
              );
              const index = value.pages[pageIndex].findIndex(
                (v) => v.id === id
              );
              const shallow: InfiniteData<Post[]> = { ...value };
              value.pages = { ...value.pages };
              value.pages[pageIndex] = [...value.pages[pageIndex]];
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Heart: [{ user_id: data?.user?.id as string }],
                HeartLiked: !shallow.pages[pageIndex][index].HeartLiked,
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Hearts: shallow.pages[pageIndex][index]._count.Hearts + 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            // 싱글 포스트인 경우
            if (value.id === id) {
              const shallow: Post = {
                ...value,
                Heart: [{ user_id: data?.user?.id as string }],
                HeartLiked: !value.HeartLiked,
                _count: {
                  ...value._count,
                  Hearts: value._count.Hearts + 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
    onSettled() {},
  });
  return { heart, unheart };
};
