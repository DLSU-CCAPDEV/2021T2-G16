import React from "react";
import styles from "./LandingPage.module.css";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";

const LandingPage = () => {
  return (
    <section className={styles.LandingPage}>
      <nav className={styles.Navigation}>
        <Logo fontSize={40} />
        <div className={styles.Navigation_links}>
          <Button backgroundColor="white" color="white" Link linkTo="login">
            Log In
          </Button>
          <Button
            backgroundColor="#35C53F"
            color="white"
            primary
            bold
            Link
            linkTo="registration"
          >
            Register
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
