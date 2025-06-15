import { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";
import { handleReturn } from "./handleReturn";
import { getMapper } from "./mapper/get-mapper";
import { postMapper } from "./mapper/post-mapper";
import { putMapper } from "./mapper/put-mapper";
import { deleteMapper } from "./mapper/delete-mapper";

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResult> => {
  const httpMethod = event.requestContext.http.method;
  const pathParams = event.pathParameters;
  const body = JSON.parse(event.body ?? "{}");
  switch (httpMethod) {
    case "POST":
      try {
        const data = await postMapper(body);
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
        const data = await putMapper(body);
        return handleReturn({
          body: { data },
          statusCode: 200,
        });
      } catch (error) {
        return handleReturn({
          body: { error, message: "ERROR: Missing data." },
          statusCode: 404,
        });
      }

    case "DELETE":
      try {
        const data = await deleteMapper(body);
        return handleReturn({
          body: { data },
          statusCode: 200,
        });
      } catch (error) {
        return handleReturn({
          body: { error, message: "ERROR: Missing data." },
          statusCode: 404,
        });
      }

    default:
      return handleReturn({
        body: { message: "Method Not Allowed" },
        statusCode: 405,
      });
  }
};
