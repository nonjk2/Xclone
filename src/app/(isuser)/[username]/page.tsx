import Loading from "@/app/(notuser)/@modal/(.)i/flow/signup/loading";
import HomePostList from "@/components/main/center/home/HomePostList";
import ProfileLayout from "@/components/main/center/profile/ProfileLayout";
import Tab from "@/components/main/center/profile/Tab";
import { Suspense } from "react";

const page = () => {
  return (
    <main className="relative w-full">
      <div className="w-full h-[200px] bg-inputColor"></div>
      <ProfileLayout />
      <Tab />
      <Suspense fallback={<Loading />}>
        <HomePostList />
      </Suspense>
    </main>
  );
};
export default page;
