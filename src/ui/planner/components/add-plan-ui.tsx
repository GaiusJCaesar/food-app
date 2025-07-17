"use client";
import { Link } from "@/components/ui/text";
import ActionSheet, { ActionSheetRef } from "actionsheet-react";
import React from "react";

interface AddPlanUIProps {
  ref: React.RefObject<ActionSheetRef | null>;
  accountId: string;
}

const AddPlanUI = ({ ref }: AddPlanUIProps) => {
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
      <>content</>
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
