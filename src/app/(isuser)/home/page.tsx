import PostTweet from "@/components/main/center/PostTweet";
import HomePostList from "@/components/main/center/home/HomePostList";
import { Suspense } from "react";

const Page = () => {
  return (
    <main className="flex flex-col w-full">
      <PostTweet type="tweet" comment="What is happening?!" />
      <Suspense>
        <HomePostList />
      </Suspense>
    </main>
  );
};
export default Page;
