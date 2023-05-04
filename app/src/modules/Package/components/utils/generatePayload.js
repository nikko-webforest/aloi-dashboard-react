import { Text } from "src/forms";

export const generatePackagePayload = (packageName, name) => {
  return { package: packageName, name: name };
};

export const generateSecurityObject = (security) => {
  switch (security) {
    case "HMAC": {
      return [Text("Shared Secret")];
    }
    case "signed-jwt": {
      return [Text("Shared Secret", { key: "key" }), Text("Audience"), Text("Issuer")];
    }
  }

  return [];
};

export const generateFormObject = (authType, schema) => {
  switch (authType) {
    case "authorization_code":
      return [
        Text(schema["clientId"].title, { key: "clientId" }),
        Text(schema["clientSecret"].title, { key: "clientSecret" })
      ];
    case "serviceAccount":
      return [
        Text(schema["clientId"].title, { key: "clientId" }),
        Text(schema["clientSecret"].title, { key: "clientSecret" })
      ];
    case "apiKey":
      return [Text("Host"), Text(schema["apiKey"].title, { key: "apiKey" })];
    case "basic":
      return [
        Text("Host"),
        Text(schema["username"].title, { key: "username" }),
        Text(schema["password"].title, { key: "password" })
      ];
    case "bearer":
      return [Text("Host"), Text(schema["token"].title, { key: "token" })];
    case "header":
      return [Text("Host"), Text(schema["token"].title, { key: "token" })];
  }

  return [];
};

export const generateAppPayload = (authType, config) => {
  const o = {};
  const data = {
    credentials: {}
  };

  switch (authType) {
    case "apiKey":
    case "api_key":
      if (!config.apiKey && !config.api_key) {
        throw new Error(`'apiKey' auth type requires the following: 'config.apiKey' or 'config.api_key'`);
      }
      data.credentials.apiKey = config.apiKey || config.api_key;
      break;
    case "basic":
      if (!config.username || !config.password) {
        throw new Error(`'Basic' auth type requires the following: 'config.username, config.password'`);
      }
      data.credentials.username = config.username;
      data.credentials.password = config.password;
      break;
    case "bearer":
      if (!config.token) {
        throw new Error(`'Bearer' auth type requires the following: 'config.token'`);
      }
      data.credentials.token = config.token;
      break;
    case "header":
      if (!config.token) {
        throw new Error(`'Header' auth type requires the following: 'config.token'`);
      }

      data.credentials.token = config.token;
      break;
    case "authorization_code":
      if (config.scopes) data.scopes = config.scopes.replace(/\s/g, "").split(",");

      if (!config.clientId || !config.clientSecret) {
        throw new Error(
          `'oauth2 - authorization_code' auth type requires the following env variables: 'clientId', 'clientSecret'`
        );
      }

      data.credentials.clientId = config.clientId || "";
      data.credentials.clientSecret = config.clientSecret || "";
      break;
    case "serviceAccount":
      if (config.scopes) data.scopes = config.scopes.replace(/\s/g, "").split(",");

      if (!config.clientId || !config.clientSecret) {
        throw new Error(
          `'oauth2 - client_credentials' auth type requires the following env variables: 'clientId', 'clientSecret'`
        );
      }

      data.credentials.clientId = config.clientId || "";
      data.credentials.clientSecret = config.clientSecret || "";
      break;
    default:
      break;
  }

  data.host = config.host;
  return data;
};

export const generateSecurityPayload = (appName, securityType, config) => {
  const o = {};
  const schema = {};

  if (securityType === "HMAC") {
    if (!config.key) {
      throw new Error(`'HMAC' inbound-security type requires the following env variables: 'key'`);
    }

    schema.sharedSecret = config.key;
  }

  if (securityType === "signed-jwt") {
    if (!config.key || !config.audience || !config.issuer) {
      throw new Error(
        `'Signed JWT' inbound-security type requires the following env variables: 'key' 'audience' 'issuer'`
      );
    }

    schema.sharedSecret = config.key;
    schema.audience = config.audience;
    schema.issuer = config.issuer;
  }

  return {
    credentials: { ...schema }
  };
};
