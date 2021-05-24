import React from "react";
import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className={styles.AboutPage}>
      <h1>About :</h1>
      <p>
        COLLABORATIVE is an application meant for team collaboration projects
        using a Kanban Board. This idea is inspired directly from the Trello
        board, but we decided to put our own spin on it.
      </p>
      <p>Dependencies Used:</p>
      <ul>
        <li>Axios</li>
        <li>Color</li>
        <li>Formik</li>
        <li>Yup</li>
        <li>Lodash</li>
        <li>jQuery</li>
        <li>React Loader Spinner</li>
        <li>React Redux</li>
        <li>React Router</li>
        <li>Redux</li>
        <li>Redux Thunk</li>
        <li>React Trello</li>
        <li>React Transition Group</li>
        <li>Bcrypt</li>
        <li>Body Parser</li>
        <li>Dotenv</li>
        <li>Express</li>
        <li>JSONWebToken</li>
        <li>mongoDB</li>
        <li>Nodemon</li>
      </ul>
      <Link to="/">{"< Go Back"}</Link>
    </section>
  );
};

export default About;
