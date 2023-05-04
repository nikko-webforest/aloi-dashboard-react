import React from "react";
import Keycloak from "keycloak-js";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";

export const withKeycloak = (WrappedComponent) => {
  const _ = (props) => {
    const { params } = props.realm.getConnectorEnv();

    const {keycloak, onKeycloakEvent, keycloakInitOptions, ...otherProps} = props;

    // @note: use (aloi) account instead of realm if props exist
    const realm = params.account;

    // const clientId = `${realm}.client`;
    // const url = `https://auth.aloi.io/auth/realms/${realm}`;
    const url = `https://auth.aloi.io/auth/`;
    const clientId = "aloi_api";

    const keyCloakInstance = Keycloak({
      url,
      realm,
      clientId,
      ...keycloak
    });

    return <ReactKeycloakProvider authClient={keyCloakInstance} onEvent={onKeycloakEvent} initOptions={keycloakInitOptions}>
      <KeycloakProxy {...otherProps} Component={WrappedComponent} />
    </ReactKeycloakProvider>;
  };

  return (_.displayName = `withKeycloak(${WrappedComponent.displayName || WrappedComponent.name})`), _;
}

const KeycloakProxy = ({ Component, ...props }) => {
  let reactKeycloak = { initialized: false, keycloak: null };

  try {
    reactKeycloak = useKeycloak();
  } catch (error) {
    console.error(error);
  }

  const { initialized, keycloak } = reactKeycloak;

  return <Component {...props} keycloak={keycloak} initialized={initialized} />;
}
