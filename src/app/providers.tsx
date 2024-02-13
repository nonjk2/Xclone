import RecoilProvider from "@/context/RecoilProvider";
import StyleProvider from "@/context/StyleProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilProvider>
      <StyleProvider>{children}</StyleProvider>
    </RecoilProvider>
  );
};
export default Providers;
