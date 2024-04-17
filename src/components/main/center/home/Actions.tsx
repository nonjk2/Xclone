"use client";
import {
  ActionBarIconSvg,
  PhotoActionBarIconSvg,
} from "@/components/ui/icon/GoogleIcon";

import { MouseEvent, useRef } from "react";
import { Player, PlayerState } from "@lottiefiles/react-lottie-player";
import Counter from "@/components/ui/Counter";
import { PostActionType } from "./HomeListItemActionBar";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useHeartMutation } from "@/lib/hooks/useHeartMutation";

const Actions = ({
  type,
  icon,
  post,
  short = false,
  photo = false,
  count,
}: {
  type: PostActionType;
  post: Post;
  icon: string;
  short?: boolean;
  photo?: boolean;
  count: number;
}) => {
  const { Heart, id } = post;
  const { data, status } = useSession();
  // const liked = !!Heart.find((v) => v.user_id === data?.user.id);
  const liked = post.HeartLiked;

  const playerRef = useRef<Player>(null);
  const photos = usePathname().includes("photo");
  const { heart, unheart } = useHeartMutation(data, id);

  const switchColor = (type: PostActionType) => {
    switch (type) {
      case "RePost":
        return {
          hoverCircle: "group-hover:bg-hoverGreen",
          hoverText: "group-hover:text-green",
          hoverIcon: "group-hover:text-green",
        };
      case "Heart":
        return {
          hoverCircle: "group-hover:bg-hoverRed",
          hoverText: "group-hover:text-red",
          hoverIcon: "group-hover:text-red",
        };

      default:
        return {
          hoverCircle: "group-hover:bg-hoverLightBlue",
          hoverText: "group-hover:text-blue",
          hoverIcon: "group-hover:text-blue",
        };
    }
  };

  const onClickActionHeart = async () => {
    if (heart.isPending || unheart.isPending) return;
    const heartInstance = playerRef.current;

    if (liked) {
      unheart.mutate();
    } else {
      heart.mutate();
    }

    if (heartInstance) {
      const currentState = heartInstance.state.playerState;
      // const { play, pause ,stop} = heartInstance;
      switch (currentState) {
        case PlayerState.Paused:
          // console.log("paused -> ");
          heartInstance.stop();
          break;
        case PlayerState.Playing:
          // console.log("playing -> pause");
          heartInstance.stop();
          break;
        case PlayerState.Stopped:
          // console.log("stopped -> playing");
          heartInstance.play();
          break;
        case "frozen":
        case PlayerState.Loading:
          // console.log("loading -> playing");
          heartInstance.play();
          break;
        default:
          break;
      }
    }
  };
  const onClickActionHandler = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    switch (type) {
      case "Heart":
        return onClickActionHeart();

      default:
        break;
    }
  };
  const WhiteSvg = ({ photo }: { photo: boolean }) => {
    if (photos) {
      return (
        <PhotoActionBarIconSvg
          width={22.5}
          height={22.5}
          path={icon}
          color="rgb(83,100,113)"
        />
      );
    }
    if (photo) {
      return (
        <PhotoActionBarIconSvg
          width={22.5}
          height={22.5}
          path={icon}
          color="rgb(255,255,255)"
        />
      );
    }
    return (
      <ActionBarIconSvg
        width={5}
        height={5}
        path={icon}
        color="rgb(83,100,113)"
      />
    );
  };
  return (
    <div
      className={`${short ? "" : "grow"} ${
        type === "BookMark" && "mr-2"
      } flex relative`}
    >
      <div
        className="z-0 flex group cursor-pointer"
        onClick={onClickActionHandler}
      >
        <div
          className={`${
            photo ? "w-[38.5px] h-[38.5px]" : "w-[34.75px] h-[34.75px]"
          } absolute ring-0 top-0 bottom-0 left-0 transition-all duration-200 rounded-full -m-2 ${
            switchColor(type).hoverCircle
          }`}
        />
        <div
          className={`flex ${switchColor(type).hoverIcon} ${
            photo ? "text-white" : "text-inputColor"
          }`}
        >
          <div
            className={`relative ${
              photo ? "w-[22.5px] h-[22.5px]" : "w-5 h-5"
            }`}
          >
            {type === "Heart" ? (
              <>
                {!liked ? (
                  <WhiteSvg photo={photo} />
                ) : (
                  <Player
                    ref={playerRef}
                    src={"/clickheart.json"}
                    autoplay={true}
                    loop={false}
                    controls={true}
                    keepLastFrame
                    className="absolute w-[40px] h-[40px] -top-1/2 -left-1/2"
                    background="none"
                  />
                )}
              </>
            ) : (
              <WhiteSvg photo={photo} />
            )}
          </div>

          {!short ? (
            <div
              className={`${
                switchColor(type).hoverText
              } px-1 flex justify-center items-center min-w-[calc(1em + 24px)] duration-200 transition-colors text-[13px] overflow-hidden`}
            >
              <Counter value={count} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Actions;
