import React, { useCallback } from "react";
import styles from "./UserProfilePage.module.css";
import { connect } from "react-redux";
import { useHistory } from "react-router";

import UserPortrait from "../../assets/UserPortrait.svg";
import UserProfileIcon from "../../assets/UserProfileIcon.svg";

const mapStateToProps = (state) => {
  return { currentUser: state.userReducer };
};

const UserProfilePage = ({ currentUser }) => {
  return (
    <div className={styles.UserProfilePage}>
      <div className={styles.UserProfilePage_BG} />
      <div className={styles.UserProfilePage_Content}>
        <img
          src={UserPortrait}
          alt="User Portrait"
          className={styles.UserPortrait}
        />
        <h1>{currentUser.username}</h1>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(UserProfilePage);
