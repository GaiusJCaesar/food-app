"use client";
import React, { useRef } from "react";

import { Account } from "@/api/models/accounts";
import { User } from "@/api/models/users";
import Template from "@/components/ui/template";
import { DefaultButton } from "@/components/ui/button";
import { AddMealUI } from "../add-meal/add-meal-ui";
import { ActionSheetRef } from "actionsheet-react";

interface CookbookUIProps {
  user: User | undefined;
  account: Account | undefined;
}

const CookbookUI = ({ account }: CookbookUIProps) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  console.log(account);
  return (
    <Template title="My cookbook">
      <AddMealUI ref={actionSheetRef} accountId={account?.id || ""} />
      <DefaultButton onClick={() => actionSheetRef.current?.open()}>
        Add a meal
      </DefaultButton>
    </Template>
  );
};

export default CookbookUI;
