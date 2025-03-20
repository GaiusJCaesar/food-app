"use client";
import { Title } from "@/components/ui/text";
import { useRedirect } from "@/hooks/useRedirect";
import { useAuth } from "react-oidc-context";

const DashboardUI = () => {
  useRedirect();

  const auth = useAuth();
  console.log(auth);
  return (
    <main className="layout">
      <Title color="highlight" className="happy-monkey">
        Foodies
      </Title>
    </main>
  );
};

export default DashboardUI;
