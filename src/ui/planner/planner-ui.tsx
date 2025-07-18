"use client";

import Template from "@/components/ui/template";
import DateSelector from "./components/DateSelector";
import { useMemo, useRef, useState } from "react";
import { Paragraph, Title } from "@/components/ui/text";
import { format, isToday } from "date-fns";
import { Meal } from "@/api/models/meals";
import { DefaultButton, PinnedButton } from "@/components/ui/button";
import { ActionSheetRef } from "actionsheet-react";
import AddPlanUI from "./components/add-plan-ui";
import { User } from "@/api/models/users";
import { Account } from "@/api/models/accounts";
import { isMobile } from "react-device-detect";
import { Plan } from "@/api/models/plans";

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

interface PlannerUIProps {
  user: User | undefined;
  account: Account | undefined;
  meals: Meal[] | undefined;
  plans: Plan[] | undefined;
}

const PlannerUI = ({ account, meals, plans }: PlannerUIProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const actionSheetRef = useRef<ActionSheetRef>(null);

  const title = useMemo(() => {
    const isCurrentDay = isToday(selectedDate);
    const label = isCurrentDay ? "TODAY" : format(selectedDate, "EEE do MMM");
    return label;
  }, [selectedDate]);

  const selectedDatePlans = useMemo(() => {
    console.log(plans);
    if (!plans?.length) return null;
    return plans?.find(
      (plan) => plan.date !== format(selectedDate, "yyyy-MM-dd")
    );
  }, [plans, selectedDate]);

  return (
    <Template title="My planner">
      <AddPlanUI
        ref={actionSheetRef}
        selectedDate={format(selectedDate, "yyyy-MM-dd")}
        accountId={account?.id || ""}
        meals={meals}
      />
      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Title variant="h3">{title}</Title>
      {!isMobile && (
        <DefaultButton onClick={() => actionSheetRef.current?.open()}>
          New meal
        </DefaultButton>
      )}
      selected plan: {selectedDatePlans?.date}
      <Card meal={{ title: "example", id: "123", accountId: "123" }} />
      <PinnedButton>
        <DefaultButton onClick={() => actionSheetRef.current?.open()}>
          New meal
        </DefaultButton>
      </PinnedButton>
    </Template>
  );
};

export default PlannerUI;
