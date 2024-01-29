import { Icon } from "@/components/ui/icon/GoogleIcon";
import { prev } from "@/lib/Icon";

const ProfileHeader = () => {
  return (
    <div className="sticky flex flex-row bg-opacity-80 bg-white backdrop-blur-md z-20 top-0 max-w-[1000px] h-[53px] w-full justify-center px-4">
      <div className="relative flex min-w-[56px] items-center">
        <div className="cursor-pointer">
          <Icon height={5} path={prev} width={5} />
        </div>
      </div>
      <div className="profileheader-info grow shrink">
        <h2 className="text-xl font-bold break-words py-[2px]">강신범</h2>
        <div className="text-inputColor text-[13px] leading-4">2 Tweets</div>
      </div>
    </div>
  );
};
export default ProfileHeader;
