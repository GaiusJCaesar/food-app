import { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";
import { handleReturn } from "./handleReturn";

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResult> => {
  const result = {
    result: event.body,
  };

  return handleReturn({ body: result, statusCode: 200 });
};
