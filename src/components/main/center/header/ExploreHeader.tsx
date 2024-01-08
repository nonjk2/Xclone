// import { useEffect } from "react";

// const ExploreHeaderContainor = styled.div`
//   display: flex;
//   align-items: center;
//   width: 598px;
//   height: 53px;
//   padding: 0 16px;
// `;
// const ExploreHeader = () => {
//   const newSearchValue = useAppSelector((state) => state.input);
//   const [searchValue, onChangesearchDataHandler] = useInput({
//     searchValue: "",
//   });

//   const dispatch = useAppDispatch();
//   const onSubmitSearchDataHandler = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     dispatch(inputSet({ inputValue: searchValue.searchValue }));
//   };

//   return (
//     <ExploreHeaderContainor>
//       <Input
//         placeholder="Search Twitter"
//         size="large"
//         value={searchValue["seasearchValuerchData"]}
//         handleInputChange={onChangesearchDataHandler}
//         handleInputSubmit={onSubmitSearchDataHandler}
//       />
//     </ExploreHeaderContainor>
//   );
// };
// export default ExploreHeader;
