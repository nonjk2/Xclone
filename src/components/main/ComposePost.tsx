import { close } from "@/lib/Icon";
import { Icon } from "../ui/icon/GoogleIcon";
import Button from "../ui/button";
import Avatar from "../ui/Avatar";

const ComposePost = () => {
  const ComposeHeader = (
    <div className="flex justify-between items-center h-[53px] px-4 w-full">
      <div>
        <Icon width={5} height={5} path={close} />
      </div>
      <Button
        backgroundColor="white"
        hoverColor="hoverLightBlue"
        color="blue"
        size="draft"
        title={
          <span className="font-bold text-[14px] text-blue text-center">
            Drafts
          </span>
        }
      />
    </div>
  );

  return (
    <section className="flex flex-col w-full">
      {ComposeHeader}
      <div className="px-4 w-full flex flex-col h-[225px] pt-1">
        <div className="flex w-full">
          <div className="mr-3 pt-3">
            <Avatar />
          </div>
          <div className=" min-h-[120px] py-3 grow">
            <div
              style={{
                font: "14px -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
              }}
              className="border-none border-b-[2px] border-opacity-0 flex rounded border-2 flex-col cursor-text break-words text-xl text-inputColor whitespace-pre-wrap "
            >
              <textarea
                // ref={textareaRef}
                className="h-full leading-normal overflow-hidden resize-none relative flex box-border border-none rounded-md placeholder:break-words text-xl text-hoverProfile whitespace-pre-wrap"
                rows={1}
                style={{
                  font: '20px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
                }}
                // value={value["content"]}
                // onChange={handleOnChange}
                placeholder={"what is happenings?!"}
                // onFocus={() => settextFocus(true)}
                // onBlur={() => settextFocus(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ComposePost;
// .tweet-modal-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     height: 53px;
//     padding: 0 16px;
//   }
//   .tweet-modal-profile {
//     height: 66px;
//     padding: 0 16px;
//   }
//   .tweet-modal-replying {
//     height: 40px;
//     padding: 0 16px;
//   }
//   .tweet-modal-retweet {
//     height: 183.56px;
//   }
