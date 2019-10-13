import { ajax } from "rxjs/ajax";
import {
  flatMap,
  retryWhen,
  catchError,
  mergeMap,
  finalize
} from "rxjs/operators";
import { of, timer, throwError } from "rxjs";

export const genericRetryStrategy = (
  maxRetryAttempts = 3,
  scalingDuration = 1000,
  excludedStatusCodes = []
) => attempts$ => {
  return attempts$.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      return retryAttempt > maxRetryAttempts ||
        excludedStatusCodes.find(e => e === error.status)
        ? throwError(error)
        : timer(retryAttempt * scalingDuration);
    })
  );
};

const isStatusOK = status => ((status / 100) | 0) == 2; // 200-299
const networkError = () => "Network error occured";
const httpError = (status, message) => `Error ${status}: ${message}`;

const createFetch = settings =>
  ajax(settings).pipe(
    flatMap(response =>
      isStatusOK(response.status)
        ? of(response.response)
        : throwError(httpError(response.status, response.xhr.statusText))
    ),
    retryWhen(genericRetryStrategy()),
    catchError(error =>
      throwError(
        error.xhr
          ? httpError(error.status, error.xhr.statusText)
          : networkError()
      )
    )
  );

export default createFetch;
