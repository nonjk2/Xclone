import { mockPosts } from "@/__test__/MockPostData";
import MainCenterListItem from "./HomePostItem";
import { setTimeout } from "timers/promises";

const DATA = mockPosts;

const HomePostList = async () => {
  await setTimeout(1000);
  return (
    <>
      {DATA?.map((e) => (
        <MainCenterListItem key={e.postId} {...e} />
      ))}
    </>
  );
};
export default HomePostList;
