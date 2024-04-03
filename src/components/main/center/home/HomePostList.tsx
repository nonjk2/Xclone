"use client";

import { useQuery } from "@tanstack/react-query";
import MainCenterListItem from "./HomePostItem";
import { getPostList } from "@/lib/action/server";

// const DATA = mockPosts;

const HomePostList = () => {
  const { data: res } = useQuery({
    queryKey: ["post", "recommend"],
    queryFn: getPostList,
  });
  if (res) {
  }

  return res?.map((e) => <MainCenterListItem key={e.postId} {...e} />);
};
export default HomePostList;
