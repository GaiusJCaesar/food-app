"use client";
import { Title } from "@/components/ui/text";
import { useAuth } from "react-oidc-context";

const DashboardUI = () => {
  const { user } = useAuth();
  console.log(user?.profile);
  return (
    <main className="layout">
      <Title color="highlight" className="happy-monkey">
        Foodies
      </Title>
    </main>
  );
};

export default DashboardUI;
