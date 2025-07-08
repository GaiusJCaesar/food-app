import * as AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();
const MEALS_TABLE = process.env.MEALS_TABLE || "food-app-prod-meals-table";

interface Meal {
  id: string;
  accountId: string;
  title: string;
  [key: string]: unknown;
}

const getAllMapper = async (accountId: string): Promise<Meal[]> => {
  if (!accountId) {
    throw new Error("Missing required query parameter: accountId");
  }

  try {
    const result = await dynamodb
      .query({
        TableName: MEALS_TABLE,
        IndexName: "accountId-index",
        KeyConditionExpression: "accountId = :aid",
        ExpressionAttributeValues: {
          ":aid": accountId,
        },
      })
      .promise();

    return result.Items as Meal[];
  } catch (error) {
    console.error("Error fetching meals:", error);
    throw new Error("Failed to retrieve meals");
  }
};

export { getAllMapper };
