"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "react-oidc-context";

const LoginUI = () => {
  const auth = useAuth();

  return (
    <main className="layout">
      <Button onClick={async () => await auth.signinRedirect()}>Hello</Button>
    </main>
  );
};

export default LoginUI;
