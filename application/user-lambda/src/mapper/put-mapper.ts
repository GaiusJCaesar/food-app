import * as AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TABLE_NAME || "food-app-prod-users-table";

const putMapper = async (id?: string, updates?: Record<string, unknown>) => {
  if (!id || !updates || Object.keys(updates).length === 0) {
    throw new Error("Missing 'id' or updates");
  }

  const updateExpressions = [];
  const expressionAttributeNames: Record<string, string> = {};
  const expressionAttributeValues: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(updates)) {
    const nameKey = `#${key}`;
    const valueKey = `:${key}`;
    updateExpressions.push(`${nameKey} = ${valueKey}`);
    expressionAttributeNames[nameKey] = key;
    expressionAttributeValues[valueKey] = value;
  }

  try {
    await dynamodb
      .update({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: `SET ${updateExpressions.join(", ")}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      })
      .promise();
  } catch (error) {
    console.error("Error updating item:", error);
    throw new Error("Failed to update item");
  }
};

export { putMapper };
