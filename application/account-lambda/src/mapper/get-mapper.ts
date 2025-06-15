import * as AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.ACCOUNTS_TABLE || "food-app-prod-accounts-table";

const getMapper = async (id?: string) => {
  if (!id) {
    throw new Error("Missing 'id' parameter");
  }

  try {
    const data = await dynamodb
      .get({
        TableName: TABLE_NAME,
        Key: { id },
      })
      .promise();

    if (!data.Item) {
      throw new Error(`Item with id '${id}' not found`);
    }

    return data.Item;
  } catch (error) {
    console.error("Error fetching item from DynamoDB:", error);
    throw new Error("Failed to retrieve item");
  }
};

export { getMapper };
