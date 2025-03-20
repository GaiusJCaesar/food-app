import { PostConfirmationTriggerHandler } from "aws-lambda";
import * as AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TABLE_NAME || "food-app-prod-users-table";
export const handler: PostConfirmationTriggerHandler = async (
  event,
  context,
  callback
) => {
  try {
    const userSub = event.request.userAttributes.sub;
    const userEmail = event.request.userAttributes.email;

    console.log(`User confirmed with sub: ${userSub}, email: ${userEmail}`);

    const params = {
      TableName: TABLE_NAME,
      Item: {
        id: userSub,
        email: userEmail,
        createdAt: new Date().toISOString(),
      },
    };

    await dynamodb.put(params).promise();

    return callback(null, event);
  } catch (error) {
    console.error("Error in post-confirmation trigger:", error);
    return callback(error as Error);
  }
};
