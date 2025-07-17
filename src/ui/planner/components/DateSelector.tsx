"use client";

import { Dispatch, SetStateAction } from "react";
import { format, addDays, isToday } from "date-fns";

interface DateSelectorProps {
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  selectedDate: Date;
}

const DateSelector = ({ selectedDate, setSelectedDate }: DateSelectorProps) => {
  const dates = Array.from({ length: 30 }, (_, i) => addDays(new Date(), i));

  return (
    <div className="flex overflow-x-auto space-x-2 p-2 -mx-5">
      {dates.map((date) => {
        const isSelected =
          format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
        const isCurrentDay = isToday(date);
        const label = isCurrentDay
          ? "TODAY"
          : format(date, "EEE do").toUpperCase();

        return (
          <div
            key={label}
            onClick={() => setSelectedDate(date)}
            className={`px-4 py-2 border flex items-center justify-center text-center text-sm font-semibold min-w-[90px] whitespace-nowrap rounded-lg hover:bg-primary active:scale-95 transition-transform transform 
              ${
                isSelected
                  ? "bg-primary text-white border-primary"
                  : "border-foreground text-foreground hover:bg-teal-100"
              }`}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default DateSelector;
