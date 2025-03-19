import { PostConfirmationTriggerHandler } from "aws-lambda";

export const handler: PostConfirmationTriggerHandler = async (
  event,
  context,
  callback
) => {
  try {
    const userSub = event.request.userAttributes.sub;
    console.log(`User confirmed with sub: ${userSub}`);

    // Return the event to continue the sign-up flow
    return callback(null, event);
  } catch (error) {
    console.error("Error in post-confirmation trigger:", error);
    return callback(error as Error);
  }
};
