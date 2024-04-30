import { MouseEventHandler, ReactNode } from "react";
import Avatar from "../ui/Avatar";
import { useRouter } from "next/navigation";

interface ProfileComponentProps {
  onClickLogoutHandelr: MouseEventHandler<HTMLDivElement>;
  authUser: authUser;
  typeStyle: {
    buttonType: string;
    followContainer: string;
    nicknameType: string;
  };
  sideClickItem: () => JSX.Element;
}

const ProfileComponent = ({
  authUser,
  onClickLogoutHandelr,
  sideClickItem,
  typeStyle,
}: ProfileComponentProps) => {
  const { name, nickname, image } = authUser;
  const router = useRouter();
  return (
    <div
      className={typeStyle.followContainer}
      onClick={() => router.push(`/${nickname}`)}
    >
      <div className="flex justify-between p-3 w-full items-center">
        <>
          <Avatar imgUrl={image} />
          <div className={typeStyle.nicknameType}>
            <div className="font-semibold">{name}</div>
            <div className="text-inputColor text-sm">@{nickname}</div>
          </div>
        </>

        <div className={typeStyle.buttonType}>
          <div
            className="flex w-full items-center"
            onClick={onClickLogoutHandelr}
          >
            {sideClickItem()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileComponent;
