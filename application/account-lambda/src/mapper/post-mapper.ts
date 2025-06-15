import { DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

const dynamodb = new DynamoDB.DocumentClient();
const ACCOUNTS_TABLE =
  process.env.ACCOUNTS_TABLE || "food-app-prod-accounts-table";
const USERS_TABLE = process.env.USERS_TABLE || "food-app-prod-users-table";

interface Account {
  userId: string;
  name: string;
  [key: string]: unknown;
}

const postMapper = async (input: Account): Promise<Account> => {
  if (!input.name || !input.userId) {
    throw new Error("Missing required fields: 'name', or 'userId'");
  }

  const newAccount: Account = {
    ...input,
    contacts: [input.userId],
    id: uuidv4(),
    name: input.name,
    createdAt: new Date().toISOString(),
  };

  try {
    await dynamodb
      .put({
        TableName: ACCOUNTS_TABLE,
        Item: newAccount,
        ConditionExpression: "attribute_not_exists(id)", // Prevent overwrite
      })
      .promise();

    await dynamodb
      .update({
        TableName: USERS_TABLE,
        Key: { id: input.userId },
        UpdateExpression: "SET #account = :accountId",
        ExpressionAttributeNames: {
          "#account": "account",
        },
        ExpressionAttributeValues: {
          ":accountId": newAccount.id,
        },
      })
      .promise();

    return newAccount;
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      const err = error as { code: string };

      if (err.code === "ConditionalCheckFailedException") {
        throw new Error("Account with this ID already exists");
      }
    }

    console.error("Error creating account:", error);
    throw new Error("Failed to create account");
  }
};

export { postMapper };
