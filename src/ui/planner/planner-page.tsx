"use client";
import { useRedirect } from "@/hooks/useRedirect";
import PlannerUI from "./planner-ui";
import { useAccountsQuery } from "@/api/accounts/accountsQuery";
import { useMealsQuery } from "@/api/meals/mealsQuery";
import { useUserQuery } from "@/api/users/usersQuery";
import LoadingPage from "@/components/ui/loading";
import { usePlansQuery } from "@/api/plans/plansQuery";
import { addDays, format } from "date-fns";

const PlannerPage = () => {
  // Protected
  useRedirect();

  // Data
  const dates = Array.from({ length: 30 }, (_, i) =>
    format(addDays(new Date(), i), "yyyy-MM-dd")
  );

  const { data: user, isLoading: isUsersLoading } = useUserQuery({});
  const { data: account, isLoading: isAccountsLoading } = useAccountsQuery({
    enabled: !!user?.account,
    id: user?.account || "",
  });
  const { data: meals, isLoading: isMealsLoading } = useMealsQuery({
    enabled: !!user?.account,
    accountId: user?.account || "",
  });
  const { data: plans, isLoading: isPlansLoading } = usePlansQuery({
    enabled: !!user?.account,
    dates,
    accountId: user?.account || "",
  });

  if (isUsersLoading || isAccountsLoading || isMealsLoading || isPlansLoading) {
    return <LoadingPage pageName="My cookbook" />;
  }

  console.log("plans", plans);

  return (
    <PlannerUI user={user} account={account} meals={meals} plans={plans} />
  );
};

export default PlannerPage;
