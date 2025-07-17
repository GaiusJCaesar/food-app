import React, { useEffect } from "react";

import { Input, Selector, Toggle } from "@/components/ui/input";
import { Link } from "@/components/ui/text";
import { useState } from "react";
import ActionSheet, { ActionSheetRef } from "actionsheet-react";

import { cuisines } from "@/utils/meals/cuisines";
import { groupByGroup } from "@/utils/meals/default";
import { dishes } from "@/utils/meals/dishes";
import { DefaultButton } from "@/components/ui/button";
import { useMealsMutation } from "@/api/meals/mealsMutation";

interface AddMealUIProps {
  ref: React.RefObject<ActionSheetRef | null>;
  accountId: string;
}

const AddMealUI = ({ ref, accountId }: AddMealUIProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const [cuisine, setCuisine] = useState("");
  const [dish, setDish] = useState("");

  const { mutate, isPending, isSuccess } = useMealsMutation();

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setDescription("");
      setIsFavourite(false);
      setCuisine("");
      setDish("");
      ref.current?.close();
    }
  }, [isSuccess, ref]);

  const handleSubmit = () => {
    mutate({ title, description, isFavourite, cuisine, dish, accountId });
  };

  return (
    <ActionSheet
      ref={ref}
      aria-label="Add a meal sheet"
      sheetStyle={{
        padding: 20,
        transition: "2s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      mouseEnable={false}
      touchEnable={false}
      bgTransition="opacity 2s ease-in-out"
      sheetTransition="transform 2s cubic-bezier(0.22, 1, 0.36, 1)"
    >
      <>
        <div className="text-2xl font-bold   text-card-foreground pb-4">
          Add a meal
        </div>

        <Input
          label="Meal name"
          isFullWidth
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <Input
          label="Description"
          isFullWidth
          value={description}
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
        />

        <Selector
          onChange={(value) => setCuisine(value as string)}
          value={cuisine}
          label="Cuisine"
          options={Object.values(groupByGroup(cuisines))}
        />
        <Selector
          label="Dish"
          options={Object.values(groupByGroup(dishes))}
          onChange={(value) => setDish(value as string)}
          value={dish}
        />
        <Toggle
          label="Favourite"
          checked={isFavourite}
          onChange={(e) => {
            setIsFavourite(e.currentTarget.checked);
          }}
        />
        <DefaultButton onClick={handleSubmit} className="mt-4">
          {isPending ? "Saving..." : "Submit"}
        </DefaultButton>
      </>
      <Link
        style={{ position: "absolute", top: 20, right: 20 }}
        onClick={ref.current?.close}
        variant="menuItem"
        isSelected
      >
        Close
      </Link>
    </ActionSheet>
  );
};

export { AddMealUI };
