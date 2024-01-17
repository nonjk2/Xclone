/* eslint-disable @next/next/no-img-element */
interface AvatarProps {
  imgUrl?: string | null;
}

const Avatar = ({ imgUrl }: AvatarProps) => {
  const AvatarImage = imgUrl ?? "/normal.png";
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
