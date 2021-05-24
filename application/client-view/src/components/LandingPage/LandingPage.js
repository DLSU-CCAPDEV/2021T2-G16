import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <section className={styles.LandingPage}>
      <nav className={styles.Navigation}>
        <Logo fontSize={40} />
        <div className={styles.Navigation_links}>
          <Button backgroundColor="white" color="white">
            <Link to="/about">About Us</Link>
          </Button>
          <Button backgroundColor="white" color="white">
            <Link to="/login">Log In</Link>
          </Button>
          <Button backgroundColor="#35C53F" color="white" primary>
            <Link to="/registration">Register</Link>
          </Button>
        </div>
      </nav>
      <div className={styles.Hero}>
        <span>
          Collaborative,
          <br />
          all-in-one
          <br />
          project
          <br />
          management
          <br />
          application
        </span>
        <p>
          Cooperate. Innovate. Deliver.
          <br />A tool for collaborative teams.
        </p>
      </div>
    </section>
  );
};

export default LandingPage;
