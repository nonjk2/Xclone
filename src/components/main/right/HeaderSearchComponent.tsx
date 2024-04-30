"use client";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/button";

const HeaderSearchComponent = () => {
  return (
    <>
      <div className="fixed w-[350px] bg-white backdrop-blur-md flex h-[53px] items-center">
        <Input
          InputProps={{
            placeholder: "Search Twitter",
            sizes: "medium",
          }}

          // handleInputSubmit={onSubmitMoveExpolreHandler}
          // handleInputChange={onChangesearchDataHandler}
        />
      </div>
      <div className="w-full h-[53px] -z-10" />
      <div className="rounded-lg flex flex-col py-3 px-4 bg-hoverProfile gap-[10px] h-[126px]">
        <div className="font-bold text-[20px]">Get Verified</div>
        <div className="text-[15px] font-bold">
          Subscribe to unlock new features.
        </div>
        <Button
          hoverColor="hoverBlack"
          backgroundColor="black"
          color="white"
          size="getVerify"
          title={<span>Get Verified</span>}
        />
      </div>
    </>
  );
};
export default HeaderSearchComponent;
