/** @typedef {Object} AloiApiOptions
 *
 * @property {string} account
 * @property {string} connector
 * @property {Object} [fetch]
 * @property {Object} [graphqlOptions]
 * @property {string} [endpoint]
 */

/** @typedef {import("@apollo/client").HttpOptions & import("@apollo/client").ApolloClientOptions<any>} GraphqlOptions */

import { createGraphql } from "./utils";

export default class AloiApi {
  apps = {};

  constructor(/** @type {AloiApiOptions} */ options) {
    const { account, connector, graphqlOptions } = options;

    if (!account || !connector) {
      throw "Account and Connector is required";
    }

    this.endpoint = `https://gateway.aloi.io/${account}/${connector}/api`;
    this.graphql = createGraphql(`${this.endpoint}/graphql`, graphqlOptions);

    this.options = {
      ...options
    };
  }

  setFetch(fetch) {
    this.options.fetch = fetch;

    return this;
  }

  fetch(resource, init) {
    return this.options.fetch ? this.options.fetch(resource, init) : window.fetch(resource, init);
  }

  get(endpoint, options) {
    const headers = {
      "Content-Type": "application/json"
    };

    const o = { ...options, headers, method: "GET" };
    const e = `${this.endpoint}/${endpoint}`;

    return this.fetch(e, o).then((response) => response.json());
  }

  post(endpoint, options) {
    const headers = {
      "Content-Type": "application/json"
    };

    const o = { ...options, headers, method: "POST" };
    const e = `${this.endpoint}/${endpoint}`;

    return this.fetch(e, o).then((response) => response.json());
  }

  install(app, options = {}) {
    this.apps[app.name] = app.install(this, { ...this.options, ...options });
  }

  app(name) {
    if (!(name in this.apps)) {
      throw new Error(`Invalid App: ${name}`);
    }

    return this.apps[name];
  }
}
