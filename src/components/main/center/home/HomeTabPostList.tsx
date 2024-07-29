// "use client";

import { HomeTabContext } from "@/context/HomeTabProvider";
import { Suspense, useContext } from "react";
import HomeFollowPostList from "./HomeFollowPostList";
import HomePostList from "./HomePostList";
import { setTimeout } from "timers/promises";
import {
  HydrationBoundary,
  InfiniteData,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import usePostList from "@/lib/hooks/usePostList";
import { serverClient } from "@/lib/util/serverSBClient";

const HomeTabPostList = async () => {
  const queryClient = new QueryClient();
  const client = serverClient();
  await queryClient.prefetchInfiniteQuery<
    Post[],
    Object,
    InfiniteData<Post[]>,
    [_1: string, _2: string],
    string | undefined
  >(usePostList({ client }));

  const dehydratedState = dehydrate(queryClient);
  // const { tab } = useContext(HomeTabContext);
  // if (tab === "rec") {
  return (
    <HydrationBoundary state={dehydratedState}>
      <HomePostList />
    </HydrationBoundary>
  );

  // }
  // return <HomeFollowPostList />;
};
export default HomeTabPostList;
