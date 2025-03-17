import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";

Amplify.configure(
  {
    ...outputs,
    Auth: {
      ...outputs.auth,
      Cognito: {
        userPoolClientId: outputs.auth.user_pool_client_id,
        userPoolId: outputs.auth.user_pool_id,
      },
    },
  },
  { ssr: false }
);
