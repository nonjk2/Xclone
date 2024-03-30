import Input from "@/components/ui/Input";
import Button from "@/components/ui/button";
import SidebarTrendList from "./trend/TrendList";
import { Suspense } from "react";

const HomeSidebar = () => {
  // const [searchValue, onChangesearchDataHandler] = useInput({
  //   searchValue: "",
  // });
  // const nevigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const onSubmitMoveExpolreHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(inputSet({ inputValue: searchValue.searchValue }));
  //   nevigate("/explore");
  //   console.log("이건 실행이 되나?");
  // };

  return (
    <div className="relative">
      <div className="fixed w-[350px] bg-white backdrop-blur-md flex h-[53px] mb-3 items-center">
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
      <div className="rounded-lg flex flex-col py-3 px-4 bg-hoverProfile mb-4 gap-[10px] h-[126px]">
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
      <div className="rounded-lg">
        <Suspense>
          <SidebarTrendList sidebar />
        </Suspense>
      </div>
      <div className="sidebar-who to follow"></div>

      <div className="sidebar-links"></div>
    </div>
  );
};

export default HomeSidebar;
