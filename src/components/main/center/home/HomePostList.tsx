import { mockPosts } from "@/__test__/MockPostData";
import MainCenterListItem from "./HomePostItem";

const DATA = mockPosts;

const HomePostList = () => {
  return (
    <>
      {DATA?.map((e) => (
        <MainCenterListItem key={e.postId} {...e} />
      ))}
    </>
  );
};
export default HomePostList;
