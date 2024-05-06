"use client";
/* eslint-disable @next/next/no-img-element */
import { cancel, threedot } from "@/lib/Icon";
import Button from "./button";
import { Icon } from "./icon/GoogleIcon";
import normal from "../../../public/normal.png";

import { MouseEventHandler, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/util/supabase";
import { useSuspenseQuery } from "@tanstack/react-query";
import useUser from "@/lib/hooks/useUser";
import ProfileComponent from "../auth/profileComponent";
import { useFollowMutation } from "@/lib/hooks/useFollowMutation";

interface MainHeaderProfileProps {
  type: "follow" | "profile" | "search";
  onClick?: () => void;
  img?: string;
  data?: authUser;
}

export const typeStyle = (type: MainHeaderProfileProps["type"]) => {
  switch (type) {
    case "follow":
      return {
        nicknameType: "mx-3 grow",
        buttonType: "flex items-center w-[78px]",
        followContainer:
          "flex my-3 w-full h-[65.06px] cursor-pointer hover:bg-hoverLightBlack transition-all duration-300 items-center",
      };
    case "profile":
      return {
        nicknameType: "mx-3 max-xl:hidden grow",
        buttonType:
          "flex-end flex rounded-full transition-all duration-300 max-xl:hidden",
        followContainer:
          "flex my-3 max-xl:w-[64px] w-full h-[65.06px] cursor-pointer hover:bg-hoverLightBlack transition-all duration-300 hover:rounded-full items-center",
      };
    case "search":
      return {
        nicknameType: "mx-3 max-xl:hidden grow",
        buttonType: "flex items-center",
        followContainer: "",
      };

    default:
      return {
        nicknameType: "mx-3 max-xl:hidden grow",
        buttonType: "",
        followContainer: "",
      };
  }
};

const MainHeaderProfile: React.FC<MainHeaderProfileProps> = ({
  type,
  data: Userdata,
}) => {
  const router = useRouter();

  const client = supabaseClient();
  const { data } = useSuspenseQuery(useUser({ client }));

  const sideClickItem = (type: MainHeaderProfileProps["type"]) => {
    switch (type) {
      case "follow":
        return (
          <Button
            hoverColor="hoverBlack"
            backgroundColor="black"
            color="white"
            size="follow"
            title={<span className="text-[14px]">Follow</span>}
          />
        );
      case "profile":
        return (
          <div className="flex items-end justify-end w-[63px]">
            <Icon
              color="rgb(15, 20, 25)"
              height={5}
              width={5}
              path={threedot}
            />
          </div>
        );
      case "search":
        return (
          <Icon color="rgb(15, 20, 25)" height={5} width={5} path={cancel} />
        );
    }
  };

  const logOutHandler = async () => {
    const client = supabaseClient();
    const { error } = await client.auth.signOut();

    if (error) {
      console.log(error);
      return;
    }
    router.push("/");
  };
  const onClickLogoutHandelr: MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === "follow") {
      // followButtonClick();
    } else if (type === "profile") await logOutHandler();
  };

  if (Userdata && type === "follow") {
    return (
      <ProfileComponent
        authUser={Userdata}
        onClickLogoutHandelr={onClickLogoutHandelr}
        sideClickItem={() => sideClickItem(type)}
        typeStyle={typeStyle(type)}
      />
    );
  }

  return (
    <ProfileComponent
      authUser={data}
      onClickLogoutHandelr={onClickLogoutHandelr}
      sideClickItem={() => sideClickItem(type)}
      typeStyle={typeStyle(type)}
    />
  );
};

export default MainHeaderProfile;
