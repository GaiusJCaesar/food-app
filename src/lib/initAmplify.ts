import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { parseAmplifyConfig } from "aws-amplify/utils";
import { fetchAuthSession } from "aws-amplify/auth";

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
  {
    ssr: false,
    API: {
      REST: {
        headers: async () => {
          const hdrs: Record<string, string> = {};
          const session = await fetchAuthSession();
          const token = session.tokens?.idToken;

          if (token) {
            hdrs["Authorization"] = token.toString();
          }
          return hdrs;
        },
      },
    },
  }
);
