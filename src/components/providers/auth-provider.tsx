"use client";
import React, { PropsWithChildren } from "react";
import { AuthProvider as CognitoProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_ugsbcevJO",
  client_id: "499dj66t3lqmmlt1jn2k97gain",
  redirect_uri: "http://localhost:3000/",
  response_type: "code",
  scope: "email openid",
};

function AuthProvider({ children }: PropsWithChildren) {
  return <CognitoProvider {...cognitoAuthConfig}>{children}</CognitoProvider>;
}

export { AuthProvider as default };
