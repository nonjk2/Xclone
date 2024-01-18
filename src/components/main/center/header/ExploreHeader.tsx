import Input from "@/components/ui/Input";
import { Icon } from "@/components/ui/icon/GoogleIcon";
import { setting } from "@/lib/Icon";
import { useEffect } from "react";

const ExploreHeader = () => {
  //   const newSearchValue = useAppSelector((state) => state.input);
  //   const [searchValue, onChangesearchDataHandler] = useInput({
  //     searchValue: "",
  //   });

  //   const dispatch = useAppDispatch();
  //   const onSubmitSearchDataHandler = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     dispatch(inputSet({ inputValue: searchValue.searchValue }));
  //   };

  return (
    <div className="sticky px-4 w-full bg-white backdrop-blur-md flex h-[53px] items-center justify-center">
      <Input
        placeholder="Search Twitter"
        size="large"
        // handleInputSubmit={onSubmitMoveExpolreHandler}
        // handleInputChange={onChangesearchDataHandler}
      />
      <Icon height={5} path={setting} width={5} />
    </div>
  );
};
export default ExploreHeader;
