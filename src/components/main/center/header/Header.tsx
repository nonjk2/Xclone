"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import HomeHeader from "./HomeHeader";
import ExploreHeader from "./ExploreHeader";
import ProfileHeader from "./ProfileHeader";
import MessagesHeader from "./MessagesHeader";

const Header = () => {
  const pathname = useSelectedLayoutSegment();
  switch (pathname) {
    case "explore":
      return <ExploreHeader />;
    // case "notifications":
    //   return <NotificationsHeader />;
    case "messages":
      return <MessagesHeader />;
    case "profile":
      return <ProfileHeader />;
    case "home":
      return <HomeHeader />;
    default:
      return <HomeHeader />;
  }
};
``;
export default Header;
