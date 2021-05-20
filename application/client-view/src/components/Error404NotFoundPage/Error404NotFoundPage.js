import React from "react";
import styles from "./Error404NotFoundPage.module.css";
import { Link } from "react-router-dom";

const Error404NotFoundPage = () => {
  return (
    <section className={styles.Error404NotFoundPage}>
      <h1>ERROR 404:</h1>
      <h2>The page that you are looking for does not exist.</h2>
      <br />
      <Link to="/">{"< Go Back"}</Link>
    </section>
  );
};

export default Error404NotFoundPage;
