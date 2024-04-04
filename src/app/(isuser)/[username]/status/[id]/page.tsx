"use client";

import MainCenterListItem from "@/components/main/center/home/HomePostItem";
import { getSinglePost } from "@/lib/action/server";
import { useQuery } from "@tanstack/react-query";
interface SinglePostPageProps {
  params: { id: string };
}
const SiglePostPage = ({ params }: SinglePostPageProps) => {
  const { id } = params;

  const { data: post } = useQuery<Post, Object, Post, [_1: string, _2: number]>(
    {
      queryKey: ["post", parseInt(id)],
      queryFn: getSinglePost,
    }
  );
  if (post) {
    return (
      <article className="w-full h-full">
        <MainCenterListItem {...post} />
      </article>
    );
  }
  return <>게시물이 존재하지않습니다.</>;
};
export default SiglePostPage;
