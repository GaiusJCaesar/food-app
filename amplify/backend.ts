import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { userFunction } from "./functions/user-function/resource";
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  Cors,
  LambdaIntegration,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Stack } from "aws-cdk-lib";
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  userFunction,
});

// API Setup

const apiStack = backend.createStack("food-app-api-stack");

const restApi = new RestApi(apiStack, "food-app-api", {
  restApiName: "food-app-api-gw",
  deploy: true,
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS, // Restrict this to domains you trust
    allowMethods: Cors.ALL_METHODS, // Specify only the methods you need to allow
    allowHeaders: Cors.DEFAULT_HEADERS, // Specify only the headers you need to allow
  },
});

// API Cognito auth

const cognitoAuth = new CognitoUserPoolsAuthorizer(apiStack, "CognitoAuth", {
  cognitoUserPools: [backend.auth.resources.userPool],
});

// API IAM

const apiRestPolicy = new Policy(apiStack, "RestApiPolicy", {
  statements: [
    new PolicyStatement({
      actions: ["execute-api:Invoke"],
      resources: [
        `${restApi.arnForExecuteApi("*", "/user")}`,
        `${restApi.arnForExecuteApi("*", "/user/*")}`,
      ],
    }),
  ],
});

backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(
  apiRestPolicy
);
backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(
  apiRestPolicy
);

// API Path - User

const userIntegration = new LambdaIntegration(
  backend.userFunction.resources.lambda
);

const userPath = restApi.root.addResource("user", {
  defaultMethodOptions: {
    authorizationType: AuthorizationType.IAM,
  },
});

const userIdPath = userPath.addResource("{id}");

const userLambdaParams = {
  authorizationType: AuthorizationType.COGNITO,
  authorizer: cognitoAuth,
};

userPath.addMethod("POST", userIntegration, userLambdaParams);

userIdPath.addMethod("GET", userIntegration, userLambdaParams);
userIdPath.addMethod("DELETE", userIntegration, userLambdaParams);
userIdPath.addMethod("PUT", userIntegration, userLambdaParams);

// add outputs to the configuration file
backend.addOutput({
  custom: {
    API: {
      [restApi.restApiName]: {
        endpoint: restApi.url,
        region: Stack.of(restApi).region,
        apiName: restApi.restApiName,
      },
    },
  },
});
