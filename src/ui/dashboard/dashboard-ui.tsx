"use client";
import { Title } from "@/components/ui/text";
import { useRedirect } from "@/hooks/useRedirect";

const DashboardUI = () => {
  useRedirect();

  return (
    <main className="layout">
      <Title color="highlight" className="happy-monkey">
        Foodies
      </Title>
    </main>
  );
};

export default DashboardUI;
