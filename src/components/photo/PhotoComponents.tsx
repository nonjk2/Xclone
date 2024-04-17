"use client";
import HomeListItemActionBar from "../main/center/home/HomeListItemActionBar";
import { mockPosts } from "@/__test__/MockPostData";
import CloseButton from "./CloseButton";
import ShortButton from "./ShortButton";
import PhotoCaroucel from "./PhotoCaroucel";
import StyleProvider from "@/context/StyleProvider";
import PhotoBoardSection from "./PhotoBoardSection";
import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "@/lib/action/post-server";
import { useSession } from "next-auth/react";

const PhotoComponents = ({ id }: { id: string }) => {
  const session = useSession();
  const supabaseAccessToken = session.data?.supabaseAccessToken ?? "";
  const { data: post } = useQuery<Post, Object, Post, [_1: string, _2: string]>(
    {
      queryKey: ["post", id],
      queryFn: (key) =>
        getSinglePost({
          queryKey: key.queryKey as [string, string],
          supabaseAccessToken: supabaseAccessToken,
        }),
    }
  );

  if (!post) {
    return <>londing</>;
  }

  return (
    <StyleProvider>
      <main className="relative flex w-full max-h-screen">
        <section
          id="photo-section-1"
          className="relative flex flex-col shrink grow w-[calc(100%-350px)] h-screen"
        >
          <PhotoCaroucel post={post} />
          <div className="h-12 min-h-[48px]">
            <HomeListItemActionBar post={post} type="photo" />
          </div>
          <CloseButton />
          <ShortButton />
        </section>

        <PhotoBoardSection Post={post} />
      </main>
    </StyleProvider>
  );
};
export default PhotoComponents;
