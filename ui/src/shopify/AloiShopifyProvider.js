import { Provider as AloiProvider, useAloiContext } from "../AloiProvider";
import { useEffect, forwardRef } from "react";
import translations from "@shopify/polaris/locales/en.json";
import { AppProvider as ShopifyPolarisProvider } from "@shopify/polaris";
import { Link as RouterLink } from "react-router-dom";
import {
  ClientRouter,
  Context as ShopifyContext,
  Provider as ShopifyProvider,
  RoutePropagator
} from "@shopify/app-bridge-react";
import AloiShopify from "./AloiShopify";

export const RealmConfig = {
  baseRoute: "/install/:account/:connector/:appname",
  baseQueries: ["apiKey", "api_key", "shop", "host", "shopOrigin"],
  onParamMatch: {
    "apiKey": (v, params) => {
      const k = !v ? params["api_key"] : v;
      if (!v && !k) throw new Error("api_key in url query required");

      return k;
    },
    "shop": (v) => {
      return !v ? window.location.host : v;
    },
    "shopOrigin": (v, params) => {
      return !v ? (params["shop"] || null) : v;
    },
    host: (v, params) => {
      return !v ? window.btoa(params["shop"]) : v;
    }
  }
};

export const Link = ({ children = null, url = "", params = {}, external = false, ref = null, ...rest }) => {
  const aloi = useAloiContext();
  const generateUrl = aloi.realm.generateUrl;

  if (external || /^(?:[a-z][a-z\d+.-]*:|\/\/)/.test(url)) {
    rest.target = "_blank";
    rest.rel = "noopener noreferrer";

    return (
      <a href={url} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={generateUrl(url)} {...rest}>
      {children}
    </RouterLink>
  );
};

/** High-order component for wrapping Aloi provider with Shopify */
export const withShopify = (WrappedComponent) => {
  const _ = (props) => {
    const { params: { account, connector, appname, apiKey, shopOrigin, host } } = props.realm.getConnectorEnv();
    const { aloi, ...otherProps } = props;

    const clientRouter = props.history ? <ClientRouter history={props.history} /> : null;
    const routePropagator = props.location ? <RoutePropagator location={props.location} /> : null;
    const shopifyConfig = { apiKey, shopOrigin, host };
    const aloiConnector = { account, connector, appname };

    useEffect(() => {
      const isMounted = { _: true };
      const appUiLink = `https://appui.aloi.io/install/${account}/${connector}/${appname}${window.location.search}`;
      const isEmbedded = window.parent.location !== window.location;

      if (isMounted._ && !isEmbedded && process.env.NODE_ENV !== "production") {
        // window.location.href = appUiLink;
      }

      return () => {
        isMounted._ = false;
      };
    });

    // prepare component props
    const { features, i18n, linkComponent, theme, ...appBridgeProps } = otherProps;
    const polarisProps = { features, i18n, linkComponent, theme };
    polarisProps.linkComponent = linkComponent || Link;
    polarisProps.i18n = i18n || translations;

    return (
      <ShopifyPolarisProvider {...polarisProps}>
        <ShopifyProvider config={shopifyConfig}>
          {clientRouter}
          {routePropagator}
          <ShopifyContext.Consumer>
            {(shopify) => {
              aloi.install(new AloiShopify(shopify));
              return <WrappedComponent aloi={aloi} {...aloiConnector} shopify={shopify} {...appBridgeProps} />;
            }}
          </ShopifyContext.Consumer>
        </ShopifyProvider>
      </ShopifyPolarisProvider>
    );
  };

  return (_.displayName = `withShopify(${WrappedComponent.displayName || WrappedComponent.name})`), _;
};

export const Provider = withShopify(AloiProvider);

