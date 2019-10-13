import React from "react";
import { connect } from "react-redux";
import { Redirect } from "@reach/router";

const ProtectedRoute = ({ component: Component, isAuth, ...rest }) =>
  isAuth ? <Component {...rest} /> : <Redirect from="" to="auth" noThrow />;

const mapStateToProps = (state, ownProps = {}) => ({
  isAuth: state.auth.isAuth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProtectedRoute);
