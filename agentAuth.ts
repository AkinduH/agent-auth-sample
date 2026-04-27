import { AsgardeoJavaScriptClient } from '@asgardeo/javascript';

const orgName = process.env.ORGANIZATION_NAME || "";
const baseUrl = `https://api.asgardeo.io/t/${orgName}`;

const asgardeoConfig = {
    afterSignInUrl: process.env.REDIRECT_URI || "",
    clientId: process.env.CLIENT_ID || "",
    baseUrl,
    endpoints: {
        authorization: `${baseUrl}/oauth2/authorize`,
        discovery:     `${baseUrl}/oauth2/token/.well-known/openid-configuration`,
        endSession:    `${baseUrl}/oidc/logout`,
        introspection: `${baseUrl}/oauth2/introspect`,
        issuer:        `${baseUrl}/oauth2/token`,
        jwks:          `${baseUrl}/oauth2/jwks`,
        revocation:    `${baseUrl}/oauth2/revoke`,
        userinfo:      `${baseUrl}/oauth2/userinfo`,
        // legacy fields used by the underlying AsgardeoAuthClient
        authorizationEndpoint: `${baseUrl}/oauth2/authorize`,
        tokenEndpoint:         `${baseUrl}/oauth2/token`,
        endSessionEndpoint:    `${baseUrl}/oidc/logout`,
        revocationEndpoint:    `${baseUrl}/oauth2/revoke`,
        jwksUri:               `${baseUrl}/oauth2/jwks`,
        userinfoEndpoint:      `${baseUrl}/oauth2/userinfo`,
        checkSessionIframe:    `${baseUrl}/oidc/checksession`,
    },
};

const agentConfig = {
    agentID: process.env.AGENT_ID || "",
    agentSecret: process.env.AGENT_SECRET || "",
};

export async function authenticateAgent(scopes?: string): Promise<string> {
  console.log("Authenticating agent with Asgardeo...");
  const client = new AsgardeoJavaScriptClient({ ...asgardeoConfig, ...(scopes && { scopes }) });
  console.log("Asgardeo client initialized with config:", { ...asgardeoConfig, ...(scopes && { scopes }) });
  const tokenResponse = await client.getAgentToken(agentConfig);

  return tokenResponse.accessToken;
}
