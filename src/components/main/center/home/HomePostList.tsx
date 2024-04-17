"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import MainCenterListItem from "./HomePostItem";
import { getPostList } from "@/lib/action/post-server";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSession } from "next-auth/react";
import Loading from "@/app/(isuser)/explore/loading";
// import { getPostList } from "@/lib/action/server";

// const DATA = mockPosts;
const HomePostLists = ({ supabaseToken }: { supabaseToken: string }) => {
  const {
    data: res,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<
    Post[],
    Object,
    InfiniteData<Post[]>,
    [_1: string, _2: string],
    string | undefined
  >({
    queryKey: ["post", "recommend"],
    queryFn: (queryKey) =>
      getPostList({
        pageParam: queryKey.pageParam,
        supabaseAccessToken: supabaseToken,
      }),
    getNextPageParam: (lastPage) => lastPage.at(-1)?.createdAt,
    initialPageParam: undefined,
  });
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      hasNextPage && fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return res?.pages?.map((pages, pageIndex) => (
    <Fragment key={pageIndex}>
      {pages.map((e, itemIndex) => {
        const lastPage = pageIndex === res.pages.length - 1;
        const lastItemInPage = itemIndex === pages.length - 1;
        const isLastItem = lastPage && lastItemInPage;
        if (isLastItem) {
          return <MainCenterListItem key={e.id} {...e} ref={ref} />;
        }
        return <MainCenterListItem key={e.id} {...e} />;
      })}
    </Fragment>
  ));
};

const HomePostList = () => {
  const { data, status } = useSession();
  if (!data?.supabaseAccessToken) {
    return <Loading />;
  }
  const supabaseAccessToken = data.supabaseAccessToken;
  return <HomePostLists supabaseToken={supabaseAccessToken} />;
};
export default HomePostList;
