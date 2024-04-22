"use client";

import { useQuery } from "@tanstack/react-query";
import MainCenterListItem from "../home/HomePostItem";
import { useSession } from "next-auth/react";
import { supabaseClient } from "@/lib/util/supabase";
import useUsersPosts from "@/lib/hooks/useUsersPosts";

const ProfilePost = ({ username }: { username: string }) => {
  const { data: user, status } = useSession();
  if (status === "loading") {
    return <>loading...</>;
  }
  const client = supabaseClient(user?.supabaseAccessToken);
  const { data } = useQuery<
    Post[],
    Object,
    Post[],
    [_1: string, _2: string, _3: string]
  >(useUsersPosts({ client, username }));
  return data?.map((post) => <MainCenterListItem key={post.id} {...post} />);
};
export default ProfilePost;
