/* eslint-disable @next/next/no-img-element */
import Button from "@/components/ui/button";
import { Icon } from "@/components/ui/icon/GoogleIcon";
import { earth, location, photoArray, picture, postArray } from "@/lib/Icon";
import useImageSelect from "@/lib/hooks/useImageSelect";
import { FormState } from "@/lib/hooks/useInput";
import { ChangeEvent, ReactNode, useCallback, useRef } from "react";

interface PostTweetTextAreaProps {
  photo?: boolean;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  value: FormState;
  reply?: boolean;
  settextFocus: () => void;
  textFocus: boolean;
  comment: string;
  onUploadImageButtonClick: () => void;
  children: ReactNode;
  disabled: boolean;
}

const PostTweetTextArea = ({
  photo,
  onChange,
  value,
  reply,
  settextFocus,
  textFocus,
  onUploadImageButtonClick,
  comment,
  children,
  disabled = false,
}: PostTweetTextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const IconArray = photo ? photoArray : postArray;

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event);
      const target = event.target;
      target.style.height = "inherit";
      target.style.height = `${target.scrollHeight}px`;
    },
    [onChange]
  );

  const IconFocusRender = () => {
    const Render = (
      <div
        className={`flex justify-between pb-2 ${
          textFocus && `border-t border-t-gubunsun`
        }`}
      >
        {
          <div className="flex gap-[4px] justify-center items-center mt-2 -ml-2">
            {IconArray.map((path, i) => {
              return (
                <div
                  className={
                    path === location
                      ? "flex w-[34px] h-[34px] justify-center items-center flex-row"
                      : "flex w-[34px] h-[34px] justify-center items-center rounded-full flex-row cursor-pointer hover:bg-hoverLightBlue"
                  }
                  key={path}
                  onClick={
                    disabled
                      ? () => {}
                      : path === picture
                      ? onUploadImageButtonClick
                      : () => {}
                  }
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
        }
        <div className="mt-3 ml-3 flex">
          <Button
            hoverColor="hoverLightBlue"
            backgroundColor="blue"
            color="white"
            size="tweet2"
            type="submit"
            disabled={disabled}
            title={<span>Tweet</span>}
          />
        </div>
      </div>
    );

    if (photo) {
      return <>{!reply && (textFocus || value["content"]) && Render}</>;
    }
    return Render;
  };
  return (
    <div className="flex flex-col grow justify-between pt-1 static duration-100 transition-all ease-out">
      <div
        style={{
          font: "14px -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
        }}
        className="border-none border-b-[2px] border-opacity-0 flex rounded border-2 flex-col py-3 cursor-text break-words text-xl text-inputColor whitespace-pre-wrap"
      >
        <textarea
          ref={textareaRef}
          className="w-full leading-normal overflow-hidden resize-none min-h-[1.5em] relative flex box-border border-none rounded-md placeholder:break-words text-xl whitespace-pre-wrap"
          rows={1}
          style={{
            font: '20px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
          }}
          id="content"
          disabled={disabled}
          value={value["content"]}
          onChange={handleOnChange}
          placeholder={comment}
          onFocus={settextFocus}
          // onBlur={() => settextFocus(false)}
        />
      </div>
      {children}
      {!reply && !photo && (textFocus || value["content"]) && (
        <div className="flex w-[175px] -ml-2 pb-3">
          <div className="w-full min-h-[24px] items-center justify-center flex cursor-pointer select-none text-center break-words leading-5 font-bold grow text-blue rounded-full hover:bg-hoverLightBlue gap-1">
            <Icon
              height={4}
              path={earth}
              width={4}
              color={"rgb(29, 155, 240)"}
            />
            <span className="text-sm">Everyone can reply</span>
          </div>
        </div>
      )}

      <IconFocusRender />
    </div>
  );
};

export default PostTweetTextArea;
