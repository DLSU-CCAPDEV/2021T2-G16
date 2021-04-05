import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./LoginPage.module.css";
import Form from "../Form/Form";
import Logo from "../Logo/Logo";
import CloseButton from "../../assets/CloseButton.svg";
import { connect } from "react-redux";

const LoginPage = ({ currentUser }) => {
  const history = useHistory();
  const handleNoCurrentUser = useCallback(() => history.push("/homepage"), [
    history,
  ]);

  if (currentUser) {
    handleNoCurrentUser();
    return null;
  } else {
    return (
      <section className={styles.LoginPage}>
        <Logo />
        <Form
          width="400px"
          formPurpose="login"
          errorText="Sorry. The email and password provided is incorrect. Please try again."
          linkTo="/homepage"
        >
          <div Column>
            <Link to="/" flex__end>
              <img src={CloseButton} alt="Close Button" />
            </Link>
            <h1>Log In</h1>
            <p>
              Welcome back! It is nice to see you again. Please fill-in the
              credentials of your Collaborative account.
            </p>
          </div>
          <hr />
          <input
            type="email"
            name="name-input"
            id="emailInput"
            placeholder="Your Email"
            required
          />
          <input
            type="password"
            name="name-input"
            id="passwordInput"
            placeholder="Your Password"
            required
          />
          <input type="submit" value="Log In" />
          <hr />
          <Link to="/registration" flex__center>
            Don’t have an account yet? Register here
          </Link>
        </Form>
      </section>
    );
  }
};

const mapStateToProps = (state) => {
  return { currentUser: state.currentUserReducer };
};

export default connect(mapStateToProps)(LoginPage);
