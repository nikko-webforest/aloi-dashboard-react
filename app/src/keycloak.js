import Keycloak from "keycloak-js";

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = Keycloak({
  url: "http://docker:8080/auth",
  realm: "aloi",
  clientId: "aloi-dashboard"
});

export default keycloak;
