"use client";
import { Account } from "@/api/models/accounts";
import NoAccountCard from "./components/NoAccountCard";
import { User } from "@/api/models/users";
import Template from "@/components/ui/template";

interface DashboardUIProps {
  user: User | undefined;
  account: Account | undefined;
}

const DashboardUI = ({ user, account }: DashboardUIProps) => {
  console.log(user);
  return (
    <Template title={account?.name ? `${account?.name}` : "How are you today?"}>
      <div>todays meals</div>
      <div>thought of a new meal?</div>
      {!user?.email && <NoAccountCard />}
      {JSON.stringify(user)}
    </Template>
  );
};

export default DashboardUI;
