"use client";

import { useRedirect } from "@/hooks/useRedirect";
import { useUserQuery } from "@/api/users/usersQuery";
import LoadingPage from "@/components/ui/loading";
import { useAccountsQuery } from "@/api/accounts/accountsQuery";
import CookbookUI from "./cookbook-ui";

const CookbookPage = () => {
  // Protected
  useRedirect();

  // Data
  const { data: user, isLoading: isUsersLoading } = useUserQuery({});
  const { data: account, isLoading: isAccountsLoading } = useAccountsQuery({
    enabled: !!user?.account,
    id: user?.account || "",
  });

  if (isUsersLoading || isAccountsLoading) {
    return <LoadingPage pageName="My cookbook" />;
  }

  return <CookbookUI user={user} account={account} />;
};

export default CookbookPage;
