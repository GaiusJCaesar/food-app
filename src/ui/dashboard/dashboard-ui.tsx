"use client";
import { Account } from "@/api/models/accounts";
import NoAccountCard from "./components/NoAccountCard";
import { User } from "@/api/models/users";
import Template from "@/components/ui/template";
import { DefaultCard } from "@/components/ui/cards";
import { useRouter } from "next/navigation";
import { authHrefs } from "@/constants/pageConfigs";

interface DashboardUIProps {
  user: User | undefined;
  account: Account | undefined;
}

const DashboardUI = ({ user, account }: DashboardUIProps) => {
  console.log(user);
  const router = useRouter();
  return (
    <Template title={account?.name ? `${account?.name}` : "How are you today?"}>
      {!user?.email && <NoAccountCard />}
      <DefaultCard
        title="Thought of a new meal?"
        description="Let's add it to your cookbook."
        onClick={() => {
          router.push(authHrefs.cookbook.href);
        }}
        buttonTitle="Add a meal"
      />
    </Template>
  );
};

export default DashboardUI;
