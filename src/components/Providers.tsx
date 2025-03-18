"use client";
import "@/lib/initAmplify";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

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

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean | null;
  loading: boolean | null;
  refreshAuth: () => void;
};

const AuthContext = createContext<AuthState>({
  user: null,
  loading: null,
  isAuthenticated: null,
  refreshAuth: () => {},
});

function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthState["user"]>(null);
  const [loading, setLoading] = useState<AuthState["loading"]>(true);

  const checkUser = useCallback(async () => {
    setLoading(true);
    try {
      const authUser = await getCurrentUser();
      setUser(authUser);
    } catch {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkUser(); // Check auth status on mount

    // Listen for login/logout events
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      if (payload.event === "signedIn" || payload.event === "signedOut") {
        checkUser();
      }
    });

    return () => unsubscribe();
  }, [checkUser]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, refreshAuth: checkUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { ProvidersWithAuth, ThemeProvider, AuthProvider, AuthContext };
