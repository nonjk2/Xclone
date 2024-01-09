// import { useEffect, useState } from "react";
// import { getTrands } from "@/api/get";
// import { Input } from "@/utils";
// import SidebarLike from "@/components/layout/sidebar/SidebarLike";
// import SidebarTrendList from "@/components/layout/sidebar/SidebarTrendList";
// import { SidebarTrendListContainer } from "@/styles/sidebar/sidebarStyle";
// import useInput from "@/hooks/useInput";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "@/hooks/useRedux";
// import { inputSet } from "@/store/slice/inputSlice";

// const ProfileSidebar = () => {
//   const [searchValue, onChangesearchDataHandler] = useInput({
//     searchValue: "",
//   });
//   const nevigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const onSubmitMoveExpolreHandler = (e) => {
//     e.preventDefault();
//     dispatch(inputSet({ inputValue: searchValue.searchValue }));
//     nevigate("/explore");
//     console.log("이건 실행이 되나?");
//   };

//   return (
//     <>
//       <SidebarTrendListContainer>
//         <div className="profile-sidebar-button-box">
//           <Input
//             size="medium"
//             placeholder="Search Twitter"
//             handleInputSubmit={onSubmitMoveExpolreHandler}
//             handleInputChange={onChangesearchDataHandler}
//           />
//         </div>
//         <SidebarLike />
//         <SidebarTrendList />
//       </SidebarTrendListContainer>
//     </>
//   );
// };

// export default ProfileSidebar;
