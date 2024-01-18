import Avatar from "@/components/ui/Avatar";
import { ChangeEvent } from "react";

interface ComposeBodyProps {
  previewImage: string | null;
  onUploadImage: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ComposeBody = ({ previewImage }: ComposeBodyProps) => {
  return (
    <div className="flex w-full">
      <div className="mr-3 pt-3">
        <Avatar />
      </div>

      <div className="min-h-[120px] pb-3 grow pt-4">
        <div
          style={{
            font: "14px -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
          }}
          className="border-none border-b-[2px] border-opacity-0 flex rounded border-2 flex-col cursor-text break-words text-xl text-inputColor whitespace-pre-wrap "
        >
          <textarea
            // ref={textareaRef}
            className="leading-normal overflow-hidden resize-none relative flex box-border border-none rounded-md placeholder:break-words placeholder:text-xl text-xl text-hoverProfile whitespace-pre-wrap"
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
          {previewImage && <input type="file" />}
        </div>
      </div>
    </div>
  );
};
export default ComposeBody;
