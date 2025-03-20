"use client";

import { Button } from "@/components/ui/button";
import { useRedirect } from "@/hooks/useRedirect";
import { useAuth } from "react-oidc-context";

const LoginUI = () => {
  const auth = useAuth();

  useRedirect();

  return (
    <main className="layout">
      <Button onClick={async () => await auth.signinRedirect()}>Hello</Button>
    </main>
  );
};

export default LoginUI;
