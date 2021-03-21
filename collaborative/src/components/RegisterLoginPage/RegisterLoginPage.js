import React from "react";
import { Link } from "react-router-dom";
import styles from "./RegisterLoginPage.module.css";
import Form from "../Form/Form";
import Logo from "../Logo/Logo";
import CloseButton from "../../assets/CloseButton.svg";

const RegisterLoginPage = () => {
  return (
    <section className={styles.RegisterLoginPage}>
      <Logo />
      <Form width="450px">
        <div column>
          <Link to="/" end>
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
            type="text"
            name="name-input"
            id="passwordInput"
            placeholder="Your super secure password"
            required
          />
        </div>
        <p>
          By registering a Collaborative account, you confirm that you hereby
          read and agree to the Terms of Service and Privacy Policy.
        </p>
        <input type="submit" value="Submit" />
        <hr />
        <Link to="/login">Already have an account? Log In</Link>
      </Form>
    </section>
  );
};

export default RegisterLoginPage;
