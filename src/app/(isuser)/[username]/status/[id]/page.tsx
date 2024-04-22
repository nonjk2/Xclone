"use client";

import Loading from "@/app/(isuser)/explore/loading";
import MainCenterListItem from "@/components/main/center/home/HomePostItem";
import PhotoBoardSection from "@/components/photo/PhotoBoardSection";
import { getSinglePost } from "@/lib/action/post-server";
import { supabaseClient } from "@/lib/util/supabase";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
interface SinglePostPageProps {
  params: { id: string };
}
const SiglePostPage = ({ params }: SinglePostPageProps) => {
  const { id } = params;
  const { data, status } = useSession();
  if (status === "loading") {
    <>loading...</>;
  }
  const client = supabaseClient(data?.supabaseAccessToken);
  const { data: post, isPending } = useQuery<
    Post,
    Object,
    Post,
    [_1: string, string]
  >({
    queryKey: ["post", id],
    queryFn: (queryKey) =>
      getSinglePost({ queryKey: queryKey.queryKey, client }),
  });
  if (isPending) {
    return <Loading />;
  }
  if (post) {
    return (
      <article className="w-full h-full">
        <PhotoBoardSection Post={post} photo={false} />
      </article>
    );
  }
  return <>게시물이 존재하지않습니다.</>;
};
export default SiglePostPage;
