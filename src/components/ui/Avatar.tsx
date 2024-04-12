import { useSession } from "next-auth/react";
import Image from "next/image";

/* eslint-disable @next/next/no-img-element */
interface AvatarProps {
  imgUrl?: string | null;
  profile?: boolean;
}

const Avatar = ({ imgUrl, profile = false }: AvatarProps) => {
  const { data: me } = useSession();
  const AvatarImage = me?.user?.image ?? "/normal.png";
  if (profile) {
    return (
      <div className="relative w-full h-full overflow-hidden select-none">
        <Image
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={imgUrl ?? `${AvatarImage}`}
          alt="Background Image"
          width={100}
          height={100}
          priority
        />
        <div className="bg-[rgba(0,0,0,0)] absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-no-repeat bg-center transition-all bg-cover cursor-pointer hover:bg-[rgba(26,26,26,0.15)] duration-200" />
      </div>
    );
  }
  return (
    <div className="relative w-10 h-10 basis-[40px] overflow-hidden rounded-full select-none">
      <div className="avartar"></div>

      <img
        src={AvatarImage}
        alt={AvatarImage}
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
      />
    </div>
  );
};
export default Avatar;
