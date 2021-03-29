import React, { useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";

const UserProfilePage = ({ userAccount, currentUser }) => {
  const history = useHistory();
  const handleNoCurrentUser = useCallback(() => history.push("/login"), [
    history,
  ]);

  if (!currentUser) {
    handleNoCurrentUser();
    return null;
  } else {
    return (
      <div>{`ID${userAccount.uniqueID} ${
        currentUser.uniqueID === userAccount.uniqueID ? "YOU" : "Not you"
      }`}</div>
    );
  }
};

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser };
};

export default connect(mapStateToProps)(UserProfilePage);
