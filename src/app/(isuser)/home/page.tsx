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
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  // const cookie = cookies();
  const client = serverClient();
  const {
    data: { user },
    error,
  } = await client.auth.getUser();

  if (error || !user) {
    redirect("/");
  }
  // if (!user) {
  //   console.log("User not found");
  //   return redirect("/");
  // }

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
