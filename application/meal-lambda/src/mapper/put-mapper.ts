import { DynamoDB } from "aws-sdk";

const dynamodb = new DynamoDB.DocumentClient();
const MEALS_TABLE = process.env.MEALS_TABLE || "food-app-prod-meals-table";
const ACCOUNTS_TABLE =
  process.env.ACCOUNTS_TABLE || "food-app-prod-accounts-table";

interface Meal {
  id: string;
  accountId: string;
  isFavourite?: boolean;
  [key: string]: unknown;
}

const putMapper = async (input: Meal): Promise<Meal> => {
  if (!input.id || !input.accountId) {
    throw new Error("Missing required fields: 'id' or 'accountId'");
  }

  const mealId = input.id;
  const accountId = input.accountId;
  const isFav = input.isFavourite === true;

  // Remove keys we do not want to update directly
  const updateInput: Partial<Meal> = { ...input };

  delete updateInput.id;
  delete updateInput.accountId;

  try {
    // 1. Dynamically build UpdateExpression
    const expressionParts = Object.keys(updateInput).map(
      (key) => `#${key} = :${key}`
    );
    const ExpressionAttributeNames = Object.fromEntries(
      Object.keys(updateInput).map((key) => [`#${key}`, key])
    );
    const ExpressionAttributeValues = Object.fromEntries(
      Object.entries(updateInput).map(([key, value]) => [`:${key}`, value])
    );

    if (expressionParts.length > 0) {
      await dynamodb
        .update({
          TableName: MEALS_TABLE,
          Key: { id: mealId },
          UpdateExpression: `SET ${expressionParts.join(", ")}`,
          ConditionExpression: "attribute_exists(id)",
          ExpressionAttributeNames,
          ExpressionAttributeValues,
        })
        .promise();
    }

    // 2. Update favourites
    const accountData = await dynamodb
      .get({
        TableName: ACCOUNTS_TABLE,
        Key: { id: accountId },
        ProjectionExpression: "favourites",
      })
      .promise();

    const currentFavourites: string[] = accountData.Item?.favourites || [];
    const alreadyFav = currentFavourites.includes(mealId);

    let updatedFavourites = currentFavourites;

    if (isFav && !alreadyFav) {
      updatedFavourites = [...currentFavourites, mealId];
    } else if (!isFav && alreadyFav) {
      updatedFavourites = currentFavourites.filter((id) => id !== mealId);
    }

    await dynamodb
      .update({
        TableName: ACCOUNTS_TABLE,
        Key: { id: accountId },
        UpdateExpression: "SET favourites = :favs",
        ExpressionAttributeValues: {
          ":favs": updatedFavourites,
        },
      })
      .promise();

    return { ...input, favourites: updatedFavourites };
  } catch (error) {
    console.error("Failed to update meal:", error);
    throw new Error("Failed to update meal");
  }
};

export { putMapper };
