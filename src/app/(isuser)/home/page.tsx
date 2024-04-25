import PostTweet from "@/components/main/center/PostTweet";
import { Suspense } from "react";
import Loading from "../explore/loading";

import {
  HydrationBoundary,
  InfiniteData,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import HomeTabPostList from "@/components/main/center/home/HomeTabPostList";

import { serverClient } from "@/lib/util/serverSBClient";
import usePostList from "@/lib/hooks/usePostList";
import { redirect } from "next/navigation";

const Page = async () => {
  const client = serverClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery<
    Post[],
    Object,
    InfiniteData<Post[]>,
    [_1: string, _2: string],
    string | undefined
  >(usePostList({ client }));

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex flex-col w-full">
      <HydrationBoundary state={dehydratedState}>
        <PostTweet type="tweet" comment="What is happening?!" />
        <Suspense fallback={<Loading />}>
          <HomeTabPostList />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
};
export default Page;
