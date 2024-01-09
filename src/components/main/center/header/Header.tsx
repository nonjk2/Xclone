"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import HomeHeader from "./HomeHeader";

const Header = () => {
  const pathname = useSelectedLayoutSegment();

  switch (pathname) {
    // case "explore":
    //   return <ExploreHeader />;
    // case "notifications":
    //   return <NotificationsHeader />;
    // case "messages":
    //   return <MessagesHeader />;
    // case "profile":
    //   return <ProfileHeader />;
    case "home":
      return <HomeHeader />;
    default:
      return <div>header</div>;
  }
};
``;
export default Header;
