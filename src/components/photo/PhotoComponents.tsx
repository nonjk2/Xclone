"use client";
import HomeListItemActionBar from "../main/center/home/HomeListItemActionBar";
import CloseButton from "./CloseButton";
import ShortButton from "./ShortButton";
import PhotoCaroucel from "./PhotoCaroucel";
import StyleProvider from "@/context/StyleProvider";
import PhotoBoardSection from "./PhotoBoardSection";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { supabaseClient } from "@/lib/util/supabase";
import usePost from "@/lib/hooks/usePost";
import Loading from "@/app/(isuser)/explore/loading";

const PhotoComponents = ({ id }: { id: string }) => {
  const client = supabaseClient();
  const { data: post, isPending } = useSuspenseQuery<
    Post,
    Object,
    Post,
    [_1: string, _2: string]
  >(usePost({ client, PostId: id }));

  if (!post || isPending) {
    return <Loading />;
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

        <PhotoBoardSection Post={post} photo />
      </main>
    </StyleProvider>
  );
};
export default PhotoComponents;
