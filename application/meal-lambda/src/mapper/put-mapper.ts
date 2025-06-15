import { DynamoDB } from "aws-sdk";

const dynamodb = new DynamoDB.DocumentClient();
const MEALS_TABLE = process.env.MEALS_TABLE || "food-app-prod-meals-table";
const ACCOUNTS_TABLE =
  process.env.ACCOUNTS_TABLE || "food-app-prod-accounts-table";

interface Meal {
  id: string;
  accountId: string;
  title: string;
  description?: string;
  isFavourite?: boolean;
  cuisine?: string;
  dish?: string;
  method?: unknown;
  ingredients?: unknown;
  [key: string]: unknown;
}

const putMapper = async (input: Meal): Promise<Meal> => {
  if (!input.id || !input.accountId || !input.title) {
    throw new Error("Missing required fields: 'id', 'accountId', or 'title'");
  }

  try {
    // 1. Update the meal item
    await dynamodb
      .put({
        TableName: MEALS_TABLE,
        Item: input,
        ConditionExpression: "attribute_exists(id)", // only update if it exists
      })
      .promise();

    // 2. Get current favourites list
    const accountData = await dynamodb
      .get({
        TableName: ACCOUNTS_TABLE,
        Key: { id: input.accountId },
        ProjectionExpression: "favourites",
      })
      .promise();

    const currentFavourites: string[] = accountData.Item?.favourites || [];
    const mealId = input.id;
    const isFav = input.isFavourite === true;

    // 3. Prepare update for favourites list
    let favourites: string[] = currentFavourites;

    const alreadyFav = currentFavourites.includes(mealId);

    if (isFav && !alreadyFav) {
      favourites = [...currentFavourites, mealId];
    } else if (!isFav && alreadyFav) {
      favourites = currentFavourites.filter((id) => id !== mealId);
    }

    // 4. Update the favourites list
    await dynamodb
      .update({
        TableName: ACCOUNTS_TABLE,
        Key: { id: input.accountId },
        UpdateExpression: "SET favourites = :favs",
        ExpressionAttributeValues: {
          ":favs": favourites,
        },
      })
      .promise();

    return input;
  } catch (error) {
    console.error("Failed to update meal:", error);
    throw new Error("Failed to update meal");
  }
};

export { putMapper };
