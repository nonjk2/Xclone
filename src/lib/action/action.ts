"use server";

export const loginOnSubmit = (prevState: any, formData: FormData) => {
  //   if (!formData.get("id") || !(formData.get("id") as string)?.trim()) {
  //     return { message: "no_id" };
  //   }
  //   if (!formData.get("name") || !(formData.get("name") as string)?.trim()) {
  //     return { message: "no_name" };
  //   }
  //   if (
  //     !formData.get("password") ||
  //     !(formData.get("password") as string)?.trim()
  //   ) {
  //     return { message: "no_password" };
  //   }
  //   if (!formData.get("image")) {
  //     return { message: "no_image" };
  //   }
  //   formData.set("nickname", formData.get("name") as string);
  //   let shouldRedirect = false;

  console.log("formdata : ", formData, "prevState : ", formData);

  return { message: null };
};
