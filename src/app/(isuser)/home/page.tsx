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
import { getPostList } from "@/lib/action/post-server";
import { getServerSession } from "next-auth";
import { authOption } from "@/auth";

const Page = async () => {
  const session = await getServerSession(authOption);
  const supabaseAccessToken = session?.supabaseAccessToken ?? "";
  const client = new QueryClient();
  await client.prefetchInfiniteQuery<
    Post[],
    Object,
    InfiniteData<Post[]>,
    [_1: string, _2: string],
    string | undefined
  >({
    queryKey: ["post", "recommend"],
    queryFn: (queryKey) =>
      getPostList({ pageParam: queryKey.pageParam, supabaseAccessToken }),
    initialPageParam: undefined,
  });
  const dehydratedState = dehydrate(client);
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
