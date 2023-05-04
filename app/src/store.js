import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";

import home, { reducer as HomeReducer } from "./modules/Home";

const store = configureStore({
  reducer: {
    [home]: HomeReducer
  }
});

/** @return {typeof store.dispatch} */
export const useDispatch = () => useReduxDispatch();

/** @type {import("react-redux").TypedUseSelectorHook<ReturnType<typeof store.getState>>} */
export const useSelector = useReduxSelector;

export default store;
