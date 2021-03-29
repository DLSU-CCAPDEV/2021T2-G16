import React from "react";
import { connect } from "react-redux";

const UserProfilePage = ({ userAccount }) => {
  return <div>{"ID " + userAccount.uniqueID} </div>;
};

export default connect()(UserProfilePage);
