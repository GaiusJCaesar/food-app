"use client";

import { useAccountsMutation } from "@/api/accounts/accountsMutation";
import CreateAccountUI from "./create-account-ui";

const CreateAccountPage = () => {
  const {} = useAccountsMutation();

  return <CreateAccountUI />;
};

export default CreateAccountPage;
