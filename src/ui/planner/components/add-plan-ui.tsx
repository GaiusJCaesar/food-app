"use client";
import { Meal } from "@/api/models/meals";
import { Link, Paragraph, Title } from "@/components/ui/text";
import ActionSheet, { ActionSheetRef } from "actionsheet-react";
import React from "react";

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

interface AddPlanUIProps {
  ref: React.RefObject<ActionSheetRef | null>;
  accountId: string;
  selectedDate: string;
  meals: Meal[] | undefined;
}

const AddPlanUI = ({ ref, selectedDate, meals }: AddPlanUIProps) => {
  return (
    <ActionSheet
      ref={ref}
      aria-label="Add a meal sheet"
      sheetStyle={{
        padding: 20,
        transition: "2s cubic-bezier(0.4, 0, 0.2, 1)",
        maxHeight: "80%",
      }}
      mouseEnable={false}
      touchEnable={false}
      bgTransition="opacity 2s ease-in-out"
      sheetTransition="transform 2s cubic-bezier(0.22, 1, 0.36, 1)"
    >
      <div style={{ maxHeight: "70vh", overflowY: "auto", padding: "1rem" }}>
        <>{selectedDate}</>
        {meals && meals.map((meal, key) => <Card key={key} meal={meal} />)}
      </div>
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

export default AddPlanUI;
