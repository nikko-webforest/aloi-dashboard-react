function createObjectFromArrayKeys(keys, value = null) {
  return keys.reduce((o, k) => {
    return { ...o, [k]: value }
  }, {});
};

function sanitizePath(path) {
  return "/" + path.replaceAll(/^\/+|\/+$/g, "");
};

function createRouteObject(route) {
  const tokens = route.split("/")
  const groups = [];
  const params = [];
  const path = [];

  for (const t of tokens) {
    const m = t.match(/^:(.+)$/);

    if (m) {
      groups.push(`(?<${m[1]}>[^/]+)`);
      params.push(m[1]);

    }

    if (!m) {
      groups.push(t);
      path.push(t);
    }
  }

  const pattern = new RegExp(`^${groups.join("/")}`);

  return {
    pattern,
    params
  };
};

function getUrlParams(search = null) {
  return Object.fromEntries((new URLSearchParams(search || window.location.search)).entries());
}

function mergeWithUrlParams(newParams, otherParams) {
  const params = typeof otherParams === "string" || otherParams instanceof String ? (new URLSearchParams(otherParams)).entries() : otherParams;
  const overrides = typeof params[Symbol.iterator] === "function" ? Array.from(params) : Object.entries(params);
  const defaults = Array.from((new URLSearchParams(newParams)).entries());

  const queries = [...defaults, ...overrides].reduce((a, [k, v]) => {
    return a.push(`${k}=${v}`), a;
  }, []);

  return queries.length > 0 ? "?" + queries.join("&") : "";
}

export function Realm(options = {}) {
  this.options = {
    baseRoute: "/",
    baseQueries: [],
    onParamMatch: {},
    ...options
  };

  if (!this.options.baseRoute) {
    throw new Error("baseRoute is required");
  }

  this.getBaseRoute = () => {
    return this.options.baseRoute;
  }

  this.getBaseQueries = (params) => {
    const result = {};

    for (const q of this.options.baseQueries) {
      result[q] = q in params ? params[q] : "";
    }

    return result;
  }

  this.getConnectorEnv = (options = {}) => {
    const o = {
      path: window.location.pathname,
      query: window.location.search,
      ...options
    };

    const route = createRouteObject(this.options.baseRoute);
    const match = route.pattern.exec(o.path);

    if (!match) {
      throw new Error(`baseRoute (${this.options.baseRoute}) does not match the current route`);
    }

    const defaults = createObjectFromArrayKeys(route.params, null);
    const queries = getUrlParams(o.query);
    const params = match ? { ...defaults, ...match.groups, ...queries } : { ...defaults, ...queries };

    for (const [p, h] of Object.entries(this.options.onParamMatch)) {
      const v = p in params ? params[p] : null;
      params[p] = h(v, params);
    }

    const basePath = route.params.reduce((s, p) => {
      return s = s.replace(new RegExp(`/(:${p})`), `/${params[p]}`), s;
    }, this.options.baseRoute);

    return {
      params,
      basePath
    }
  }

  this.generateUrl = (path, options = {}) => {
    if (!path) throw new Error("Path parameter required");

    path = path.startsWith("/") ? sanitizePath(path) : path;
    const { params, basePath } = this.getConnectorEnv();

    const u = new URL(path, window.location.origin);

    let b = path.startsWith("/") ? basePath : `//${u.host}`;
    b = b === "/" ? null : b; // remove basePath "/" to avoid double slashes

    const o = { path, query: window.location.search, ...options };
    const s = mergeWithUrlParams(this.getBaseQueries(params), u.search);
    const p = u.pathname !== "/" ? `${u.pathname}` : "/";

    return [b, p, u.hash, s].join("");
  }
};
