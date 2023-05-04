/** @typedef { import("@reduxjs/toolkit").OutputSelector<any, any, any> } OutputSelector */
/** @typedef { (state: any, props?: any) => any } AloiSelector */
/** @typedef { () => AloiSelector } AloiSelectorFactory */
/** @typedef { Object<string, AloiSelector> } AloiSelectors */
/** @typedef { {(...args: any): any} } AloiOutputSelector */

import { createSelector as createReduxSelector } from "@reduxjs/toolkit";

/**
 * Create a selector
 *
 *  Proxy function for adding proper typing
 *
 * @param  {AloiSelector[] | [...AloiSelector[], AloiOutputSelector] } selectors
 * @returns AloiSelector
 */
export const createSelector = (...selectors) => {
  const returnFn = selectors.pop();

  if (Array.isArray(selectors[0])) {
    // @ts-ignore
    selectors = selectors[0];
  }

  return createReduxSelector(selectors, returnFn);
};

/**
 * Create a selector factory
 *
 *  Used to create a new instance of a selector
 *
 *  Note that selector factories are properly used inside mapStateToProps functions
 *  Using it inside a component will create a new selector every render
 *
 * @param  {AloiSelector[] | [...AloiSelector[], AloiOutputSelector] } selectors
 * @returns {AloiSelectorFactory}
 */
export const createSelectorFactory = (...selectors) => {
  return () => createSelector(...selectors);
};

/**
 * Utility function for creating a state mapper (mapStateToProps)
 *
 *  Accepts a "selectors" and "factories" collection
 *
 *  - Created mapStateToProps function accepts props by default, which in turn will subscribe to prop changes
 *  - Creates a mapStateToProps factory BY DEFAULT if factories is provided
 *
 * @param {Object<string, (AloiSelector)>} selectors
 * @param {Object<string, AloiSelectorFactory>} [factories]
 * @return {(state: any, props: any) => any}
 */
export const subscribe = (selectors, factories) => {
  const _factory = () => {
    const _m = [];

    if (selectors) {
      Object.entries(selectors).forEach(([prop, selector]) => {
        _m.push({ prop, selector, factory: false });
      });
    }

    if (factories) {
      Object.entries(factories).forEach(([prop, factory]) => {
        _m.push({ prop, selector: factory(), factory: true });
      });
    }

    return (state, props) => {
      const s = _m.reduce((o, { prop, selector, factory }) => {
        return (o[prop] = selector(state, props)), o;
      }, {});

      return s;
    };
  };

  return factories ? _factory : _factory();
};
