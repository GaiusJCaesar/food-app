"use client";
import React, { PropsWithChildren } from "react";
import { AuthProvider as CognitoProvider } from "react-oidc-context";
import { User } from "oidc-client-ts";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_FR8q3nVfJ",
  client_id: "4s82t34ei1j3da5c5nid1dn547",
  redirect_uri: "http://localhost:3000/",
  response_type: "code",
  scope: "email openid urn:food-app:resource-server/api-gw-prod",
};

function getUser() {
  const oidcStorage = sessionStorage.getItem(
    `oidc.user:${cognitoAuthConfig.authority}:${cognitoAuthConfig.client_id}`
  );
  if (!oidcStorage) {
    return null;
  }

  return User.fromStorageString(oidcStorage);
}

function AuthProvider({ children }: PropsWithChildren) {
  return <CognitoProvider {...cognitoAuthConfig}>{children}</CognitoProvider>;
}

export { AuthProvider as default, getUser };
