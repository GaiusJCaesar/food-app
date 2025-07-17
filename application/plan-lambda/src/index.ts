import { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";
import { handleReturn } from "./handleReturn";
import { getAllMapper } from "./mapper/get-all-mapper";
import { putMapper } from "./mapper/put-mapper";
import { postMapper } from "./mapper/post-mapper";

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResult> => {
  const httpMethod = event.requestContext.http.method;
  const pathParams = event.pathParameters;
  const queryParams = event.queryStringParameters;
  const body = JSON.parse(event.body ?? "{}");
  switch (httpMethod) {
    case "POST":
      try {
        const data = await postMapper(body);

        return handleReturn({
          body: { success: true, createdAt: new Date().toISOString(), data },
          statusCode: 201,
        });
      } catch (error) {
        console.error("PUT ERROR:", error);
        return handleReturn({
          body: {
            error,
            message: "Failed to create plan.",
          },
          statusCode: 500,
        });
      }
    case "GET":
      try {
        if (
          queryParams &&
          pathParams &&
          pathParams.accountId &&
          queryParams.dates
        ) {
          const data = await getAllMapper(
            pathParams.accountId,
            queryParams.dates
          );
          return handleReturn({
            body: { data },
            statusCode: 200,
          });
        } else {
          throw new Error("Not supported");
        }
      } catch (error) {
        console.error("GET ERROR:", error);
        return handleReturn({
          body: { error, message: "ERROR: Not found." },
          statusCode: 404,
        });
      }

    case "PUT":
      try {
        const data = await putMapper(body);
        return handleReturn({
          body: { data },
          statusCode: 200,
        });
      } catch (error) {
        console.error("PUT ERROR:", error);
        return handleReturn({
          body: { error, message: "Failed to update plan." },
          statusCode: 404,
        });
      }
    case "DELETE":
      return handleReturn({
        body: { message: "ERROR: Method not allowed." },
        statusCode: 405,
      });

    default:
      return handleReturn({
        body: { message: "Method Not Allowed" },
        statusCode: 405,
      });
  }
};
