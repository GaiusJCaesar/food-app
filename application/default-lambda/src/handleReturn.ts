import { APIGatewayProxyResult } from "aws-lambda";

const handleReturn = ({
  body,
  statusCode,
}: {
  body: unknown;
  statusCode: number;
}) => {
  const headers = {};
  const transformedBody = JSON.stringify(body);

  return {
    headers,
    body: transformedBody,
    statusCode,
  } as APIGatewayProxyResult;
};

export { handleReturn };
