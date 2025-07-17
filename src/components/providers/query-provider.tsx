"use client";
import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes — data is "fresh" and won't refetch
      gcTime: 1000 * 60 * 10, // 10 minutes in memory
      refetchOnWindowFocus: false, // don't refetch when switching tabs
      refetchOnReconnect: false, // don't refetch when reconnecting
      refetchInterval: false, // don't poll unless you want it
      retry: 1, // reduce retries to 1 for failed queries
    },
  },
});

const QueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export { QueryProvider as default };
