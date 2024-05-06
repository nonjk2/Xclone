"use client";
/* eslint-disable @next/next/no-img-element */
import Button from "./button";

import { MouseEventHandler, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/util/supabase";
import { useSuspenseQuery } from "@tanstack/react-query";
import useUser from "@/lib/hooks/useUser";
import ProfileComponent from "../auth/profileComponent";
import { useFollowMutation } from "@/lib/hooks/useFollowMutation";
import { typeStyle } from "./profile";

interface MainHeaderProfileProps {
  type: "follow" | "profile" | "search";
  onClick?: () => void;
  img?: string;
  data: authUser;
}

const FollowProfile: React.FC<MainHeaderProfileProps> = ({
  type,
  data: Userdata,
}) => {
  if (!Userdata) {
    return <>loading...</>;
  }
  const router = useRouter();
  const { follow, unfollow } = useFollowMutation(Userdata.id);
  const client = supabaseClient();
  const { data } = useSuspenseQuery(useUser({ client }));
  const isFollow = !!data.followers?.find(
    (followers) => followers.following_id === Userdata.id
  );
  const followButtonClick = () => {
    console.log(isFollow);
    if (!isFollow) {
      console.log("isNoFollow");
      follow.mutate();
    } else if (isFollow) {
      console.log("isFollow");
      unfollow.mutate();
    }
  };

  const sideClickItem = () => (
    <>
      {isFollow ? (
        <Button
          hoverColor="hoverBlack"
          backgroundColor="black"
          color="white"
          size="follow"
          title={<span className="text-[14px]">unFollow</span>}
        />
      ) : (
        <Button
          hoverColor="hoverBlack"
          backgroundColor="black"
          color="white"
          size="follow"
          title={<span className="text-[14px]">Follow</span>}
        />
      )}
    </>
  );

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
      followButtonClick();
    } else if (type === "profile") await logOutHandler();
  };

  if (Userdata && type === "follow") {
    return (
      <ProfileComponent
        authUser={Userdata}
        onClickLogoutHandelr={onClickLogoutHandelr}
        sideClickItem={sideClickItem}
        typeStyle={typeStyle(type)}
      />
    );
  }
};

export default FollowProfile;
