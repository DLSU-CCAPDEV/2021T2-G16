import React, { useCallback } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
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
        <div className={styles.MainContent}>
          <h1>{currentUser.emailInput}</h1>
          <Link to="/login" exact>
            LINK
          </Link>
        </div>
      </section>
    );
  }
};

const mapStateToProps = (state) => {
  return { currentUser: state.currentUserReducer };
};

export default connect(mapStateToProps)(HomePage);
