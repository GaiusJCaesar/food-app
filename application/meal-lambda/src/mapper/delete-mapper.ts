import { DynamoDB } from "aws-sdk";

const dynamodb = new DynamoDB.DocumentClient();
const MEALS_TABLE = process.env.MEALS_TABLE || "food-app-prod-meals-table";
const ACCOUNTS_TABLE =
  process.env.ACCOUNTS_TABLE || "food-app-prod-accounts-table";

const deleteMapper = async ({
  mealId,
  accountId,
}: {
  mealId: string;
  accountId: string;
}): Promise<{ deleted: boolean }> => {
  if (!mealId || !accountId) {
    throw new Error("Missing required fields: 'mealId' or 'accountId'");
  }

  try {
    // 1. Delete the meal from the meals table
    await dynamodb
      .delete({
        TableName: MEALS_TABLE,
        Key: { id: mealId },
      })
      .promise();

    // 2. Get current 'favourites' and 'meals' arrays
    const account = await dynamodb
      .get({
        TableName: ACCOUNTS_TABLE,
        Key: { id: accountId },
        ProjectionExpression: "favourites, meals",
      })
      .promise();

    const currentFavourites: string[] = account.Item?.favourites || [];
    const currentMeals: string[] = account.Item?.meals || [];

    const updatedFavourites = currentFavourites.filter((id) => id !== mealId);
    const updatedMeals = currentMeals.filter((id) => id !== mealId);

    // 3. Update the account
    await dynamodb
      .update({
        TableName: ACCOUNTS_TABLE,
        Key: { id: accountId },
        UpdateExpression: "SET favourites = :favs, meals = :meals",
        ExpressionAttributeValues: {
          ":favs": updatedFavourites,
          ":meals": updatedMeals,
        },
      })
      .promise();

    return { deleted: true };
  } catch (error) {
    console.error("Error deleting meal:", error);
    throw new Error("Failed to delete meal");
  }
};

export { deleteMapper };
