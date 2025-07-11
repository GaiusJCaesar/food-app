import { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";
import { handleReturn } from "./handleReturn";
import { getMapper } from "./mapper/get-mapper";
import { putMapper } from "./mapper/put-mapper";

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResult> => {
  const httpMethod = event.requestContext.http.method;
  const pathParams = event.pathParameters;
  const body = JSON.parse(event.body ?? "{}");
  switch (httpMethod) {
    case "GET":
      try {
        const data = await getMapper(pathParams?.["id"]);
        return handleReturn({
          body: { data },
          statusCode: 200,
        });
      } catch (error) {
        return handleReturn({
          body: { error, message: "ERROR: Not found." },
          statusCode: 404,
        });
      }

    case "PUT":
      try {
        const data = await putMapper(pathParams?.["id"], body);
        return handleReturn({
          body: { data },
          statusCode: 200,
        });
      } catch (error) {
        return handleReturn({
          body: { error, message: "ERROR: Not found." },
          statusCode: 404,
        });
      }

    case "DELETE":
      return handleReturn({
        body: { message: "DELETE request received" },
        statusCode: 200,
      });

    default:
      return handleReturn({
        body: { message: "Method Not Allowed" },
        statusCode: 405,
      });
  }
};
