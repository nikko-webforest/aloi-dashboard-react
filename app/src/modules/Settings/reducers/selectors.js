// Selectors should be Pure functions
// @see https://react-redux.js.org/api/hooks#useselector

import { createSelector, createSelectorFactory } from "src/util";

// Simple selector
const getCounter = (state) => state.home.counter;

// Simple "reselect" selector
const getFullName = createSelector(
  (state) => state.home.user.firstName,
  (state) => state.home.user.lastName,
  (firstName, lastName) => `${firstName} ${lastName}`
);

const getTodo = createSelector(
  (state, props) => {
    const index = state.home.todos.findIndex((t) => t.id === props.id);
    return state.home.todos[index];
  },
  (todo) => {
    console.log("getTodo() selector runs!", todo.id);
    return todo;
  }
);

const getCounterFactory = createSelectorFactory(
  (state) => state.home.counter,
  (counter) => {
    return counter;
  }
);

// A selector factory creates multiple selector instances per component instance
const getTodoFactory = createSelectorFactory(
  (state, props) => {
    const index = state.home.todos.findIndex((t) => t.id === props.id);
    return state.home.todos[index];
  },
  (todo) => {
    console.log("getTodoFactory() selector runs!", todo.id);
    return todo;
  }
);

export const factories = {
  getCounterFactory,
  getTodoFactory
};

export const selectors = {
  getCounter,
  getFullName,
  getTodo
};
