"use client";

import { HomeTabContext } from "@/context/HomeTabProvider";
import { useContext } from "react";
import HomeFollowPostList from "./HomeFollowPostList";
import HomePostList from "./HomePostList";

const HomeTabPostList = () => {
  const { tab } = useContext(HomeTabContext);
  if (tab === "rec") {
    return <HomePostList />;
  }
  return <HomeFollowPostList />;
};
export default HomeTabPostList;
