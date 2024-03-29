import PostTweet from "@/components/main/center/PostTweet";
import HomePostList from "@/components/main/center/home/HomePostList";
import { Suspense } from "react";
import Loading from "../explore/loading";
import { getServerSession } from "next-auth";
import { authOption } from "@/auth";
import { getPostList } from "@/lib/action/server";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import HomeTabPostList from "@/components/main/center/home/HomeTabPostList";

const Page = async () => {
  const session = await getServerSession(authOption);
  const client = new QueryClient();
  await client.fetchQuery({
    queryKey: ["post", "recommend"],
    queryFn: getPostList,
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
