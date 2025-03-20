import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

const useRedirect = () => {
  const router = useRouter();
  const auth = useAuth();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (redirect) {
      localStorage.setItem("redirectPath", redirect);
    }
  }, [redirect]);

  const redirectPath = localStorage.getItem("redirectPath");

  useEffect(() => {
    if (auth.isAuthenticated && redirectPath) {
      router.push(redirectPath);
      localStorage.removeItem("redirectPath");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, redirectPath]);
};

export { useRedirect };
