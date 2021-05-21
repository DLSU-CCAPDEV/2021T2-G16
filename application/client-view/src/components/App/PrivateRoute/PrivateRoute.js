import Loader from "react-loader-spinner";
import React from "react";
import styles from "./PrivateRoute.module.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => {
  return { currentUser: state.userReducer };
};

const PrivateRoute = ({ currentUser, children }) => {
  return currentUser.hasLoaded ? (
    currentUser.username !== null ? (
      children
    ) : (
      <Redirect to={"/login"} />
    )
  ) : (
    <div className={styles.PrivateRoute__loader}>
      <Loader type="ThreeDots" color="gainsboro" height={200} width={200} />
    </div>
  );
};

export default connect(mapStateToProps)(PrivateRoute);
