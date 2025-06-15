"use client";
import React from "react";
import Template from "@/components/ui/template";
import { Input } from "@/components/ui/input";

const CreateAccountUI = () => {
  return (
    <Template title="Let's get going!">
      <Input
        label="Create a name for your account"
        description="This could be the name of your household. But anything to help you identify it  "
      />
      <Input label="title" />
    </Template>
  );
};

export default CreateAccountUI;
