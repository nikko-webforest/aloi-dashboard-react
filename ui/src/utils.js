import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const createGraphql = (uri, options = {}) => {
  /**
   * @typedef {Object} DefaultOptions
   *
   * @property {Object} fetch
   * @property {import("@apollo/client").InMemoryCache} cache
   * @property {?import("@apollo/client").HttpOptions} httpLinkOptions
   * @property {?import("@apollo/client").ApolloClientOptions<any>} apolloClientOptions
   */

  if (!uri) {
    throw new Error("GraphQL URI required");
  }

  const defaults = {
    fetch: window.fetch.bind(window),
    cache: new InMemoryCache(),
    httpLinkOptions: null,
    apolloClientOptions: null
  };

  /** @type {DefaultOptions} opts */
  const opts = Object.entries(defaults).reduce(
    (o, [k, v]) => {
      o[k] = !(k in options) ? v : options[k];
      return o;
    },
    { ...defaults }
  );

  const { fetch, cache, httpLinkOptions, apolloClientOptions } = opts;
  const link = new HttpLink({ uri, fetch, ...httpLinkOptions });

  return new ApolloClient({ link, cache, ...apolloClientOptions });
};
