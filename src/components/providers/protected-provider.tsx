"use client";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { useAuth } from "react-oidc-context";
import { Title } from "../ui/text";

const ProtectedRouteProvider = ({ children }: PropsWithChildren) => {
  const auth = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (auth.isLoading) {
    return (
      <main className="layout">
        <Title>Just checking you&apos;re logged in...</Title>
      </main>
    );
  }
  if (auth.isAuthenticated) {
    return children;
  } else {
    router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    return null;
  }
};

export default ProtectedRouteProvider;
