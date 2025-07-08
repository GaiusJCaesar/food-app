import { ItemsType } from "./default";

export type Dish = {
  label: string;
  value: string;
  group: string;
};

export type DishMap = ItemsType<Dish>;

export const dishes: DishMap = {
  Beef: { label: "Beef", value: "beef", group: "Meat" },
  Pork: { label: "Pork", value: "pork", group: "Meat" },
  Lamb: { label: "Lamb", value: "lamb", group: "Meat" },
  Chicken: { label: "Chicken", value: "chicken", group: "Meat" },
  Turkey: { label: "Turkey", value: "turkey", group: "Meat" },

  Salmon: { label: "Salmon", value: "salmon", group: "Fish" },
  Tuna: { label: "Tuna", value: "tuna", group: "Fish" },
  Prawns: { label: "Prawns", value: "prawns", group: "Shellfish" },
  Crab: { label: "Crab", value: "crab", group: "Shellfish" },

  Tofu: { label: "Tofu", value: "tofu", group: "Plant-based" },
  Tempeh: { label: "Tempeh", value: "tempeh", group: "Plant-based" },
  Lentils: { label: "Lentils", value: "lentils", group: "Plant-based" },
  Chickpeas: { label: "Chickpeas", value: "chickpeas", group: "Plant-based" },
  Mushrooms: { label: "Mushrooms", value: "mushrooms", group: "Plant-based" },
  Cheese: { label: "Cheese", value: "cheese", group: "Dairy" },
  Eggs: { label: "Eggs", value: "eggs", group: "Dairy" },
  Other: { label: "Other", value: "other", group: "Other" },
};
