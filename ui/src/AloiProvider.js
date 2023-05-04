import React, { useContext, useEffect, useState } from "react";
import { ApolloClient } from "@apollo/client";
import { Route as ReactRoute, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import AloiApi from "./AloiApi";
import { Realm } from "./Realm";
import ErrorPages from "../../app/src/modules/Error/pages";

/**
 * @typedef {Object} AloiContext
 *
 * @property {Object} [context]
 * @property {AloiApi} [api]
 * @property {AloiApi} [aloi]
 * @property {Realm} [realm]
 * @property {Object} [shopifyFetch]
 * @property {import('@shopify/app-bridge').ClientApplication} [shopify]
 * @property {import('@apollo/client').ApolloClient} [graphql]
 * @property {Object} [router]
 */

/** @type {React.Context<AloiContext>} AloiContext */
const Context = React.createContext({});

export const useAloiContext = () => useContext(Context);

export const Consumer = Context.Consumer;

export const RealmConfig = {
  baseRoute: "/:account/:connector"
};

/**
 * Wrap provided component inside an aloi consumer passing down the context
 */
export const withAloi = (__component) => {
  const _ = (props = {}) => <Consumer>{(aloi) => <__component {...props} {...aloi} />}</Consumer>;

  return (_.displayName = `AloiConsumer(${__component.displayName || __component.name})`), _;
};

/** Passes the ENV data to the wrapped component using the module's getConnectorEnv */
export const withConnectorEnv = (WrappedComponent) => {
  const _ = (props) => {
    const realm = new Realm(props.realmConfig);

    try {
      const { params: { account, connector } } = realm.getConnectorEnv()
      const aloi = account && connector ? new AloiApi({ account, connector }) : null;
      return <WrappedComponent realm={realm} aloi={aloi} {...props} />;
    } catch (e) {
      return <ErrorPages.NotFound />;
    }

  };

  return (_.displayName = `withConnectorEnv(${WrappedComponent.displayName || WrappedComponent.name})`), _;
}

/** Passes down a method for prepending base path to the routes */
export const withConnectorBasePath = (WrappedComponent) => {
  const _ = (props) => {
    const aloi = useAloiContext();

    return (
      <Switch>
        <ReactRoute
          path={aloi.realm.getBaseRoute()}
          render={(routeProps) => {
            return <WrappedComponent {...props} basePath={aloi.realm.generateUrl} />
          }}
        />
      </Switch>
    );
  };

  return (_.displayName = `withConnectorBasePath(${WrappedComponent.displayName || WrappedComponent.name})`), _;
}

export const Provider = ({ children, ...props }) => {
  const [counter, setCounterState] = useState(0);
  const [onHistoryChange, setOnHistoryChange] = useState(() => {
    return (cb) => ({ action: null, location: null });
  });

  const setCounterAction = (payload) => {
    setCounterState(payload);
  };

  const context = {
    counter,
    setCounterAction,
    onHistoryChange
  };

  useEffect(() => {
    console.log("Aloi Provider render..", { ...props });
  });

  // Register history listener
  useEffect(() => {
    if (!props.history) return;
    props.history.listen((location, action) => {
      setOnHistoryChange(() => {
        return (cb) => cb({ action, location });
      });
    });
  }, [props.history]);

  return <Context.Provider value={{ context, ...props }}>{children}</Context.Provider>;
};

Provider.propTypes = {
  aloi: PropTypes.instanceOf(AloiApi),
  children: PropTypes.node.isRequired,
  history: PropTypes.object,
  graphql: PropTypes.instanceOf(ApolloClient),
  location: PropTypes.object
};
