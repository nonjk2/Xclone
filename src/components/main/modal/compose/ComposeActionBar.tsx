import Button from "@/components/ui/button";
import { Icon } from "@/components/ui/icon/GoogleIcon";
import { location, postArray } from "@/lib/Icon";

type ComposeActionIcons =
  | "picture"
  | "gif"
  | "poll"
  | "smile"
  | "callendar"
  | "location";

const Array: ComposeActionIcons[] = [
  "picture",
  "gif",
  "poll",
  "smile",
  "callendar",
  "location",
];
interface ComposeActionProps {
  previewImage: string | null;
}

const ComposeActionBar = ({}: ComposeActionProps) => {
  const ComposeActionIcons = postArray.map((path, idx) => {
    return {
      path,
      key: Array[idx],
    };
  });
  const IconClickHandler = (key: ComposeActionIcons) => {
    switch (key) {
      case "callendar":
        return;
      case "gif":
        return;
      case "location":
        return;
      case "picture":
        console.log("asdfsadf");
      case "poll":
        return;
      case "smile":
        return;

      default:
        return;
    }
  };
  return (
    <div
      className={`flex justify-between pb-2 ${`border-t border-t-gubunsun`}`}
    >
      <div className="flex gap-[4px] justify-center items-center mt-2 -ml-2">
        {ComposeActionIcons.map(({ path, key }, i) => {
          return (
            <div
              className={
                path === location
                  ? "flex w-[34px] h-[34px] justify-center items-center flex-row"
                  : "flex w-[34px] h-[34px] justify-center items-center rounded-full flex-row cursor-pointer hover:bg-hoverLightBlue"
              }
              key={path}
              onClick={() => IconClickHandler(key)}
            >
              <div className="footer-item-icon">
                <Icon
                  path={path}
                  color={
                    path === location
                      ? "rgb(29, 155, 240 , 0.5)"
                      : "rgb(29, 155, 240)"
                  }
                  height={5}
                  width={5}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 ml-2 flex">
        <Button
          hoverColor="hoverBgblue"
          backgroundColor="blue"
          color="white"
          size="tweet2"
          // onClick={onUploadToServerButtonClick}
          title={<span>Tweet</span>}
        />
      </div>
    </div>
  );
};
export default ComposeActionBar;
