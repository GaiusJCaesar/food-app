"use client";

import { useRedirect } from "@/hooks/useRedirect";
import DashboardUI from "./dashboard-ui";
import { useUserQuery } from "@/api/users/usersQuery";
import LoadingPage from "@/components/ui/loading";
import { useAccountsQuery } from "@/api/accounts/accountsQuery";

const DashboardPage = () => {
  // Protected
  useRedirect();

  // Data
  const { data: user, isLoading: isUsersLoading } = useUserQuery({});
  const { data: account, isLoading: isAccountsLoading } = useAccountsQuery({
    enabled: !!user?.account,
    id: user?.account || "",
  });

  if (isUsersLoading || isAccountsLoading) {
    return <LoadingPage pageName={"Din Dins"} />;
  }

  return <DashboardUI user={user} account={account} />;
};

export default DashboardPage;
