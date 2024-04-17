"use client";
import { threedot } from "@/lib/Icon";
import { switchColor } from "@/lib/func";
import image from "next/image";
import IdPath from "../main/center/home/homepostaction/IdPath";
import Avatar from "../ui/Avatar";
import { ActionBarIconSvg } from "../ui/icon/GoogleIcon";
import HomeListItemActionBar from "../main/center/home/HomeListItemActionBar";
import PostTweet from "../main/center/PostTweet";
import { Suspense } from "react";

const PhotoBoardSection = ({ Post }: { Post: Post }) => {
  const { id, nickname, image, name } = Post.User;
  const { createdAt, _count } = Post;

  function formatDate(date: Date) {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour12: true,
      timeZone: "Asia/Seoul",
    }).format(date);
    const [day, year, time] = formattedDate.split(",");

    return `${time} · ${day}, ${year} · `;
  }

  return (
    <section
      id="photo-section-2"
      className="flex flex-col w-[350px] bg-white overflow-y-scroll"
      onClick={(e) => e.stopPropagation()}
    >
      <article className="flex w-full px-4 pt-3 flex-col">
        {/* 프로필 */}
        <div className="flex justify-between w-full">
          <div className="mr-2">
            <Avatar imgUrl={image} />
          </div>
          <div className="flex flex-col leading-5 grow">
            <IdPath id={nickname} nickname={name}>
              {name}
            </IdPath>
            <IdPath id={nickname} />
          </div>
          <div className="relative group cursor-pointer">
            <div
              className={`w-[34.75px] h-[34.75px] absolute ring-0 top-0 bottom-0 left-0 transition-all duration-200 rounded-full -m-2 ${
                switchColor("BookMark").hoverCircle
              }`}
            />
            <div className={`flex ${switchColor("BookMark").hoverIcon}`}>
              <ActionBarIconSvg
                color={"rgb(83, 100, 113)"}
                height={5}
                width={5}
                path={threedot}
              />
            </div>
          </div>
        </div>

        {/* 컨텐츠  */}
        <div className="mt-3">{Post.content}</div>
        <div className="mt-1">
          <span className="text-blue text-[13px] hover:underline">
            Translate bio
          </span>
        </div>
        <div className="flex my-4 items-center text-sm leading-5">
          <time className="text-inputColor">
            {formatDate(new Date(createdAt as string))}
          </time>
          <span className="font-bold mx-1">12</span> {" Views"}
        </div>

        <div className="flex w-full h-12 border-y border-y-gubunsun">
          <HomeListItemActionBar post={Post} type="photoboard" />
        </div>
      </article>
      {/* Reply */}
      <PostTweet type="tweet" comment="Post Reply" photo />
      {/* 게시물 */}
      <Suspense></Suspense>
      <div className="min-h-[1200px] h-[1200px] bg-blue"></div>
    </section>
  );
};
export default PhotoBoardSection;
