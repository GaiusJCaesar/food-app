import * as AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

const PLANS_TABLE = process.env.PLANS_TABLE || "food-app-prod-plans-table";

const getAllMapper = async (
  accountId: string,
  dates: string
): Promise<unknown[]> => {
  if (!accountId) {
    throw new Error("Missing required query parameter: accountId");
  }
  const datesResults: string[] = JSON.parse(dates) || [];
  if (datesResults.length < 1) {
    throw new Error("Missing required query parameter: dates");
  }

  try {
    const results = await Promise.all(
      datesResults.map((date) => {
        const key = { accountId, date };
        console.log("Querying key:", key);
        return dynamodb
          .get({
            TableName: PLANS_TABLE,
            Key: key,
          })
          .promise();
      })
    );

    // const filtered = results
    //   .map((res) => res.Item)
    //   .filter((item): item is Record<string, unknown> => !!item);
    return results;
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw new Error("Failed to retrieve plans");
  }
};

export { getAllMapper };
