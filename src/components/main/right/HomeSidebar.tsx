import SidebarTrendList from "./trend/TrendList";
import { Suspense } from "react";
import FollowComponent from "@/components/follow/FollowComponent";
import HeaderSearchComponent from "./HeaderSearchComponent";

const HomeSidebar = () => {
  return (
    <div className="relative flex flex-col gap-4">
      <HeaderSearchComponent />
      <div className="rounded-lg">
        <Suspense>
          <SidebarTrendList sidebar />
        </Suspense>
      </div>
      <div className="rounded-lg">
        <Suspense>
          <FollowComponent />
        </Suspense>
      </div>
      <div className="sidebar-who to follow"></div>

      <div className="sidebar-links"></div>
    </div>
  );
};

export default HomeSidebar;
