import { connect } from "react-redux";
import React, { useEffect, useState, useRef } from "react";

import {
  setAuthPasscode,
  fetchAuthAction,
  fetchAuthAbortAction
} from "../redux/modules/auth";
import ThePinEnter from "../Components/ThePinEnter";
import Text from "../Components/Text";
import Icon from "../Icon";
import { navigate } from "@reach/router";
const AuthScreen = ({
  isLoading,
  isAuth,
  error,
  fetchAuthAction,
  setAuthPasscode,
  passcode
}) => {
  const inputEl = useRef(null);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }

    inputEl.current.focus();
    inputEl.current.addEventListener("blur", inputEl.current.focus);
    return () => {
      inputEl.current.removeEventListener("blur", inputEl.current.focus);
    };
  }, [isAuth]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-sm">
        <div className="bg-white shadow rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-col items-center justify-center">
            <Text category="c1" className="text-gray-700 mb-2">
              Enter Connection PIN
            </Text>
            {!isLoading && <ThePinEnter value={passcode} />}
            {isLoading && (
              <Icon.Spinner className="spinner text-indigo-500 h-8 w-8 mt-6" />
            )}
            {error && (
              <Text category="c2" className="text-red-500 mt-4">
                {error}
              </Text>
            )}
          </div>
        </div>
      </div>
      <input
        ref={inputEl}
        className="offscreen"
        type="number"
        value={passcode}
        onChange={e => setAuthPasscode(e.target.value)}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps = {}) => ({
  isAuth: state.auth.isAuth,
  error: state.auth.error,
  isLoading: state.auth.isLoading,
  passcode: state.auth.passcode
});

const mapDispatchToProps = {
  setAuthPasscode,
  fetchAuthAction,
  fetchAuthAbortAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
