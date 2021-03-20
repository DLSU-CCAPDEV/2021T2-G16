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
          <div className={styles.Navigation_item}>
            <Button
              backgroundColor="white"
              color="white"
              Link
              linkTo="registration"
            >
              Log In
            </Button>
          </div>
          <div className={styles.Navigation_item}>
            <Button
              backgroundColor="#35C53F"
              color="white"
              primary
              Link
              linkTo="registration"
              className={styles.Navigation_item}
            >
              Register
            </Button>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default LandingPage;
