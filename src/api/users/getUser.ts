import { get } from "aws-amplify/api";

export async function getUser() {
  try {
    const restOperation = get({
      apiName: "food-app-api-gw",
      path: "user/1",
    });
    const response = await restOperation.response;
    console.log("GET call succeeded: ", response);
  } catch (error) {
    console.log("GET call failed: ", error);
  }
}
