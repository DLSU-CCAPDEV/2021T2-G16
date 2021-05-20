import Loader from "react-loader-spinner";
import React, { useEffect, useState } from "react";
import styles from "./UserProfilePage.module.css";
import { useLocation, useParams } from "react-router";

import UserPortrait from "../../assets/UserPortrait.svg";
import axios from "axios";

const UserProfilePage = () => {
  const [data, setData] = useState(undefined);
  const { username } = useParams();

  useEffect(async () => {
    const queryString = new URLSearchParams({ username }).toString();

    await axios.post("/api/userProfile/get", queryString).then((res) => {
      setData(res.data);
    });
  });

  return data ? (
    <div className={styles.UserProfilePage}>
      <div className={styles.UserProfilePage_BG} />
      <div className={styles.UserProfilePage_Content}>
        <img
          src={UserPortrait}
          alt="User Portrait"
          className={styles.UserPortrait}
        />
        <h1>{data.username}</h1>
      </div>
    </div>
  ) : (
    <div className={styles.UserProfilePage_Loader}>
      <Loader type="Oval" color="gainsboro" height={200} width={200} />
    </div>
  );
};

export default UserProfilePage;
