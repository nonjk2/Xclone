"use client";
import { ActionBarIconSvg } from "@/components/ui/icon/GoogleIcon";
import { ActionType } from "./HomeListItemActionBar";
import { MouseEvent, MouseEventHandler, useRef, useState } from "react";
import { Player, PlayerState } from "@lottiefiles/react-lottie-player";
import Counter from "@/components/ui/Counter";
import { isNumber, isString, parseInt } from "lodash";

const Actions = ({
  count,
  type,
  icon,
  short = false,
}: {
  count?: number;
  type: ActionType;
  icon: string;
  short?: boolean;
}) => {
  const [heartIcon, setHeartIcon] = useState<boolean>(false);
  const [heartCount, setHeartCount] = useState<string>("0");
  const playerRef = useRef<Player>(null);
  const switchColor = (type: ActionType) => {
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
  const onClickActionHeart = () => {
    const heartInstance = playerRef.current;
    setHeartIcon((prev) => !prev);
    setHeartCount((prev) => {
      const a = parseInt(prev) + 1;
      return a.toString();
    });
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
          heartInstance.pause();
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

  return (
    <div
      className={`${short ? "" : "grow"} ${
        type === "BookMark" && "mr-2"
      } flex relative`}
    >
      <div className="z-50 flex group" onClick={onClickActionHandler}>
        <div
          className={`w-[34.75px] h-[34.75px] absolute ring-0 top-0 bottom-0 left-0 transition-all duration-200 rounded-full -m-2 ${
            switchColor(type).hoverCircle
          }`}
        />
        <div className={`flex ${switchColor(type).hoverIcon} text-inputColor`}>
          <div className="relative w-5 h-5">
            {type === "Heart" ? (
              <>
                <Player
                  ref={playerRef}
                  src={"/clickheart.json"}
                  autoplay={false}
                  loop={false}
                  controls={true}
                  onStateChange={(state) => {
                    if (state === "playing") {
                      console.log("playing");
                    } else {
                      console.log(state);
                    }
                  }}
                  keepLastFrame
                  className="absolute w-10 h-10 -top-1/2 -left-1/2"
                  background="none"
                />
                {!heartIcon && (
                  <ActionBarIconSvg
                    width={5}
                    height={5}
                    path={icon}
                    color="rgb(83,100,113)"
                  />
                )}
              </>
            ) : (
              <ActionBarIconSvg
                width={5}
                height={5}
                path={icon}
                color="rgb(83,100,113)"
              />
            )}
          </div>
          {count ? (
            <div
              className={`text-inputColor ${
                switchColor(type).hoverText
              } px-1 min-w-[calc(1em + 24px)] duration-200 transition-colors text-[13px] `}
            >
              <span className="inherit-span">
                <Counter from={"0"} to={heartCount} />
              </span>
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
