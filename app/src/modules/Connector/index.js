const MODULE_NAME = "connector";

import { createSlice } from "@reduxjs/toolkit";

import reducers from "./reducers";
export { selectors, factories } from "./reducers/selectors";

export const slice = createSlice({ name: MODULE_NAME, ...reducers });
export const reducer = slice.reducer;
export const actions = slice.actions;

export default MODULE_NAME;
