import React from "react";
import Keycloak from "keycloak-js";

import { ReactKeycloakProvider } from "@react-keycloak/web";
import { BrowserRouter } from "react-router-dom";

export const RealmContext = React.createContext();
const RealmConsumer = RealmContext.Consumer;

export const RealmRouter = (props) => {
  const realm = window.location.pathname.split("/")[1] || "";
  return <RealmContext.Provider value={{ realm }} >
    <BrowserRouter basename={`/${realm}`}>
      <RealmConsumer>
        {(realm) => {
          const children = React.Children.map(props.children, (element) => {
            return React.cloneElement(element, realm);
          });
          return children;
        }}
      </RealmConsumer>
    </BrowserRouter>
  </RealmContext.Provider>;
};

export const withKeyCloak = (__component) => {

  const _ = ({realm, keycloak, eventLogger, initOptions, ...props}) => {
    const clientId = "aloi_api";
    const keyCloakObject = { realm, clientId, ...keycloak };
    const keyCloakInstance = Keycloak(keyCloakObject);

  return <ReactKeycloakProvider
      authClient={keyCloakInstance}
      onEvent={eventLogger}
      initOptions={initOptions}>
        <__component {...props} />
    </ReactKeycloakProvider>;
  }

  return (_.displayName = `withKeyCloak(${__component.displayName || __component.name})`), _;
};
