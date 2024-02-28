import PostTweet from "@/components/main/center/PostTweet";
import HomePostList from "@/components/main/center/home/HomePostList";
import { Suspense } from "react";
import Loading from "../explore/loading";

const Page = async () => {
  return (
    <main className="flex flex-col w-full">
      <PostTweet type="tweet" comment="What is happening?!" />
      <Suspense fallback={<Loading />}>
        <HomePostList />
      </Suspense>
    </main>
  );
};
export default Page;
