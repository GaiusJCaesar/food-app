import { DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

const dynamodb = new DynamoDB.DocumentClient();
const ACCOUNTS_TABLE =
  process.env.ACCOUNTS_TABLE || "food-app-prod-accounts-table";
// const USERS_TABLE = process.env.USERS_TABLE || "food-app-prod-users-table";
const MEALS_TABLE = process.env.MEALS_TABLE || "food-app-prod-meals-table";

interface Meal {
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

const postMapper = async (input: Meal): Promise<Meal> => {
  if (!input.title || !input.accountId) {
    throw new Error("Missing required fields: 'title', or 'accountId'");
  }

  const newMeal: Meal = {
    ...input,
    id: uuidv4(),
    accountId: input.accountId,
    title: input.title,
  };

  try {
    await dynamodb
      .put({
        TableName: MEALS_TABLE,
        Item: newMeal,
        ConditionExpression: "attribute_not_exists(id)", // Prevent overwrite
      })
      .promise();

    // Prepare update expressions
    const updateExpressions = [
      "SET meals = list_append(if_not_exists(meals, :empty_list), :new_meal)",
    ];
    const expressionAttributeValues: Record<string, unknown> = {
      ":new_meal": [newMeal.id],
      ":empty_list": [],
    };

    // Conditionally add to favourites if isFavourite is true
    if (newMeal.isFavourite) {
      updateExpressions.push(
        "favourites = list_append(if_not_exists(favourites, :empty_list), :new_meal)"
      );
    }

    // Update account table
    await dynamodb
      .update({
        TableName: ACCOUNTS_TABLE,
        Key: { id: input.accountId },
        UpdateExpression: updateExpressions.join(", "),
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW",
      })
      .promise();

    return newMeal;
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      const err = error as { code: string };

      if (err.code === "ConditionalCheckFailedException") {
        throw new Error("Meal with this ID already exists");
      }
    }

    console.error("Error creating meal:", error);
    throw new Error("Failed to create meal");
  }
};

export { postMapper };
