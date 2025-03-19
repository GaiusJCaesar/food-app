import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { handleReturn } from "./handleReturn";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const result = {
    result: event.body,
  };

  return handleReturn({ body: result, statusCode: 200 });
};
