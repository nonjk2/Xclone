"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import HomeSidebar from "./HomeSidebar";

const Sidebar = () => {
  const pathname = useSelectedLayoutSegment();

  switch (pathname) {
    // case "explore":
    //   return <ExploreSidebar />;
    // case "notifications":
    //   return <NotificationsSidebar />;
    // case "messages":
    //   return <MessagesSidebar />;
    case "profile":
      return <HomeSidebar />;
    case "home":
      return <HomeSidebar />;
    default:
      return <div>header</div>;
  }
};

export default Sidebar;
