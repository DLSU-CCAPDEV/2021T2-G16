import React, { useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import HomePage_Logo from "../../assets/HomePage_Logo.svg";
import styles from "../HomePage/HomePage.module.css";

const HomePage = ({ currentUser }) => {
  const history = useHistory();
  const handleNoCurrentUser = useCallback(() => history.push("/login"), [
    history,
  ]);

  if (!currentUser) {
    handleNoCurrentUser();
    return null;
  } else {
    return (
      <section className={styles.HomePage}>
        <div className={styles.Header}>
          <img src={HomePage_Logo} alt="Your Workspace" />
          <div className={styles.Header_Text}>
            <h1>Welcome to your workstation, {currentUser.firstNameInput}!</h1>
            <p>
              Collaborative provides you with your own battlestation. Through
              this page, you can overseer your upcoming tasks, and access your
              utmost important projects.
            </p>
          </div>
        </div>
      </section>
    );
  }
};

const mapStateToProps = (state) => {
  return { currentUser: state.currentUserReducer };
};

export default connect(mapStateToProps)(HomePage);
