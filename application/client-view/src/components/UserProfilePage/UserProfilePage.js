import React, { useCallback } from "react";
import styles from "./UserProfilePage.module.css";
import { useHistory } from "react-router";

import UserPortrait from "../../assets/UserPortrait.svg";
import UserProfileIcon from "../../assets/UserProfileIcon.svg";

const UserProfilePage = () => {
  return (
    <div className={styles.UserProfilePage}>
      <div className={styles.UserProfilePage_BG} />
      <div className={styles.UserProfilePage_Content}>
        <img
          src={UserPortrait}
          alt="User Portrait"
          className={styles.UserPortrait}
        />
        <h1>Profile Name</h1>
        <span className={styles.Email}>Email@email.com</span>
      </div>
    </div>
  );
};

export default UserProfilePage;
