import React from "react";
import { Link } from "react-router-dom";
import styles from "../HomePage/HomePage.module.css";
import Login from "../RegisterLoginPage/RegisterLoginPage";

const HomePage = () => {
  return (
    <section className={styles.HomePage}>
      <div className={styles.MainContent}>
        <h1>current userHere</h1>
        <Link to="/login" exact>
          LINK
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
