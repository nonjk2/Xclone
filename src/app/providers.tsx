import AuthProvider from "@/context/AuthProvider";
import QueryProvider from "@/context/QueryProvider";
import RecoilProvider from "@/context/RecoilProvider";
import StyleProvider from "@/context/StyleProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <AuthProvider>
        <RecoilProvider>
          <StyleProvider>{children}</StyleProvider>
        </RecoilProvider>
      </AuthProvider>
    </QueryProvider>
  );
};
export default Providers;
