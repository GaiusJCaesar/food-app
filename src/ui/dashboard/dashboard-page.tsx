"use client";

import { useRedirect } from "@/hooks/useRedirect";
import DashboardUI from "./dashboard-ui";
import { useUserQuery } from "@/api/users/usersQuery";
import LoadingPage from "@/components/ui/loading";

const DashboardPage = () => {
  // Protected
  useRedirect();

  // Data
  const { data, isLoading } = useUserQuery();

  if (isLoading) {
    return <LoadingPage pageName={"Din Dins"} />;
  }

  return <DashboardUI user={data} />;
};

export default DashboardPage;
