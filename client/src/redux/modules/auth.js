import { of } from "rxjs";
import { ofType } from "redux-observable";
import {
  map,
  takeUntil,
  startWith,
  switchMap,
  catchError
} from "rxjs/operators";

import createFetch from "../createFetch";
import createReducer from "../createReducer";

/**
 * TYPES
 */
export const TYPES = {
  FETCH_AUTH: "FETCH_AUTH",
  FETCH_AUTH_ABORTED: "FETCH_AUTH_ABORTED",
  FETCH_AUTH_PENDING: "FETCH_AUTH_PENDING",
  FETCH_AUTH_REJECTED: "FETCH_AUTH_REJECTED",
  FETCH_AUTH_FULFILLED: "FETCH_AUTH_FULFILLED",
  SET_AUTH_PASSCODE: "SET_AUTH_PASSCODE"
};

/**
 * ACTIONS
 */
export const fetchAuthAction = passcode => ({
  type: TYPES.FETCH_AUTH
});
export const fetchAuthAbortAction = () => ({
  type: TYPES.FETCH_AUTH_ABORTED
});
export const fetchAuthPendingAction = () => ({
  type: TYPES.FETCH_AUTH_PENDING
});
export const fetchAuthFulfillAction = payload => ({
  type: TYPES.FETCH_AUTH_FULFILLED,
  payload
});
export const fetchAuthRejectAction = payload => ({
  type: TYPES.FETCH_AUTH_REJECTED,
  payload
});
export const setAuthPasscode = payload => ({
  type: TYPES.SET_AUTH_PASSCODE,
  payload
});

/**
 * EPIC
 */
export const fetchAuthEpic = action$ =>
  action$.pipe(
    ofType(TYPES.FETCH_AUTH),
    switchMap(() =>
      createFetch("/api/auth").pipe(
        map(payload => fetchAuthFulfillAction(payload)),
        startWith(fetchAuthPendingAction()),
        takeUntil(action$.ofType(TYPES.FETCH_AUTH_ABORTED)),
        catchError(error => of(fetchAuthRejectAction(error)))
      )
    )
  );

export const setAuthPasscodeEpic = action$ =>
  action$.pipe(
    ofType(TYPES.SET_AUTH_PASSCODE),
    map(action => {
      const value = String(action.payload).slice(0, 4);
      if (value.length == 4) {
        return fetchAuthAction(value);
      }

      return {
        type: "_SET_PASSCODE",
        payload: value
      };
    })
  );

/**
 * REDUCER
 */
export default createReducer(
  {
    [TYPES.FETCH_AUTH_PENDING]: draft => {
      draft.isLoading = true;
      draft.error = null;
    },
    [TYPES.FETCH_AUTH_ABORTED]: draft => (draft.isLoading = false),
    [TYPES.FETCH_AUTH_REJECTED]: (draft, action) => {
      draft.isLoading = false;
      draft.isAuth = false;
      draft.error = action.payload;
      draft.passcode = "";
    },
    [TYPES.FETCH_AUTH_FULFILLED]: (draft, action) => {
      draft.isLoading = false;
      draft.isAuth = true;
      draft.error = null;
      draft.passcode = "";
    },
    _SET_PASSCODE: (draft, action) => {
      draft.passcode = action.payload;
    }
  },
  { isLoading: false, isAuth: false, error: null, passcode: "" }
);
