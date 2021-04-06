import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import styles from "./RegistrationPage.module.css";

import CloseButton from "../../assets/CloseButton.svg";
import Logo from "../Logo/Logo";
import { connect } from "react-redux";
import { FormDesign, RowDivision, Division } from "../FormDesign/FormDesign";

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
        <FormDesign primary width="450px">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            <Form>
              <Link to="/" style={{ alignSelf: "flex-end" }}>
                <img src={CloseButton} alt="Close Button" />
              </Link>
              <Division>
                <h1>Registration</h1>
                <p>
                  Prepared to start an impact? Please fill-in this form to
                  create a Collaborative account.
                </p>
              </Division>
              <hr />
              <Division>
                <RowDivision>
                  <Field
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                  />
                  <Field
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    required
                  />
                </RowDivision>
                <Field
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                />
                <Field
                  name="password"
                  type="password"
                  placeholder="Your Super Secure Password"
                  required
                />
              </Division>
              <p>
                By registering a Collaborative account, you confirm that you
                hereby read and agree to the Terms of Service and Privacy
                Policy.
              </p>
              <Field type="submit" value="Register Your Account" />
              <hr />
              <Link to="/login" style={{ textAlign: "center" }}>
                Already have an account? Log In
              </Link>
            </Form>
          </Formik>
        </FormDesign>
      </section>
    );
  }
};

const mapStateToProps = (state) => {
  return { currentUser: state.currentUserReducer };
};

export default connect(mapStateToProps)(RegistrationPage);
