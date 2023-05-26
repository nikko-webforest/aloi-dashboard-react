import HomePages from "./modules/Home/pages";
import DashboardPages from "./modules/Dashboard/pages";
import ConnectorPages from "./modules/Connector/pages";
import PackagePages from "./modules/Package/pages";
import LoginPages from "./modules/Login/pages";
import ErrorPages from "./modules/Error/pages";
import RegisterPages from "./modules/Register/pages";

const unauthenticated = [
  {
    path: "/login",
    exact: true,
    component: LoginPages.Login
  },
  {
    path: "/register",
    exact: true,
    component: RegisterPages.Register
  },
  {
    path: "/404",
    exact: true,
    component: ErrorPages.NotFound
  },
  {
    from: "/",
    to: "/wally",
    exact: true,
    redirect: true
  },
  {
    path: "/*",
    component: ErrorPages.NotFound
  }
];

const authenticated = [
  {
    path: "/app/packages/:package_name/install",
    exact: true,
    component: PackagePages.Install
  },
  {
    path: "/app/packages",
    exact: true,
    component: PackagePages.Package
  },
  {
    path: "/app/connectors/:connector_name/jobs",
    exact: true,
    component: ConnectorPages.Job
  },
  {
    path: "/app/connectors/:connector_name/:requestId/request",
    exact: true,
    component: ConnectorPages.Request
  },
  {
    path: "/app/connectors/:connector_name/:transactionId/traces",
    exact: true,
    component: ConnectorPages.Trace
  },
  {
    path: "/app/connectors/:connector_name/:app_name/:transactionId/traces",
    exact: true,
    component: ConnectorPages.Trace
  },
  {
    path: "/app/connectors/:connector_name/:app_name/logs",
    exact: true,
    component: ConnectorPages.Log
  },
  {
    path: "/app/connectors/:connector_name/logs",
    exact: true,
    component: ConnectorPages.Log
  },
  {
    path: "/app/connectors/:connector_name",
    exact: true,
    component: ConnectorPages.AppList
  },
  {
    path: "/app/connectors",
    exact: true,
    component: ConnectorPages.Connectors
  },
  {
    path: "/demo-page",
    exact: true,
    component: HomePages.DemoPage
  },
  {
    from: "/",
    to: "/app/connectors",
    redirect: true
  }
];

export default { unauthenticated, authenticated };
