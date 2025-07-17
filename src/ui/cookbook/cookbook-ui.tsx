"use client";
import React, { useMemo, useRef, useState } from "react";

import { Account } from "@/api/models/accounts";
import { User } from "@/api/models/users";
import Template from "@/components/ui/template";
import { DefaultButton, PinnedButton } from "@/components/ui/button";
import { AddMealUI } from "./components/add-meal-ui";
import { ActionSheetRef } from "actionsheet-react";
import { Meal } from "@/api/models/meals";
import { Paragraph, Title } from "@/components/ui/text";
import { Selector } from "@/components/ui/input";
import { SelectOption } from "@/utils/meals/default";
import { Separator } from "@/components/ui/separator";
import { isMobile } from "react-device-detect";

interface CookbookUIProps {
  user: User | undefined;
  account: Account | undefined;
  meals: Meal[] | undefined;
}

const Card = ({ meal }: { meal: Meal }) => {
  return (
    <div className="bg-white shadow-xs hover:bg-primary/30 p-4 rounded-xl active:scale-95 transition-transform transform">
      <Title variant="h4">{meal.title}</Title>
      <Paragraph variant="medium">{meal.description}</Paragraph>
      <Paragraph variant="medium">{meal?.dish?.label}</Paragraph>
      <Paragraph variant="medium">{meal?.cuisine?.label}</Paragraph>
    </div>
  );
};

const MealSection = ({ meals, title }: { meals: Meal[]; title: string }) => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <Title variant="h3">{title}</Title>
      <Separator />
      {meals?.map((meal, key) => (
        <Card key={key} meal={meal} />
      ))}
    </div>
  );
};

function handleGroupBy(
  meals: Meal[],
  key: "cuisine" | "dish"
): Record<string, Meal[]> {
  const grouped: Record<string, Meal[]> = {};

  for (const meal of meals) {
    const groupKey = meal[key] || { label: "Uncategorized" };

    if (!grouped[groupKey.label]) {
      grouped[groupKey.label] = [];
    }

    grouped[groupKey.label].push(meal);
  }

  return grouped;
}

const GROUP_BY_OPTIONS = [
  { label: "Cuisine", value: "cuisine" },
  { label: "Dish", value: "dish" },
];

const CookbookUI = ({ account, meals }: CookbookUIProps) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [groupBy, setGroupBy] = useState<SelectOption>(GROUP_BY_OPTIONS[0]);

  const groups = useMemo(
    () => handleGroupBy(meals || [], groupBy.value as "cuisine" | "dish"),
    [meals, groupBy]
  );

  return (
    <Template title="My cookbook">
      <AddMealUI ref={actionSheetRef} accountId={account?.id || ""} />
      {!isMobile && (
        <DefaultButton onClick={() => actionSheetRef.current?.open()}>
          Add a meal
        </DefaultButton>
      )}
      <Selector
        onChange={(value) => setGroupBy(value as SelectOption)}
        value={groupBy as unknown as string}
        label="Group by"
        options={GROUP_BY_OPTIONS}
      />
      {Object.keys(groups).map((key, idx) => (
        <MealSection key={idx} title={key} meals={groups[key] || []} />
      ))}
      <PinnedButton>
        <DefaultButton onClick={() => actionSheetRef.current?.open()}>
          New meal
        </DefaultButton>
      </PinnedButton>
    </Template>
  );
};

export default CookbookUI;
