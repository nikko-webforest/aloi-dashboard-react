import { Redirect, Route as ReactRoute, Switch } from "react-router-dom";
import { useAloiContext } from "./AloiProvider";

export const AloiRoute = ({ routes, ...props }) => {
  const aloi = useAloiContext();

  return (
    <Switch>
      <ReactRoute path={aloi.realm.getBaseRoute()}>
        <Switch>
          {routes.map((route, i) => {
            const { routes: subRoutes, path, component: Component, from, to, ...otherProps } = route;

            if (route.redirect) {
              return <Redirect key={i} {...otherProps} {...props} from={aloi.realm.generateUrl(from)} to={aloi.realm.generateUrl(to)} />
            }

            if (subRoutes) {
              // nested routes are rendered inside the parent route's component
              // currently does not support deep sub routes
              const _ = route.nested ? [] : subRoutes.map((_sub, i) => {
                  const { routes: subRoutes, path, component: Component, from, to, ...otherProps } = _sub;
                  return <ReactRoute {...otherProps} key={i} path={aloi.realm.generateUrl(_sub.path)} render={(rp) => <_sub.component {...rp} />} />;
                });

              const nestedRoutes = route.nested ? subRoutes.map(({ ...r }) => {
                return { ...r, path: aloi.realm.generateUrl(r.path) };
              }) : [];

              _.push(
                  <ReactRoute {...otherProps} path={aloi.realm.generateUrl(route.path)} render={routeProps => (<Component {...routeProps} routes={nestedRoutes} />)} />
                );

              return _;
            }

            return <ReactRoute {...otherProps} key={i} path={aloi.realm.generateUrl(path)} component={Component} />
          })}
        </Switch>
      </ReactRoute>
    </Switch>
  );
};
