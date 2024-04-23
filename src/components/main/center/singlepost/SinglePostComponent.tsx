"use client";

import Loading from "@/app/(isuser)/explore/loading";
import PhotoBoardSection from "@/components/photo/PhotoBoardSection";
import usePost from "@/lib/hooks/usePost";
import { supabaseClient } from "@/lib/util/supabase";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface SinglePostProps {
  PostId: string;
}

const SinglePostComponent = ({ PostId }: SinglePostProps) => {
  const { data, status } = useSession();
  if (status === "loading") {
    return <>loading...</>;
  }
  const client = supabaseClient(data?.supabaseAccessToken);
  const { data: post, isPending } = useQuery<
    Post,
    Object,
    Post,
    [_1: string, string]
  >(usePost({ client, PostId }));
  if (isPending) {
    return <Loading />;
  }
  if (!post) {
    return <>없는 게시물입니다.</>;
  }
  return <PhotoBoardSection Post={post} photo={false} />;
};
export default SinglePostComponent;
