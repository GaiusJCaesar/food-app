import { PostConfirmationTriggerHandler } from "aws-lambda";
import * as AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

const dynamodb = new AWS.DynamoDB.DocumentClient();

const ACCOUNTS_TABLE =
  process.env.ACCOUNTS_TABLE || "food-app-prod-accounts-table";
const USERS_TABLE = process.env.USERS_TABLE || "food-app-prod-users-table";

export const handler: PostConfirmationTriggerHandler = async (
  event,
  context,
  callback
) => {
  try {
    const userSub = event.request.userAttributes.sub;
    const userEmail = event.request.userAttributes.email;

    console.log(`User confirmed with sub: ${userSub}, email: ${userEmail}`);

    const accountId = uuidv4();

    const userParams = {
      TableName: USERS_TABLE,
      Item: {
        userAttributes: { ...event.request.userAttributes },
        id: userSub,
        email: userEmail,
        account: accountId,
        createdAt: new Date().toISOString(),
      },
    };

    await dynamodb.put(userParams).promise();

    const accountParams = {
      TableName: ACCOUNTS_TABLE,
      Item: {
        id: accountId,
        contacts: [userSub],
        name: "My household",
        createdAt: new Date().toISOString(),
      },
    };

    await dynamodb.put(accountParams).promise();

    console.log("User submitted:", userEmail);

    return callback(null, event);
  } catch (error) {
    console.error("Error in post-confirmation trigger:", error);
    return callback(error as Error);
  }
};
