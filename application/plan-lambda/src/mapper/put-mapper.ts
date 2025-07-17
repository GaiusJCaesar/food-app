import { DynamoDB } from "aws-sdk";

const dynamodb = new DynamoDB.DocumentClient();
const PLANS_TABLE = process.env.PLANS_TABLE || "food-app-prod-plans-table";

interface PlanUpdateInput {
  accountId: string;
  planDate: string;
  meals?: string[];
  [key: string]: unknown;
}

const putMapper = async (input: PlanUpdateInput): Promise<void> => {
  const { accountId, planDate, ...fieldsToUpdate } = input;

  if (!accountId || !planDate) {
    throw new Error("Missing required fields: 'accountId' and/or 'planDate'");
  }

  const now = new Date().toISOString();
  const updatedFields = { ...fieldsToUpdate, updatedAt: now };

  const expressionAttributeNames: Record<string, string> = {};
  const expressionAttributeValues: Record<string, unknown> = {};
  const updateExpressions: string[] = [];

  for (const [key, value] of Object.entries(updatedFields)) {
    expressionAttributeNames[`#${key}`] = key;
    expressionAttributeValues[`:${key}`] = value;
    updateExpressions.push(`#${key} = :${key}`);
  }

  const UpdateExpression = `SET ${updateExpressions.join(", ")}`;

  try {
    await dynamodb
      .update({
        TableName: PLANS_TABLE,
        Key: {
          accountId,
          planDate,
        },
        UpdateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      })
      .promise();
  } catch (error) {
    console.error("Failed to update plan:", error);
    throw new Error("Failed to update plan");
  }
};

export { putMapper };
