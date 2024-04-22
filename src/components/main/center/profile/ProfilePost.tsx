"use client";

import { useQuery } from "@tanstack/react-query";
import MainCenterListItem from "../home/HomePostItem";
import { getUsersPosts } from "@/lib/action/post-server";

const ProfilePost = ({ username }: { username: string }) => {
  const { data } = useQuery<
    Post[],
    Object,
    Post[],
    [_1: string, _2: string, _3: string]
  >({ queryKey: ["users", "posts", username], queryFn: getUsersPosts });
  return data?.map((post) => <MainCenterListItem key={post.id} {...post} />);
};
export default ProfilePost;
