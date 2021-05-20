import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => {
  return { currentUser: state.userReducer };
};

const PrivateRoute = ({ currentUser, children }) => {
  return currentUser.username !== null ? children : <Redirect to={"/login"} />;
};

export default connect(mapStateToProps)(PrivateRoute);
