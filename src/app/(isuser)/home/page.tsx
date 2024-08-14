import PostTweet from "@/components/main/center/PostTweet";
import { Suspense } from "react";
import Loading from "../explore/loading";
import HomeTabPostList from "@/components/main/center/home/HomeTabPostList";

import { serverClient } from "@/lib/util/serverSBClient";
import { redirect } from "next/navigation";

const Page = async () => {
  const client = serverClient();
  const {
    data: { user },
    error,
  } = await client.auth.getUser();

  if (error || !user) {
    redirect("/");
  }

  return (
    <main className="flex flex-col w-full">
      <PostTweet type="tweet" comment="오늘의 기분은???" />
      <Suspense fallback={<Loading />}>
        <HomeTabPostList />
      </Suspense>
    </main>
  );
};
export default Page;
