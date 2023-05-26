# Installation instructions

Type the following commands:

- (root directory) npm install
- npm start

# After Running

- type /wally to url
- input credentials
- it will lead to /connectors, where you will see all the apps that are connected.

# ⚠️CHANGELOG⚠️

## 05/26/2023

### Redirecting the app immediately to /wally

Made changes to the app component and index.js of ui/src/keycloak to make this possible. Comments are available for further details, but basically the redirect works like this:

- the app component has a realmConfig which basically informs keycloak which realm to redirect (i.e. "/:account")
- that realmConfig gets passed to a higher order component which takes that config string and compares it to the current path on the url search bar. If it matches, it will create a new url to redirect it to the log in, else, it will throw an error, leading to the error page.
- the original implementation of the realmConfig was "/:account". When the app runs, it does not have the account url param (immediately goes to just localhost:3000/, we need it to be localhost:3000/wally) so it will immediately throw the error page. Changing the realmConfig to "/" will create a new url since the realmConfig and the current path in the search bar matches.
- however, this will throw an error, stating that the realm is not defined. This is because in the withKeyCloak higher order component, it needs a realm to make a keycloak instance to authenticate the user. In the original code, it was set to the the search bar url params - which in this case was account (/:account). Hard coding "wally" as the realm makes this all come together.

### Storybook update

Upon checking the files, the components that were connected to storybook were never used. Instead, the ones present in the current UI were components made using Material UI package. To further prove this, I deleted the said components and the app still worked as expected. We may not need storybook after all.

### Fixed the bug where the logo and other svg images don't appear

it turns out that the images were used but were not imported correctly.
