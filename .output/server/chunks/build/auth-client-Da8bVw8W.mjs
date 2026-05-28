import { createAuthClient } from 'better-auth/vue';
import { phoneNumberClient } from 'better-auth/client/plugins';

const authClient = createAuthClient({
  basePath: "/api/auth",
  plugins: [
    phoneNumberClient()
  ]
});

export { authClient as a };
//# sourceMappingURL=auth-client-Da8bVw8W.mjs.map
