import { ReactNode } from "react";

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return <div className="flex container">{children}</div>;
};
export default LoginLayout;
