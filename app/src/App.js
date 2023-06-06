import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import Routes from "./routes";
import store from "./store";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import { Provider } from "ui";
import { withConnectorEnv, withKeycloak, AloiRoute, withAloiTheme, theme } from "ui";
import { compose } from "@reduxjs/toolkit";
import "src/aloi-theme/App.scss";
import { useKeycloak } from "@react-keycloak/web";
import { LinearProgress } from "@mui/material";
const ComponentEnhancers = [withRouter, withAloiTheme, withConnectorEnv, withKeycloak];
const EnhancedProvider = compose(...ComponentEnhancers)(Provider);

// preloader
((o) => {
  const msg = [`Ver: v${o.version}, ${o.releaseDate}`, `Env: ${process.env.NODE_ENV}`];
  console.debug(msg.join("\n"));
})({
  version: 0,
  releaseDate: "0000-00-00"
});

const EnhancedRoute = () => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized || !keycloak) {
    return (
      <>
        <LinearProgress />
      </>
    );
  }

  const routes = !keycloak.authenticated ? Routes.unauthenticated : Routes.authenticated;

  return <AloiRoute routes={routes} />;
};

const App = () => {
  const eventLogger = (event, error) => {
    console.log("onKeycloakEvent", event, error);
  };

  const initOptions = { onLoad: "login-required", checkLoginIframe: false };

  const RealmConfig = {
    // baseRoute: "/:account"
    // changed to just "/" that it will redirect to /wally
    baseRoute: "/"
  };

  return (
    <ReduxProvider store={store}>
      <Router>
        <EnhancedProvider
          theme={theme}
          realmConfig={RealmConfig}
          onKeycloakEvent={eventLogger}
          keycloakInitOptions={initOptions}>
          <EnhancedRoute />
        </EnhancedProvider>
      </Router>
    </ReduxProvider>
  );
};

export default App;
