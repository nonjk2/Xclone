import QueryProvider from "@/context/QueryProvider";
import RecoilProvider from "@/context/RecoilProvider";
import StyleProvider from "@/context/StyleProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <RecoilProvider>
        <StyleProvider>{children}</StyleProvider>
      </RecoilProvider>
    </QueryProvider>
  );
};
export default Providers;
