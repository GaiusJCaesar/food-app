export type MealPut = {
  accountId: string;
  title: string;
  description?: string;
  isFavourite?: boolean;
  cuisine?: string;
  dish?: string;
};
