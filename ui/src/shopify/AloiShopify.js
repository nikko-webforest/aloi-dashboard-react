import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { createGraphql } from "../utils";

export default class AloiShopify {
  name = "shopify";

  constructor(shopify) {
    if (!shopify) {
      throw new Error("Shopify App Bridge is required");
    }

    this.shopify = shopify;
  }

  install(aloi, options) {
    this.fetch = authenticatedFetch(this.shopify);
    const uri = `${aloi.endpoint}/shopify/graphql`;

    this.graphql = createGraphql(uri, { ...options, fetch: this.fetch });
    aloi.setFetch(this.fetch);

    return this;
  }
}
