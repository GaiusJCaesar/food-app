import { APIGatewayProxyResult } from "aws-lambda";

const handleReturn = ({
  body,
  statusCode,
}: {
  body: unknown;
  statusCode: number;
}) => {
  const headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
  };
  const transformedBody = JSON.stringify(body);

  return {
    headers,
    body: transformedBody,
    statusCode,
  } as APIGatewayProxyResult;
};

export { handleReturn };
