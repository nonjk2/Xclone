"use client";
import { earth, location, picture, postArray } from "@/lib/Icon";
import { Icon } from "../../../ui/icon/GoogleIcon";
import Button from "../../../ui/button";
import Avatar from "../../../ui/Avatar";
import ComposeHeader from "./ComposeHeader";

const ComposePost = () => {
  return (
    <section className="flex flex-col w-full">
      <ComposeHeader />
      <div className="px-4 w-full flex flex-col h-[225px] pt-1">
        <div className="flex w-full">
          <div className="mr-3 pt-3">
            <Avatar />
          </div>

          <div className=" min-h-[120px] pb-3 grow pt-4">
            <div
              style={{
                font: "14px -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
              }}
              className="border-none border-b-[2px] border-opacity-0 flex rounded border-2 flex-col cursor-text break-words text-xl text-inputColor whitespace-pre-wrap "
            >
              <textarea
                // ref={textareaRef}
                className="min-h-[96px] leading-normal overflow-hidden resize-none relative flex box-border border-none rounded-md placeholder:break-words placeholder:text-xl text-xl text-hoverProfile whitespace-pre-wrap"
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

        <div className="flex px-3 pb-3 w-fit -ml-2 pt-1">
          <div className="min-h-[24px] items-center justify-center flex cursor-pointer select-none text-center break-words leading-5 font-bold grow text-blue rounded-full hover:bg-hoverLightBlue gap-1">
            <Icon
              height={4}
              path={earth}
              width={4}
              color={"rgb(29, 155, 240)"}
            />
            <span className="text-sm">Everyone can reply</span>
          </div>
        </div>

        <div
          className={`flex justify-between pb-2 ${`border-t border-t-gubunsun`}`}
        >
          <div className="flex gap-[4px] justify-center items-center mt-2 -ml-2">
            {postArray.map((path, i) => {
              return (
                <div
                  className={
                    path === location
                      ? "flex w-[34px] h-[34px] justify-center items-center flex-row"
                      : "flex w-[34px] h-[34px] justify-center items-center rounded-full flex-row cursor-pointer hover:bg-hoverLightBlue"
                  }
                  key={path}
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
      </div>
    </section>
  );
};
export default ComposePost;
