import AuthProvider from "@/context/AuthProvider";
import QueryProvider from "@/context/QueryProvider";
import RecoilProvider from "@/context/RecoilProvider";
import StyleProvider from "@/context/StyleProvider";

const Providers = async ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <QueryProvider>
        <RecoilProvider>
          <StyleProvider>{children}</StyleProvider>
        </RecoilProvider>
      </QueryProvider>
    </AuthProvider>
  );
};
export default Providers;
