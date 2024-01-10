import PostTweet from "@/components/main/center/PostTweet";

const Page = () => {
  return (
    <div className="flex flex-col w-full">
      <PostTweet type="tweet" comment="What is happening?!" />
    </div>
  );
};
export default Page;
