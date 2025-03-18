"use client";
import "@/lib/initAmplify";
// import { Authenticator } from "@aws-amplify/ui-react";
import { PropsWithChildren } from "react";

type ProviderProps = PropsWithChildren;

const ProvidersWithAuth = ({ children }: ProviderProps) => {
  // return <Authenticator>{children}</Authenticator>;
  return children;
};

export default ProvidersWithAuth;
