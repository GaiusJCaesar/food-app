import { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";
import { handleReturn } from "./handleReturn";

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResult> => {
  const httpMethod = event.requestContext.http.method;

  switch (httpMethod) {
    case "GET":
      return handleReturn({
        body: { message: "GET request received" },
        statusCode: 200,
      });

    case "PUT":
      return handleReturn({
        body: { message: "PUT request received" },
        statusCode: 200,
      });

    case "DELETE":
      return handleReturn({
        body: { message: "DELETE request received" },
        statusCode: 200,
      });

    default:
      return handleReturn({
        body: { error: "Method Not Allowed" },
        statusCode: 405,
      });
  }
};
