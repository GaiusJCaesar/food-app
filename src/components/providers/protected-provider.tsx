"use client";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { useAuth } from "react-oidc-context";

const ProtectedRouteProvider = ({ children }: PropsWithChildren) => {
  const auth = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (auth.isLoading) {
    return <>Loading....</>;
  }
  if (auth.isAuthenticated) {
    return children;
  } else {
    router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    return null;
  }
};

export default ProtectedRouteProvider;
