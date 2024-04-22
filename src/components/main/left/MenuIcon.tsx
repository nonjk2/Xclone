"use client";
import { Icon, MenuIconSvg } from "@/components/ui/icon/GoogleIcon";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

interface MainHeaderListItemProps {
  title?: string;
  path: string;
  boldPath?: string;
  link?: string;
  color?: string;
  pathname?: string | null;
}

const MenuIcon: React.FC<MainHeaderListItemProps> = (props) => {
  const { title, path, boldPath, color, pathname } = props;
  const seg = useSelectedLayoutSegment();

  const sameTitle = (title && title.toLowerCase() === seg) || seg === pathname;
  const boldIcon = sameTitle ? (
    <>
      {!!boldPath && (
        <div className="relative flex grow">
          <MenuIconSvg path={boldPath} width={6} height={6} color={color} />
        </div>
      )}

      {title && (
        <div className="flex items-center ml-5 mr-4 max-xl:hidden">
          <span className="font-bold text-[21px]">{title}</span>
        </div>
      )}
    </>
  ) : (
    <>
      <div className="relative">
        <MenuIconSvg path={path} width={6} height={6} color={color} />
      </div>
      {title && (
        <div className="flex items-center ml-5 mr-4 max-xl:hidden">
          <span className="text-xl">{title}</span>
        </div>
      )}
    </>
  );

  return (
    <Link
      href={`/${pathname}`}
      color={color}
      className="flex w-[236.78px] max-xl:w-full h-[50.25px] text-black group first:pt-[2px] max-xl:items-center max-xl:justify-center"
    >
      <div
        title={title}
        className="group-hover:bg-lightblack flex p-3 rounded-full cursor-pointer transition-all duration-200 ease-in"
      >
        {boldIcon}
      </div>
    </Link>
  );
};

export default MenuIcon;
