import RecoilProvider from "@/context/RecoilProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <RecoilProvider>{children}</RecoilProvider>;
};
export default Providers;
