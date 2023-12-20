"use client";

import Main from "@/components/auth/main";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  router.replace("/i/flow/login");
  return <Main />;
}
