"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import React, { PropsWithChildren } from "react";

type ProviderProps = PropsWithChildren;

const Providers = ({ children }: ProviderProps) => {
  return <Authenticator>{children}</Authenticator>;
};

export default Providers;
