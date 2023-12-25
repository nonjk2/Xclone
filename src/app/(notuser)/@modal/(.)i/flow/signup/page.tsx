import SignUpMain from "@/components/auth/signup/signup";
import { setTimeout } from "timers/promises";

export default async function Signup() {
  await setTimeout(1000);
  return (
    <>
      <SignUpMain />
    </>
  );
}
