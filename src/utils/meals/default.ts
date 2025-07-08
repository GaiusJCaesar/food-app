export type ItemsType<T> = Record<string, T>;

type GroupableItem = {
  label: string;
  value: string;
  group: string;
};

type SelectOption = {
  label: string;
  value: string;
};

type GroupedSelectOption = {
  label: string;
  options: SelectOption[];
};

export const groupByGroup = <T extends GroupableItem>(
  items: Record<string, T>
): GroupedSelectOption[] => {
  const grouped: Record<string, SelectOption[]> = {};

  Object.values(items).forEach((item) => {
    if (!grouped[item.group]) {
      grouped[item.group] = [];
    }
    grouped[item.group].push({
      label: item.label,
      value: item.value,
    });
  });

  return Object.entries(grouped).map(([label, options]) => ({
    label,
    options,
  }));
};
