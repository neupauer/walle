import { combineEpics } from "redux-observable";
import { combineReducers } from "redux";

import fetchAuthReducer, { fetchAuthEpic, setAuthPasscodeEpic } from "./auth";

export const rootEpic = combineEpics(fetchAuthEpic, setAuthPasscodeEpic);

export const rootReducer = combineReducers({
  auth: fetchAuthReducer,
});
