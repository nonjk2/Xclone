"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export const loginOnSubmit = async (prevState: any, formData: FormData) => {
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
  let shouldRedirect = false;
  try {
    await signIn("credentials", {
      username: formData.get("name") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
  } catch (error) {
    console.log(error);
  }
  redirect("/home");

  //   return { message: null };
};
