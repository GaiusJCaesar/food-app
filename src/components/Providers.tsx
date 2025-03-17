"use client";
import "@/lib/initAmplify";
import React, { PropsWithChildren } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ProviderProps = PropsWithChildren;

const ProvidersWithAuth = ({ children }: ProviderProps) => {
  return <Authenticator>{children}</Authenticator>;
};

const ThemeProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export { ProvidersWithAuth, ThemeProvider };
