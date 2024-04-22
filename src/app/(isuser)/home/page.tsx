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
import { getServerSession } from "next-auth";
import { authOption } from "@/auth";
import { serverClient } from "@/lib/util/serverSBClient";
import usePostList from "@/lib/hooks/usePostList";

const Page = async () => {
  const session = await getServerSession(authOption);
  const queryClient = new QueryClient();
  if (!session?.supabaseAccessToken) {
    return <>loding...</>;
  }
  const client = serverClient(session?.supabaseAccessToken);
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
