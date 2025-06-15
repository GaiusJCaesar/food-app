"use client";
import NoAccountCard from "./components/NoAccountCard";
import { User } from "@/api/models/users";
import Template from "@/components/ui/template";

interface DashboardUIProps {
  user: User | undefined;
}

const DashboardUI = ({}: DashboardUIProps) => {
  return (
    <Template title="Let's get going!">
      <NoAccountCard />
    </Template>
  );
};

export default DashboardUI;
