import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { parseAmplifyConfig } from "aws-amplify/utils";

const amplifyConfig = parseAmplifyConfig(outputs);

Amplify.configure(
  {
    ...amplifyConfig,
    Auth: {
      ...amplifyConfig.Auth,
      Cognito: {
        userPoolClientId: outputs.auth.user_pool_client_id,
        userPoolId: outputs.auth.user_pool_id,
      },
    },
    API: {
      ...amplifyConfig.API,
      REST: outputs.custom.API,
    },
  },
  { ssr: false }
);
