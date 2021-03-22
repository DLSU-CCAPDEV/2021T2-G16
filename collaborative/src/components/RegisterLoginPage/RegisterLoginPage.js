import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./RegisterLoginPage.module.css";
import Form from "../Form/Form";
import Logo from "../Logo/Logo";
import CloseButton from "../../assets/CloseButton.svg";

const renderForm = ({ pathname }) => {
  return pathname === "/registration" ? (
    <Form width="450px">
      <div column>
        <Link to="/" flex_end>
          <img src={CloseButton} alt="Close Button" />
        </Link>
        <h1>Registration</h1>
        <p>
          Prepared to start an impact? Please fill-in this form to create a
          Collaborative account.
        </p>
      </div>
      <hr />
      <div column>
        <div>
          <input
            type="text"
            name="name-input"
            id="firstNameInput"
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="name-input"
            id="lastNameInput"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          type="text"
          name="name-input"
          id="emailInput"
          placeholder="Your Email"
          required
        />
        <input
          type="password"
          name="name-input"
          id="passwordInput"
          placeholder="Your Super Secure Password"
          required
        />
      </div>
      <p>
        By registering a Collaborative account, you confirm that you hereby read
        and agree to the Terms of Service and Privacy Policy.
      </p>
      <input type="submit" value="Register Your Account" linkTo="homepage" />
      <hr />
      <Link to="/login" flex_center>
        Already have an account? Log In
      </Link>
    </Form>
  ) : (
    <Form width="400px">
      <div column>
        <Link to="/" flex_end>
          <img src={CloseButton} alt="Close Button" />
        </Link>
        <h1>Log In</h1>
        <p>
          Welcome back! It is nice to see you again. Please fill-in the
          credentials of your Collaborative account.
        </p>
      </div>
      <hr />
      <div column>
        <input
          type="text"
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
      </div>
      <input type="submit" value="Register Your Account" linkTo="homepage" />
      <hr />
      <Link to="/registration" flex_center>
        Don’t have an account yet? Register here
      </Link>
    </Form>
  );
};

const RegisterLoginPage = () => {
  return (
    <section className={styles.RegisterLoginPage}>
      <Logo />
      {renderForm(useLocation())}
    </section>
  );
};

export default RegisterLoginPage;
