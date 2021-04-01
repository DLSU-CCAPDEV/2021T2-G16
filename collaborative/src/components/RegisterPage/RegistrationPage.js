import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./RegistrationPage.module.css";
import Form from "../Form/Form";
import Logo from "../Logo/Logo";
import CloseButton from "../../assets/CloseButton.svg";
import { connect } from "react-redux";

const RegistrationPage = ({ currentUser }) => {
  const history = useHistory();
  const handleNoCurrentUser = useCallback(() => history.push("/homepage"), [
    history,
  ]);

  if (currentUser) {
    handleNoCurrentUser();
    return null;
  } else {
    return (
      <section className={styles.RegistrationPage}>
        <Logo />
        <Form
          width="450px"
          formPurpose="registration"
          errorText="This email is already used."
          linkTo="/login"
        >
          <div Column>
            <Link to="/" flex__end>
              <img src={CloseButton} alt="Close Button" />
            </Link>
            <h1>Registration</h1>
            <p>
              Prepared to start an impact? Please fill-in this form to create a
              Collaborative account.
            </p>
          </div>
          <hr />
          <div Column>
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
            By registering a Collaborative account, you confirm that you hereby
            read and agree to the Terms of Service and Privacy Policy.
          </p>
          <input type="submit" value="Register Your Account" />
          <hr />
          <Link to="/login" flex__center>
            Already have an account? Log In
          </Link>
        </Form>
      </section>
    );
  }
};

const mapStateToProps = (state) => {
  return { currentUser: state.currentUserReducer };
};

export default connect(mapStateToProps)(RegistrationPage);
