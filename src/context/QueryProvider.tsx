"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

const QueryProvider = ({ children }: QueryProviderProps) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
        },
      },
    })
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        {children}

        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default QueryProvider;
