import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/button";

const Page = () => {
  return (
    <main className="relative w-full">
      <div className="w-full h-[200px] bg-inputColor"></div>

      <div className="mb-4 px-4 flex flex-col pt-3">
        <div className="flex flex-row flex-wrap items-start text-[15px] justify-between">
          <div className="relative w-1/4 min-w-[48px] -mb-[15%]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[145px] h-[145px] rounded-full bg-white flex items-center justify-center">
              <div className="w-[135px] h-[135px] bg-inputColor rounded-full overflow-hidden">
                <Avatar profile />
              </div>
            </div>
          </div>

          <div className="flex h-[68px]">
            <Button
              hoverColor="hoverLightBlack"
              size="editProfile"
              title={<span>Edit profile</span>}
              color="black"
              backgroundColor="white"
            />
          </div>
        </div>
        <div className="flex flex-col mt-1 mb-3">
          <span className="text-xl font-extrabold">유저네임</span>
          <span className="flex items-center text-[15px]">@ㅇㅇ</span>
        </div>
      </div>
    </main>
  );
};
export default Page;
