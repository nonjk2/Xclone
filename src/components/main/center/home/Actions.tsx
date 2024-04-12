"use client";
import {
  ActionBarIconSvg,
  PhotoActionBarIconSvg,
} from "@/components/ui/icon/GoogleIcon";

import {
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Player, PlayerState } from "@lottiefiles/react-lottie-player";
import Counter from "@/components/ui/Counter";
import { PostActionType } from "./HomeListItemActionBar";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { updateHeartPost } from "@/lib/action/post-server";

const Actions = ({
  count = 140,
  type,
  icon,
  short = false,
  photo = false,
  postId,
}: {
  count?: number;
  type: PostActionType;
  icon: string;
  short?: boolean;
  photo?: boolean;
  postId?: string;
}) => {
  const [heartIcon, setHeartIcon] = useState<boolean>(false);
  const [heartCount, setHeartCount] = useState<number>(count);
  const [liked, setLiked] = useState<boolean>(false);
  const playerRef = useRef<Player>(null);
  const photos = usePathname().includes("photo");
  const session = useSession();
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
  useEffect(() => {
    if (liked) {
      setHeartCount((prev) => prev + 1);
    } else if (!liked) {
      setHeartCount(count);
    }
  }, [liked, count]);

  const onClickActionHeart = async () => {
    const heartInstance = playerRef.current;
    setHeartIcon((prev) => !prev);
    setLiked((prev) => !prev);
    if (session.data && postId) {
      console.log("postId : ", postId);
      console.log("session.data.user.id : ", session.data.user.id);
      const res = await updateHeartPost({
        post_id: postId,
        type: "like",
        user_id: session.data?.user.id,
      });
    }
    // if (heartInstance) {
    //   const currentState = heartInstance.state.playerState;
    //   // const { play, pause ,stop} = heartInstance;
    //   switch (currentState) {
    //     case PlayerState.Paused:
    //       // console.log("paused -> ");
    //       heartInstance.stop();
    //       break;
    //     case PlayerState.Playing:
    //       // console.log("playing -> pause");
    //       heartInstance.stop();
    //       break;
    //     case PlayerState.Stopped:
    //       // console.log("stopped -> playing");
    //       heartInstance.play();
    //       break;
    //     case "frozen":
    //     case PlayerState.Loading:
    //       // console.log("loading -> playing");
    //       heartInstance.play();
    //       break;
    //     default:
    //       break;
    //   }
    // }
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
                <Player
                  ref={playerRef}
                  src={"/clickheart.json"}
                  autoplay={false}
                  loop={false}
                  controls={true}
                  keepLastFrame
                  className="absolute w-[40px] h-[40px] -top-1/2 -left-1/2"
                  background="none"
                />
                {!heartIcon && <WhiteSvg photo={photo} />}
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
              <Counter value={heartCount} />
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
