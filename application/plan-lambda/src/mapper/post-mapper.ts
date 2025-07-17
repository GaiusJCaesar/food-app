import { DynamoDB } from "aws-sdk";

const dynamodb = new DynamoDB.DocumentClient();
const PLANS_TABLE = process.env.PLANS_TABLE || "food-app-prod-plans-table";

export const postMapper = async (input: {
  userId: string;
  planDate: string;
  meals: string[];
}) => {
  const createdAt = new Date().toISOString();

  const item = {
    ...input,
    createdAt,
    updatedAt: createdAt,
  };

  await dynamodb
    .put({
      TableName: PLANS_TABLE,
      Item: item,
      ConditionExpression:
        "attribute_not_exists(userId) AND attribute_not_exists(planDate)", // Prevent overwrite
    })
    .promise();

  return item;
};
